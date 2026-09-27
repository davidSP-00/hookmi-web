"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import {
  Gauge,
  LoaderCircle,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  RotateCwSquare,
  Scan,
  Volume2,
  VolumeX,
} from "lucide-react";

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.5;
const DOUBLE_TAP_ZOOM = 2.5;
const SKIP_SECONDS = 5;
const FRAME_SECONDS = 1 / 30;
const DOUBLE_TAP_MS = 280;

type Transform = { s: number; x: number; y: number };
type Point = { x: number; y: number };

// Prefijos webkit para Safari (macOS / iPadOS). El iPhone no permite pantalla
// completa en un <div>, así que ahí usamos una "pantalla completa" por CSS.
type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};
type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};
// lock()/unlock() no están en todos los tipos de TypeScript ni en todos los navegadores.
type LockableOrientation = ScreenOrientation & {
  lock?: (orientation: "portrait" | "landscape") => Promise<void>;
  unlock?: () => void;
};
// Evento de pellizco del trackpad en Safari de escritorio.
type SafariGestureEvent = Event & { scale: number; clientX: number; clientY: number };

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatSpeed(speed: number) {
  return `${speed}×`;
}

// ---------- Posición guardada (solo en este navegador) ----------

const POSITION_KEY_PREFIX = "hookmi:video-position:";
// No vale la pena reanudar si apenas se había empezado o si ya estaba en el final.
const MIN_RESUME_SECONDS = 3;
const END_MARGIN_SECONDS = 5;
const SAVE_EVERY_SECONDS = 2;

