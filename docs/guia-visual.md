# Guía visual — versión 0.1

Esta es la primera versión implementada del sistema visual. Es una base de trabajo y se podrá ajustar al construir las pantallas y revisar el sitio en uso.

## Paleta de partida

| Token | Color | Uso propuesto | Nota de contraste |
|---|---|---|---|
| `canvas` | `#F9F6F1` | Fondo marfil principal; tono dominante de la portada de LinkedIn. | Fondo claro. |
| `surface` | `#FFFDFA` | Superficies pequeñas cuando haga falta separar un control. | Fondo claro. |
| `ink` | `#24363B` | Texto principal y títulos. | Alto contraste sobre `canvas`. |
| `muted-ink` | `#52666B` | Texto secundario y descripciones. | Contraste calculado de 5.61:1 sobre `canvas`. |
| `brand-accent` | `#27C7D3` | Acento vivo para fondos de acción, textura y animación. | 1.91:1 sobre `canvas`; no usar como texto allí. Texto `#24363B` sobre cian: 6.12:1. |
| `brand-interactive` | `color-mix(brand-accent 38%, ink)` (≈ `#256D75`) | Estado activo de navegación y acciones textuales en tema claro. | Contraste calculado de 5.38:1 sobre `canvas`; en tema oscuro usa `brand-accent`. |
| `mauve` | `#B889B8` | Fondo de etiquetas de proyectos y detalles gráficos. | Con texto `#1D2B30`: 5.07:1; como texto sobre `canvas`: 2.67:1. |
| `mauve-soft` | `#EFE5EF` | Superficies suaves y selección de texto. | Usar con texto `ink`. |
| `ink-on-accent` | `#1D2B30` | Texto sobre cian y etiquetas malva. | Contraste calculado de 7.08:1 sobre `brand-accent` y 5.07:1 sobre `mauve`. |
| `line` | `#D8D2CA` | Separadores principales. | Decorativo. |
| `line-soft` | `#E7E2DC` | Detalles suaves del fondo. | Decorativo. |

La base conserva el marfil, la tinta y el gris secundario. El cian funciona como acento para fondos, textura y animación; `brand-interactive` deriva ese mismo cian hacia la tinta para distinguir los estados activos en tema claro con contraste AA. El malva queda en etiquetas de proyectos y detalles gráficos. El cian no se usa como texto sobre marfil. El azul gris `#7B92AA` no se usa para texto secundario porque no alcanza contraste AA.

## Tipografía

- Mantener como referencia la monoespaciada de etiquetas y la sans de navegación que Bryan identificó como favoritas.
- Probar Newsreader en los textos descriptivos y de lectura, IBM Plex Sans Condensed en los títulos, IBM Plex Sans en navegación y controles, e IBM Plex Mono en etiquetas. Newsreader se aplica a peso 400 para conservar trazos legibles.
- Mantener el cuerpo en una sans legible de tamaño moderado, con jerarquía por peso, ancho y espaciado, no solo por tamaño.
- Evitar la serif Bodoni/Didot en titulares; no representa la dirección que Bryan busca.
- La comparación tipográfica anterior no convenció; se reemplaza por una nueva iteración del hero en `prototipo-home.html`.

## Textura y formas

- Usar guías de indentación abstractas solo en las esquinas: líneas anidadas que representan la construcción de componentes y sistemas de interfaz.
- Evitar palabras, números y cuadrícula continua para que el fondo no parezca contenido ni imite literalmente una hoja de cuaderno.
- Usar el cian y el malva con baja opacidad; desvanecer hacia el centro para mantener el texto despejado.
- La textura base se limita a las esquinas; el puntero revela un segundo nivel de guías de anidación de componentes. No contiene texto ni números legibles.
- La navegación se mantiene fija dentro de una cápsula translúcida; los enlaces cambian color y peso al hover/foco, sin subrayado.
- Presentar proyectos como lista editorial sin cajas; las previsualizaciones recuperan color en hover y foco, y aparecen a color en pantallas táctiles.

## Movimiento

- Interacción distintiva: un halo/pincel sigue el puntero y revela la textura del fondo sin cubrir el contenido; evaluar si deja un rastro corto o si revela solo bajo el cursor.
- En el hero, una ilustración breve arma una interfaz con módulos reutilizables para mostrar el recorrido de diseño a componentes e interfaz; se construye con SVG y CSS, sin texto de código decorativo.
- En hover y foco de teclado de las acciones principales, añadir una pista de fondo suave para que se perciba que se pueden activar.
- Mantener la interacción ambiental: nunca sustituye el cursor del sistema, los estilos de foco ni otros affordances semánticos.
- En táctil ofrecer la textura estática y los mismos controles; no exigir gesto de arrastre para leer o navegar.
- Respetar `prefers-reduced-motion`; en ese modo dejar el fondo estático y quitar seguimiento/rastro.
- Mantener la entrada del hero breve y discreta; el efecto del puntero es ambiental y no reemplaza estados de hover/foco.
- La ilustración del hero se anima al entrar y responde suavemente al hover. Desactivar el movimiento no esencial con `prefers-reduced-motion`.
- Prototipar primero con `mask-image` y variables CSS; si se necesita que el trazo quede pintado, evaluar Canvas 2D. Motion para React es opcional para microinteracciones de componentes, no requisito para el efecto de foco.

## Componentes y tokens

- Next.js con App Router, React, TypeScript y Tailwind CSS v4.
- shadcn/ui como base de componentes copiables y modificables, con Base UI y variables CSS semánticas.
- Los tokens de marca (`canvas`, `ink`, `brand-accent`, `mauve`, `line`) viven junto a los tokens semánticos de shadcn en `src/app/globals.css`.
- Componentes compartidos iniciales: `Button`, `Badge`, `Separator`, `PageContainer`, `SectionHeading`, `ProjectRow`, `SiteHeader` y `SiteFooter`.
- El isotipo geométrico propio representa el paso de un punto de curiosidad hacia una estructura; las redes usarán iconos reconocibles con texto visible, sin redibujar marcas de terceros.
- El pie de página ya tiene un espacio común para correo y redes. Añadir perfiles cuando se definan las URL oficiales.

## Accesibilidad

- Meta inicial WCAG 2.2 AA: contraste de texto normal de al menos 4.5:1 y de texto grande de al menos 3:1.
- Mantener foco de teclado visible, orden de tabulación lógico y estados de interacción distinguibles.
- No comunicar estados solo mediante color; acompañar con texto, iconos o forma.
- Verificar escalado de texto, ancho de lectura y adaptación móvil.
