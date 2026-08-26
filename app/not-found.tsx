import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-5 py-32 text-center">
      <span className="font-heading text-6xl font-bold text-hookmi-yellow-dark">404</span>
      <h1 className="font-heading text-2xl font-bold text-hookmi-ink">
        No encontramos esta página
      </h1>
      <p className="text-hookmi-ink/70">
        Puede que el link esté mal escrito o que el kit que buscas ya no exista.
      </p>
      <LinkButton href="/" variant="primary">
        Volver al inicio
      </LinkButton>
    </div>
  );
}