// localStorage puede no existir o lanzar error (modo privado, almacenamiento bloqueado...):
// en ese caso simplemente no se guarda nada y el video empieza desde el inicio.
function readSavedPosition(src: string): number | null {
  try {
    const raw = window.localStorage.getItem(POSITION_KEY_PREFIX + src);
    if (!raw) return null;
    const value = Number(JSON.parse(raw)?.t);
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

function savePosition(src: string, time: number, duration: number) {
  try {
    const key = POSITION_KEY_PREFIX + src;
    const nearEnd = Number.isFinite(duration) && duration > 0 && time >= duration - END_MARGIN_SECONDS;
    if (time < MIN_RESUME_SECONDS || nearEnd) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify({ t: Math.floor(time * 10) / 10, at: Date.now() }));
  } catch {
    // Sin almacenamiento disponible: no pasa nada.
  }
}

function getFullscreenElement() {
  const doc = document as FullscreenDocument;
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

export function VideoPlayer({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
  const [isPseudoFullscreen, setIsPseudoFullscreen] = useState(false);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const rotatedRef = useRef(false);
  const [transform, setTransform] = useState<Transform>({ s: 1, x: 0, y: 0 });
  const transformRef = useRef<Transform>(transform);

  const isFullscreen = isNativeFullscreen || isPseudoFullscreen;
  const isZoomed = transform.s > 1.001;

  // ---------- Controles flotantes en pantalla completa ----------
  // En pantalla completa los controles van encima del video y se esconden solos
  // mientras se reproduce, para que el tejido ocupe toda la pantalla.

  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsVisibleRef = useRef(true);
  const hideTimerRef = useRef<number | null>(null);
  const fullscreenRef = useRef(false);
  const speedMenuOpenRef = useRef(false);
  // El toque que hace aparecer los controles no debe además pausar el video.
  const tapRevealedRef = useRef(false);

  useEffect(() => {
    fullscreenRef.current = isFullscreen;
    speedMenuOpenRef.current = speedMenuOpen;
  }, [isFullscreen, speedMenuOpen]);

  const revealControls = useCallback(() => {
    controlsVisibleRef.current = true;
    setControlsVisible(true);
    if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      hideTimerRef.current = null;
      const video = videoRef.current;
      if (!fullscreenRef.current || !video || video.paused || speedMenuOpenRef.current) return;
      controlsVisibleRef.current = false;
      setControlsVisible(false);
    }, 3000);
  }, []);

  useEffect(
    () => () => {
      if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
    },
    [],
  );

  const showOverlay = controlsVisible || !isPlaying || speedMenuOpen;

  // ---------- Recordar dónde se quedó ----------

  const lastSavedRef = useRef(0);
  const [resumedFrom, setResumedFrom] = useState<number | null>(null);

  // Hasta no haber intentado reanudar no se guarda nada: si no, un "0:00" guardado
  // al salir de la página borraría la posición que todavía no se había aplicado.
  const restoreAttemptedRef = useRef(false);

  const handleMetadata = useCallback(
    (video: HTMLVideoElement) => {
      setDuration(video.duration || 0);
      if (restoreAttemptedRef.current) return;
      restoreAttemptedRef.current = true;

      const saved = readSavedPosition(src);
      const canResume =
        saved !== null &&
        saved >= MIN_RESUME_SECONDS &&
        (!Number.isFinite(video.duration) || saved < video.duration - END_MARGIN_SECONDS);
      if (canResume && video.currentTime < 1) {
        video.currentTime = saved;
        lastSavedRef.current = saved;
        setCurrentTime(saved);
        setResumedFrom(saved);
      }
    },
    [src],
  );

  // El video que ya viene abierto al cargar la página (el primero del acordeón) se
  // renderiza en el servidor: el navegador puede leer sus metadatos antes de que React
  // conecte onLoadedMetadata, y ese evento se pierde. Por eso lo revisamos al montar.
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 1) handleMetadata(video);
  }, [handleMetadata]);

  const persistPosition = useCallback((video: HTMLVideoElement | null = videoRef.current) => {
    if (!video || video.readyState === 0 || !restoreAttemptedRef.current) return;
    lastSavedRef.current = video.currentTime;
    savePosition(src, video.currentTime, video.duration);
  }, [src]);

  // Guarda también al cerrar/cambiar de pestaña, al bloquear el móvil y al cerrar la sección.
  useEffect(() => {
    // Al desmontar, React ya soltó videoRef; por eso guardamos el elemento aquí.
    const video = videoRef.current;
    const save = () => persistPosition(video);
    const onHide = () => {
      if (document.visibilityState === "hidden") save();
    };
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("pagehide", save);
      document.removeEventListener("visibilitychange", onHide);
      save();
    };
  }, [persistPosition]);

  // El aviso "Continuando desde..." se oculta solo después de unos segundos.
  useEffect(() => {
    if (resumedFrom === null) return;
    const timer = window.setTimeout(() => setResumedFrom(null), 6000);
    return () => window.clearTimeout(timer);
  }, [resumedFrom]);

  const restartFromBeginning = () => {
    const video = videoRef.current;
    if (video) video.currentTime = 0;
    savePosition(src, 0, 0);
    setResumedFrom(null);
  };

  // ---------- Zoom ----------

  const clampTransform = useCallback((t: Transform): Transform => {
    const surface = surfaceRef.current;
    const s = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, t.s));
    if (!surface || s <= 1) return { s: 1, x: 0, y: 0 };
    const w = surface.clientWidth;
    const h = surface.clientHeight;
    return {
      s,
      x: Math.min(0, Math.max(w - w * s, t.x)),
      y: Math.min(0, Math.max(h - h * s, t.y)),
    };
  }, []);

  const applyTransform = useCallback(
    (t: Transform) => {
      const next = clampTransform(t);
      transformRef.current = next;
      setTransform(next);
    },
    [clampTransform],
  );

  // Hace zoom manteniendo fijo el punto (px, py) de la superficie.
  const zoomAt = useCallback(
    (nextScale: number, px: number, py: number) => {
      const t = transformRef.current;
      const s = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextScale));
      const ratio = s / t.s;
      applyTransform({ s, x: px - (px - t.x) * ratio, y: py - (py - t.y) * ratio });
    },
    [applyTransform],
  );

  const zoomFromCenter = useCallback(
    (nextScale: number) => {
      const surface = surfaceRef.current;
      if (!surface) return;
      zoomAt(nextScale, surface.clientWidth / 2, surface.clientHeight / 2);
    },
    [zoomAt],
  );

  const resetZoom = useCallback(() => applyTransform({ s: 1, x: 0, y: 0 }), [applyTransform]);

  const toggleZoomAt = useCallback(
    (px: number, py: number) => {
      if (transformRef.current.s > 1.001) resetZoom();
      else zoomAt(DOUBLE_TAP_ZOOM, px, py);
    },
    [resetZoom, zoomAt],
  );

  const toLocalPoint = useCallback((clientX: number, clientY: number): Point => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    // Con el giro por CSS (90° a la derecha) los ejes de la pantalla y del video no coinciden.
    if (rotatedRef.current) return { x: clientY - rect.top, y: rect.right - clientX };
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  // ---------- Reproducción ----------

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) void video.play().catch(() => {});
    else video.pause();
  }, []);

  const seekBy = useCallback((delta: number) => {
    const video = videoRef.current;
    if (!video) return;
    const max = Number.isFinite(video.duration) ? video.duration : Infinity;
    video.currentTime = Math.min(max, Math.max(0, video.currentTime + delta));
  }, []);

  const stepFrame = useCallback(
    (direction: 1 | -1) => {
      videoRef.current?.pause();
      seekBy(direction * FRAME_SECONDS);
    },
    [seekBy],
  );

  const changeSpeed = useCallback((value: number) => {
    const video = videoRef.current;
    if (video) {
      video.defaultPlaybackRate = value;
      video.playbackRate = value;
    }
    setSpeed(value);
  }, []);

  const shiftSpeed = useCallback(
    (direction: 1 | -1) => {
      const index = SPEEDS.indexOf(speed);
      const next = SPEEDS[Math.min(SPEEDS.length - 1, Math.max(0, (index === -1 ? 3 : index) + direction))];
      changeSpeed(next);
    },
    [speed, changeSpeed],
  );

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // ---------- Pantalla completa ----------

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current as FullscreenElement | null;
    if (!container) return;
    setSpeedMenuOpen(false);
    setIsRotated(false);
    revealControls();

    if (isPseudoFullscreen) {
      setIsPseudoFullscreen(false);
      return;
    }
    if (getFullscreenElement()) {
      const doc = document as FullscreenDocument;
      try {
        (screen.orientation as LockableOrientation | undefined)?.unlock?.();
      } catch {
        // Sin soporte para bloquear la orientación: nada que deshacer.
      }
      if (document.exitFullscreen) void document.exitFullscreen().catch(() => {});
      else doc.webkitExitFullscreen?.();
      return;
    }

    const request = container.requestFullscreen
      ? () => container.requestFullscreen()
      : container.webkitRequestFullscreen
        ? () => container.webkitRequestFullscreen!()
        : null;

    if (!request) {
      setIsPseudoFullscreen(true);
      return;
    }
    try {
      const result = request();
      if (result && typeof result.catch === "function") {
        result.catch(() => setIsPseudoFullscreen(true));
      }
    } catch {
      setIsPseudoFullscreen(true);
    }
  }, [isPseudoFullscreen, revealControls]);

  // ---------- Girar (solo celulares, en pantalla completa) ----------
  // Android: se pide al navegador que gire la pantalla (screen.orientation.lock).
  // iPhone y navegadores sin ese permiso: se gira el reproductor 90° por CSS.

  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const isCssRotated = isFullscreen && isRotated;

  useEffect(() => {
    rotatedRef.current = isCssRotated;
  }, [isCssRotated]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() =>
      setContainerSize({ w: container.clientWidth, h: container.clientHeight }),
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const rotateScreen = async () => {
    revealControls();
    const orientation = screen.orientation as LockableOrientation | undefined;
    if (!isRotated && orientation?.lock && getFullscreenElement()) {
      const target = orientation.type.startsWith("landscape") ? "portrait" : "landscape";
      try {
        await orientation.lock(target);
        return;
      } catch {
        // No se permite bloquear la orientación: usamos el giro por CSS.
      }
    }
    setIsRotated((value) => !value);
  };

  useEffect(() => {
    const onChange = () => setIsNativeFullscreen(getFullscreenElement() === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  // Bloquea el scroll de la página mientras dura la pantalla completa por CSS.
  useEffect(() => {
    if (!isPseudoFullscreen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPseudoFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isPseudoFullscreen]);

  // Al cambiar el tamaño (girar el móvil, pantalla completa...) reajusta el encuadre.
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => applyTransform(transformRef.current));
    observer.observe(surface);
    return () => observer.disconnect();
  }, [applyTransform]);

  // ---------- Toques / clics sobre el video ----------

  const tapTimerRef = useRef<number | null>(null);
  const lastTapRef = useRef<{ time: number; point: Point } | null>(null);

  // Un toque = reproducir/pausar; doble toque = zoom en ese punto.
  const handleTap = useCallback(
    (point: Point) => {
      const now = Date.now();
      const last = lastTapRef.current;
      if (last && now - last.time < DOUBLE_TAP_MS && Math.hypot(point.x - last.point.x, point.y - last.point.y) < 40) {
        if (tapTimerRef.current !== null) window.clearTimeout(tapTimerRef.current);
        tapTimerRef.current = null;
        lastTapRef.current = null;
        toggleZoomAt(point.x, point.y);
        return;
      }
      lastTapRef.current = { time: now, point };
      // En pantalla completa con los controles escondidos, el toque solo los muestra.
      const revealOnly = tapRevealedRef.current;
      if (tapTimerRef.current !== null) window.clearTimeout(tapTimerRef.current);
      tapTimerRef.current = window.setTimeout(() => {
        tapTimerRef.current = null;
        if (!revealOnly) togglePlay();
      }, DOUBLE_TAP_MS);
    },
    [toggleZoomAt, togglePlay],
  );

  useEffect(
    () => () => {
      if (tapTimerRef.current !== null) window.clearTimeout(tapTimerRef.current);
    },
    [],
  );

  // Ratón / lápiz: arrastrar para mover la imagen ampliada.
  const mouseDragRef = useRef<{ id: number; start: Point; origin: Transform; moved: boolean } | null>(null);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    mouseDragRef.current = {
      id: event.pointerId,
      start: { x: event.clientX, y: event.clientY },
      origin: transformRef.current,
      moved: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = mouseDragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.start.x;
    const dy = event.clientY - drag.start.y;
    if (!drag.moved && Math.hypot(dx, dy) > 4) drag.moved = true;
    if (drag.moved && drag.origin.s > 1) {
      applyTransform({ s: drag.origin.s, x: drag.origin.x + dx, y: drag.origin.y + dy });
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = mouseDragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    mouseDragRef.current = null;
    if (!drag.moved) handleTap(toLocalPoint(event.clientX, event.clientY));
  };

  // Táctil (pellizcar, arrastrar, tocar) y rueda/trackpad. Se registran a mano
  // con passive:false para poder bloquear el scroll/zoom del navegador.
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    let touchActive = false;
    let pinch: { dist: number; mid: Point; origin: Transform } | null = null;
    let pan: { start: Point; origin: Transform; moved: boolean; cancelled: boolean } | null = null;

    const touchPoint = (touch: Touch) => toLocalPoint(touch.clientX, touch.clientY);

    const startPinch = (touches: TouchList) => {
      const a = touchPoint(touches[0]);
      const b = touchPoint(touches[1]);
      pinch = {
        dist: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)),
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        origin: transformRef.current,
      };
    };

    // Los botones que flotan sobre el video (p. ej. "Quitar zoom") funcionan con normalidad.
    const isOnButton = (event: Event) => event.target instanceof Element && !!event.target.closest("button");

    const onTouchStart = (event: TouchEvent) => {
      if (isOnButton(event)) return;
      touchActive = true;
      if (event.touches.length >= 2) {
        event.preventDefault();
        startPinch(event.touches);
        if (pan) pan.cancelled = true;
      } else if (event.touches.length === 1) {
        pan = { start: touchPoint(event.touches[0]), origin: transformRef.current, moved: false, cancelled: false };
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touchActive) return;
      if (event.touches.length >= 2) {
        event.preventDefault();
        if (!pinch) startPinch(event.touches);
        const a = touchPoint(event.touches[0]);
        const b = touchPoint(event.touches[1]);
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const { origin } = pinch!;
        const s = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, origin.s * (dist / pinch!.dist)));
        // El punto del video que estaba bajo los dedos sigue bajo los dedos.
        const cx = (pinch!.mid.x - origin.x) / origin.s;
        const cy = (pinch!.mid.y - origin.y) / origin.s;
        applyTransform({ s, x: mid.x - cx * s, y: mid.y - cy * s });
        return;
      }
      if (event.touches.length === 1 && pan && !pan.cancelled) {
        const p = touchPoint(event.touches[0]);
        const dx = p.x - pan.start.x;
        const dy = p.y - pan.start.y;
        if (!pan.moved && Math.hypot(dx, dy) > 10) pan.moved = true;
        if (pan.origin.s > 1) {
          event.preventDefault();
          if (pan.moved) applyTransform({ s: pan.origin.s, x: pan.origin.x + dx, y: pan.origin.y + dy });
        }
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!touchActive) return;
      if (event.touches.length < 2) pinch = null;
      if (event.touches.length === 1) {
        // Quedó un dedo tras pellizcar: continúa como arrastre sin contar como toque.
        pan = { start: touchPoint(event.touches[0]), origin: transformRef.current, moved: true, cancelled: false };
        return;
      }
      if (event.touches.length === 0) {
        touchActive = false;
        const finished = pan;
        pan = null;
        if (event.type === "touchend" && finished && !finished.moved && !finished.cancelled) {
          event.preventDefault(); // evita el "click" fantasma posterior
          handleTap(touchPoint(event.changedTouches[0]));
        }
      }
    };

    const onWheel = (event: WheelEvent) => {
      // Pellizco en trackpad (Chrome/Edge/Firefox) o Ctrl + rueda.
      if (!event.ctrlKey) return;
      event.preventDefault();
      const p = toLocalPoint(event.clientX, event.clientY);
      zoomAt(transformRef.current.s * Math.exp(-event.deltaY * 0.01), p.x, p.y);
    };

    // Pellizco en trackpad de Safari (macOS). En iOS lo gestionan los eventos táctiles.
    let gestureOrigin: Transform | null = null;
    const onGestureStart = (event: Event) => {
      event.preventDefault();
      gestureOrigin = touchActive ? null : transformRef.current;
    };
    const onGestureChange = (event: Event) => {
      event.preventDefault();
      if (!gestureOrigin) return;
      const e = event as SafariGestureEvent;
      const p = toLocalPoint(e.clientX, e.clientY);
      const current = transformRef.current;
      const s = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, gestureOrigin.s * e.scale));
      const ratio = s / current.s;
      applyTransform({ s, x: p.x - (p.x - current.x) * ratio, y: p.y - (p.y - current.y) * ratio });
    };
    const onGestureEnd = (event: Event) => {
      event.preventDefault();
      gestureOrigin = null;
    };

    const active = { passive: false } as const;
    surface.addEventListener("touchstart", onTouchStart, active);
    surface.addEventListener("touchmove", onTouchMove, active);
    surface.addEventListener("touchend", onTouchEnd, active);
    surface.addEventListener("touchcancel", onTouchEnd, active);
    surface.addEventListener("wheel", onWheel, active);
    surface.addEventListener("gesturestart", onGestureStart, active);
    surface.addEventListener("gesturechange", onGestureChange, active);
    surface.addEventListener("gestureend", onGestureEnd, active);
    return () => {
      surface.removeEventListener("touchstart", onTouchStart);
      surface.removeEventListener("touchmove", onTouchMove);
      surface.removeEventListener("touchend", onTouchEnd);
      surface.removeEventListener("touchcancel", onTouchEnd);
      surface.removeEventListener("wheel", onWheel);
      surface.removeEventListener("gesturestart", onGestureStart);
      surface.removeEventListener("gesturechange", onGestureChange);
      surface.removeEventListener("gestureend", onGestureEnd);
    };
  }, [applyTransform, handleTap, toLocalPoint, zoomAt]);

  // ---------- Teclado ----------

  // Cualquier toque, clic o movimiento del ratón vuelve a mostrar los controles.
  const onAnyPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.type === "pointerdown") {
      tapRevealedRef.current = fullscreenRef.current && !controlsVisibleRef.current && !videoRef.current?.paused;
    }
    if (event.type === "pointerdown" || event.pointerType === "mouse") revealControls();
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    revealControls();
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement;
    const onControl = !!target.closest("button, input");
    if (onControl && [" ", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;

    const actions: Record<string, () => void> = {
      " ": togglePlay,
      k: togglePlay,
      K: togglePlay,
      ArrowLeft: () => seekBy(-SKIP_SECONDS),
      ArrowRight: () => seekBy(SKIP_SECONDS),
      ",": () => stepFrame(-1),
      ".": () => stepFrame(1),
      "[": () => shiftSpeed(-1),
      "]": () => shiftSpeed(1),
      "+": () => zoomFromCenter(transformRef.current.s + ZOOM_STEP),
      "=": () => zoomFromCenter(transformRef.current.s + ZOOM_STEP),
      "-": () => zoomFromCenter(transformRef.current.s - ZOOM_STEP),
      "0": resetZoom,
      f: toggleFullscreen,
      F: toggleFullscreen,
      m: toggleMute,
      M: toggleMute,
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  // ---------- Render ----------

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const extraButtons = (
    <>
      <ControlButton label={isMuted ? "Activar sonido (M)" : "Silenciar (M)"} onClick={toggleMute}>
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </ControlButton>
      <ControlButton
        label={isFullscreen ? "Salir de pantalla completa (F)" : "Pantalla completa (F)"}
        onClick={toggleFullscreen}
      >
        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
      </ControlButton>
    </>
  );

  const transportButtons = (
    <>
      <ControlButton label={`Retroceder ${SKIP_SECONDS} segundos`} onClick={() => seekBy(-SKIP_SECONDS)}>
        <RotateCcw size={18} />
        <span className="text-[10px] font-bold">{SKIP_SECONDS}</span>
      </ControlButton>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
        title={isPlaying ? "Pausar (espacio)" : "Reproducir (espacio)"}
        className={`flex flex-shrink-0 items-center justify-center rounded-full bg-hookmi-yellow text-hookmi-ink transition hover:bg-hookmi-yellow-dark ${
          isFullscreen ? "h-10 w-10" : "h-12 w-12"
        }`}
      >
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
      </button>
      <ControlButton label={`Adelantar ${SKIP_SECONDS} segundos`} onClick={() => seekBy(SKIP_SECONDS)}>
        <span className="text-[10px] font-bold">{SKIP_SECONDS}</span>
        <RotateCw size={18} />
      </ControlButton>
    </>
  );

  const speedButtons = SPEEDS.map((value) => (
    <button
      key={value}
      type="button"
      onClick={() => {
        changeSpeed(value);
        setSpeedMenuOpen(false);
      }}
      aria-pressed={speed === value}
      aria-label={`Velocidad ${formatSpeed(value)}`}
      className={`h-9 min-w-0 rounded-lg px-0 text-[11px] font-bold tabular-nums transition sm:text-sm ${
        isFullscreen ? "w-10 sm:w-12" : ""
      } ${speed === value ? "bg-hookmi-yellow text-hookmi-ink" : "bg-white/10 text-white hover:bg-white/20"}`}
    >
      {formatSpeed(value)}
    </button>
  ));

  const seekBar = (
    <div className="flex items-center gap-2 text-[11px] font-semibold tabular-nums sm:gap-3 sm:text-xs">
      <span className="w-9 text-right sm:w-10">{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.01}
        value={Math.min(currentTime, duration || 0)}
        onChange={(event) => {
          const video = videoRef.current;
          if (!video) return;
          video.currentTime = Number(event.target.value);
          setCurrentTime(video.currentTime);
        }}
        aria-label="Posición del video"
        className="h-2 min-w-0 flex-1 cursor-pointer accent-hookmi-yellow"
        style={{
          background: `linear-gradient(to right, var(--color-hookmi-yellow) ${progress}%, rgba(255,255,255,0.25) ${progress}%)`,
          borderRadius: 9999,
        }}
      />
      <span className="w-9 sm:w-10">{formatTime(duration)}</span>
    </div>
  );

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDownCapture={onAnyPointer}
      onPointerMoveCapture={onAnyPointer}
      onContextMenu={(event) => event.preventDefault()}
      className={`flex select-none flex-col bg-black text-white outline-none focus-visible:ring-2 focus-visible:ring-hookmi-yellow ${
        isPseudoFullscreen ? "fixed inset-0 z-[100] h-[100dvh] w-screen" : "relative"
      } ${isNativeFullscreen ? "h-full w-full" : ""} ${isFullscreen && !showOverlay ? "cursor-none" : ""}`}
      aria-label={`Reproductor: ${title}`}
    >
      {/* Envoltorio que se gira 90° por CSS cuando el navegador no deja girar la pantalla */}
      <div
        className={`flex flex-col ${isCssRotated ? "absolute left-0 top-0" : "relative min-h-0 flex-1"}`}
        style={
          isCssRotated
            ? {
                width: containerSize.h,
                height: containerSize.w,
                transform: `translateX(${containerSize.w}px) rotate(90deg)`,
                transformOrigin: "top left",
              }
            : undefined
        }
      >
      {/* Superficie del video (zoom y arrastre) */}
      <div
        ref={surfaceRef}
        className={`relative overflow-hidden bg-black ${isFullscreen ? "min-h-0 flex-1" : "aspect-video"} ${
          isFullscreen && !showOverlay
            ? "cursor-none"
            : isZoomed
              ? "cursor-grab active:cursor-grabbing"
              : "cursor-pointer"
        }`}
        style={{ touchAction: isZoomed ? "none" : "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          mouseDragRef.current = null;
        }}
      >
        <video
          ref={videoRef}
          src={src}
          title={title}
          className="pointer-events-none absolute left-0 top-0 h-full w-full object-contain"
          style={{
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.s})`,
            transformOrigin: "0 0",
            willChange: "transform",
          }}
          playsInline
          preload="metadata"
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          draggable={false}
          onPlay={() => {
            setIsPlaying(true);
            revealControls();
          }}
          onPause={() => {
            setIsPlaying(false);
            persistPosition();
          }}
          onEnded={() => {
            setIsPlaying(false);
            savePosition(src, 0, 0); // terminado: la próxima vez empieza desde el inicio
          }}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onCanPlay={() => setIsBuffering(false)}
          onTimeUpdate={(event) => {
            const time = event.currentTarget.currentTime;
            setCurrentTime(time);
            if (Math.abs(time - lastSavedRef.current) >= SAVE_EVERY_SECONDS) persistPosition();
          }}
          onSeeked={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
          onLoadedMetadata={(event) => {
            const video = event.currentTarget;
            video.defaultPlaybackRate = speed;
            video.playbackRate = speed;
            handleMetadata(video);
          }}
          onRateChange={(event) => setSpeed(event.currentTarget.playbackRate)}
          onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
        />

        {/* Indicadores */}
        {!isPlaying && !isBuffering && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-hookmi-yellow text-hookmi-ink shadow-lg sm:h-20 sm:w-20">
              <Play size={28} className="ml-1" fill="currentColor" />
            </span>
          </div>
        )}
        {isBuffering && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <LoaderCircle size={40} className="animate-spin text-hookmi-yellow" />
          </div>
        )}
        <div className="pointer-events-none absolute left-2 top-2 flex gap-2 text-xs font-bold">
          {speed !== 1 && (
            <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1">
              <Gauge size={14} /> {formatSpeed(speed)}
            </span>
          )}
          {isZoomed && <span className="rounded-full bg-black/70 px-2 py-1">Zoom {transform.s.toFixed(1)}×</span>}
        </div>
        {isZoomed && (
          <button
            type="button"
            onClick={resetZoom}
            onPointerDown={(event) => event.stopPropagation()}
            className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold hover:bg-black/90"
          >
            <Scan size={14} /> Quitar zoom
          </button>
        )}
        {resumedFrom !== null && (
          <div className={`absolute inset-x-2 flex justify-center ${isFullscreen ? "top-12" : "bottom-2"}`}>
            <div className="flex max-w-full items-center gap-2 rounded-full bg-black/80 py-1 pl-3 pr-1 text-[11px] font-bold sm:text-xs">
              <span className="truncate">Continuando desde {formatTime(resumedFrom)}</span>
              <button
                type="button"
                onClick={restartFromBeginning}
                onPointerDown={(event) => event.stopPropagation()}
                className="flex-shrink-0 rounded-full bg-hookmi-yellow px-2.5 py-1 text-hookmi-ink hover:bg-hookmi-yellow-dark"
              >
                Ver desde el inicio
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controles normales, debajo del video */}
      {!isFullscreen && (
        <div className="flex flex-col gap-3 bg-hookmi-ink px-2.5 py-3 sm:px-4">
          {seekBar}

          {/* Reproducción: en móvil centrada */}
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            <div className="flex flex-1 items-center justify-center gap-6 sm:flex-none sm:justify-start sm:gap-2">
              {transportButtons}
            </div>

            {/* En pantallas grandes estos van en la misma fila; en móvil suben a la fila de "Velocidad" */}
            <div className="hidden items-center gap-2 sm:flex">{extraButtons}</div>
          </div>

          {/* Velocidad (+ repetir / sonido / pantalla completa en móvil) */}
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center justify-between gap-2 sm:w-20 sm:flex-shrink-0">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-white/70">
                <Gauge size={14} /> Velocidad
              </span>
              <div className="flex items-center gap-1 sm:hidden">{extraButtons}</div>
            </div>
            <div className="grid flex-1 grid-cols-7 gap-1 sm:gap-1.5">{speedButtons}</div>
          </div>

          <p className="text-center text-[11px] leading-snug text-white/60 sm:text-left">
            Toca dos veces o pellizca el video para hacer zoom
            <span className="hidden sm:inline"> (en computadora, doble clic)</span>. Con zoom, arrastra para moverte.
          </p>
        </div>
      )}

      {/* Pantalla completa: barra compacta flotando sobre el video, se esconde sola */}
      {isFullscreen && (
        <div
          className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/55 to-transparent pt-10 transition-opacity duration-300 ${
            showOverlay ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{
            paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
            paddingRight: "max(0.75rem, env(safe-area-inset-right))",
            paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
          }}
        >
          {speedMenuOpen && (
            <div className="mb-2 flex justify-end">
              <div className="grid grid-cols-7 gap-1 rounded-xl bg-black/85 p-1">{speedButtons}</div>
            </div>
          )}

          {seekBar}

          <div className="mt-1.5 flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">{transportButtons}</div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setSpeedMenuOpen((value) => !value);
                  revealControls();
                }}
                aria-expanded={speedMenuOpen}
                aria-label={`Cambiar velocidad (ahora ${formatSpeed(speed)})`}
                title="Cambiar velocidad"
                className={`flex h-9 items-center gap-1 rounded-full pl-2 pr-2.5 text-xs font-bold tabular-nums transition ${
                  speedMenuOpen || speed !== 1
                    ? "bg-hookmi-yellow text-hookmi-ink"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                <Gauge size={16} />
                <span className="hidden sm:inline">Velocidad</span>
                {formatSpeed(speed)}
              </button>
              {/* Girar: solo en pantallas táctiles (celulares y tablets) */}
              <span className="hidden [@media(pointer:coarse)]:contents">
                <ControlButton label={isRotated ? "Volver a girar" : "Girar pantalla"} onClick={rotateScreen}>
                  <RotateCwSquare size={18} />
                </ControlButton>
              </span>
              {extraButtons}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex h-9 min-w-9 flex-shrink-0 items-center justify-center gap-0.5 rounded-full px-1.5 transition disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:min-w-10 sm:px-2 bg-white/10 text-white hover:bg-white/20`}
    >
      {children}
    </button>
  );
}
