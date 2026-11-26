# Portafolio personal — Bryan Vélez

Espacio de trabajo para definir, diseñar y desarrollar el portafolio personal de Bryan.

## Estado

- Dirección acordada: combinar una presentación visual y expresiva con casos de producto claros y sobrios.
- Caso visual principal: Beyond Learning Academy.
- Caso principal de producto: evolución frontend de Kuadra desde 2024, con implementación de Figma y sistema de diseño transversal a los módulos. La versión desplegada es una versión anterior en cuya implementación Bryan colaboró; la versión nueva todavía no está desplegada.
- Caso complementario: landing pública de Kuadra.
- Fina Parafina queda fuera de esta primera versión mientras siga inconcluso.
- Java se presenta como aprendizaje actual, no como experiencia profesional.
- Base inicial: Next.js App Router, React, TypeScript, Tailwind CSS v4 y shadcn/ui (Base UI). La maqueta de la portada se irá afinando en el sitio real.

## Contenido

- `docs/brief.md`: perfil, objetivo y alcance del portafolio.
- `docs/referentes.md`: qué tomamos de los cuatro referentes seleccionados.
- `docs/guia-visual.md`: paleta inicial, tipografía, textura, movimiento y accesibilidad.
- `docs/wireframe-home.md`: estructura y primer contenido de la página de inicio.
- `prototipo-home.html`: maqueta visual independiente de la portada para revisar antes de elegir framework.
- `prototipo-tipografia.html`: comparación de dos opciones tipográficas y la textura de fondo propuesta.
- `assets/references/`: imágenes aportadas como referencia visual.
- `assets/textures/hoja-de-codigo.svg`: guías de indentación abstractas en las esquinas, como referencia sutil a componentes y código.
- `src/app/globals.css`: tokens semánticos, paleta de marca, tipografías y estilos base.
- `src/components/ui/`: primitivas shadcn/ui adaptadas a la identidad visual.
- `src/components/portfolio/`: componentes propios reutilizables para las secciones del portafolio.

## Comandos

- `pnpm dev`: iniciar el sitio local.
- `pnpm build`: generar la versión de producción.
