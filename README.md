# HOOKMI — Sitio web

Ecommerce sin carrito (venta por WhatsApp) + tutoriales de crochet con videos y PDF protegidos por un código de kit (formato `XXXX-XXXX`).

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Copia `.env.example` a `.env.local` y define tus propias variables (ver más abajo) antes de correr el proyecto.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `UNLOCK_SECRET` | Secreto para firmar la cookie que desbloquea los tutoriales. Genéralo con `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. **Nunca lo subas al repo.** |
| `NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER` | Número de WhatsApp de la tienda, formato internacional sin "+" ni espacios (ej. `56912345678`). |

## Cómo agregar un producto nuevo

Edita `content/products.ts` y agrega un objeto al arreglo `products`. Si el producto tiene tutorial asociado, usa `animalSlug` para enlazarlo con `content/animals.ts`.

## Cómo agregar un animal/tutorial nuevo

1. Genera el hash del código del kit (formato `XXXX-XXXX`, letras/números en mayúscula):
   ```bash
   node scripts/hash-password.mjs "ABCD-1234"
   ```
2. Agrega la parte **pública** en `content/animals.ts` (`sectionsMeta` solo lleva los títulos de las secciones, ej. Cuerpo/Manos/Pies).
3. Agrega la parte **privada** en `content/animals.secure.ts` con el mismo `slug`, el hash generado, las URLs reales de cada video (YouTube/Vimeo en modo no listado) y el nombre del archivo PDF.
4. Coloca el PDF real en `private/pdfs/` con el nombre que pusiste en `pdfFile`.
5. El orden y la cantidad de `sectionsMeta` (público) y `sections` (privado) deben calzar exactamente — de lo contrario el sitio mostrará información inconsistente.

**Importante:** `content/animals.secure.ts` nunca debe importarse desde un componente de cliente. Solo lo leen las rutas en `app/api/unlock` y `app/api/pdf/[slug]`.

## Reemplazar el contenido de demostración

El proyecto viene con 2 animales de ejemplo (Henry el Ratón, Pateo el Pato) con:
- Imágenes SVG placeholder en `public/images/`
- Videos de YouTube de marcador de posición (secciones protegidas con URLs `REEMPLAZAR_...` que no funcionan — hay que reemplazarlas por videos reales)
- PDFs de muestra generados automáticamente en `private/pdfs/`
- Códigos de demo (formato `XXXX-XXXX`): `HNRY-0001`, `PATO-0002`

Reemplaza todo esto por contenido real antes de lanzar el sitio a producción.

## Despliegue en Vercel

1. Sube el repositorio a GitHub/GitLab/Bitbucket.
2. Importa el proyecto en [vercel.com](https://vercel.com).
3. Configura las variables de entorno (`UNLOCK_SECRET`, `NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER`) en el panel de Vercel (Project Settings → Environment Variables).
4. Despliega. Los PDFs en `private/pdfs/` se incluyen en el deploy (no son públicos vía URL directa, solo accesibles a través de `/api/pdf/[slug]` tras desbloquear).

## Scripts útiles

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — sirve el build de producción localmente
- `npm run lint` — ESLint
- `node scripts/hash-password.mjs "XXXX-XXXX"` — genera el hash para `animals.secure.ts`
