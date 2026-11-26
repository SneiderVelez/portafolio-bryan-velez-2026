# Guía visual — versión 0.1

Esta es la primera versión implementada del sistema visual. Es una base de trabajo y se podrá ajustar al construir las pantallas y revisar el sitio en uso.

## Paleta actual — azul cielo y grises fríos

La vista clara cambia a gris frío las áreas que antes eran beige y conserva en blanco las secciones que ya eran blancas. El modo oscuro usa grises carbón azulados y conserva el mismo cian como acento. El tema seleccionado se puede cambiar desde el icono de luna/sol y se guarda para la próxima visita; si no hay una preferencia guardada, se respeta el tema del sistema.

### Modo claro

| Token | Color | Uso | Contraste comprobado |
|---|---|---|---|
| `canvas` | `#E5EBF0` | Fondo gris frío de portada, sobre mí y pie de página; ahora se distingue un poco más de las secciones blancas. | `ink`: 10.70:1; `muted-ink`: 5.02:1. |
| `surface` | `#FFFDFA` | Superficie blanca original para controles, paneles y tarjetas. | `ink`: 12.66:1; `muted-ink`: 5.94:1. |
| `projects-background` | `#FFFFFF` | Conserva el fondo blanco original de proyectos y tecnologías. | `ink`: 12.86:1; `muted-ink`: 6.03:1. |
| `ink` / `muted-ink` | `#24343D` / `#52666D` | Títulos y texto secundario. | Ambos alcanzan AA sobre los tres fondos claros. |
| `brand-accent` | `#27C7D3` | Acento principal: botones rellenos, isotipo, animaciones y trazos de ilustración. | Texto `ink-on-accent` `#12313A`: 6.68:1. No usar el cian como texto sobre gris claro. |
| `brand-interactive` | `#08727F` | Enlaces y navegación activa sobre fondos claros. | 4.69:1 sobre `canvas`; 5.64:1 sobre blanco. |
| `signal` / `signal-ink` | `#0F8290` / `#0B5965` | Puntos, detalles secundarios y etiquetas de proyectos. | `signal-ink` sobre `surface`: 7.86:1. |
| `line` / `line-soft` | `#778890` / mezcla de `canvas` e `ink` | Bordes de controles y separadores; la variante suave se reserva para detalles decorativos. | `line`: 3.06:1 sobre `canvas` y 3.68:1 sobre blanco. |

### Modo oscuro

| Token | Color | Uso | Contraste comprobado |
|---|---|---|---|
| `canvas` / `surface` | `#131D25` / `#1D2A34` | Fondo carbón azulado y capas elevadas. | `ink`: 15.56:1 / 13.36:1. |
| `projects-background` | `#182630` | Diferencia la sección de proyectos sin introducir un fondo negro. | `ink`: 14.09:1. |
| `ink` / `muted-ink` | `#F1F5F7` / `#B8C7CE` | Texto principal y secundario. | `muted-ink`: 9.84:1 sobre `canvas`. |
| `brand-accent` / `brand-interactive` | `#27C7D3` | Acciones, enlaces, navegación activa e ilustraciones. | `brand-accent` sobre `canvas`: 8.29:1; texto `#12313A` sobre el cian: 6.68:1. |
| `signal` / `signal-ink` | `#6AD1DA` / `#BDEEF2` | Indicadores secundarios y etiquetas. | `signal-ink` sobre `surface`: 11.64:1. |
| `line` | `#65767F` | Bordes, separadores y geometría. | 3.11:1 sobre `surface`. |

El cian destaca como el color de marca; los fondos y textos usan grises con matiz azul para mantener la interfaz seria y técnica. En el modo claro el cian queda para superficies de acción y decoración, mientras que los enlaces usan una variante más oscura para conservar legibilidad.

## Tipografía

- Mantener como referencia la monoespaciada de etiquetas y la sans de navegación que Bryan identificó como favoritas.
- Probar Newsreader en los textos descriptivos y de lectura, IBM Plex Sans Condensed en los títulos, IBM Plex Sans en navegación y controles, e IBM Plex Mono en etiquetas. Newsreader se aplica a peso 400 para conservar trazos legibles.
- Mantener el cuerpo en una sans legible de tamaño moderado, con jerarquía por peso, ancho y espaciado, no solo por tamaño.
- Evitar la serif Bodoni/Didot en titulares; no representa la dirección que Bryan busca.
- La comparación tipográfica anterior no convenció; se reemplaza por una nueva iteración del hero en `prototipo-home.html`.

## Textura y formas

- Usar guías de indentación abstractas solo en las esquinas: líneas anidadas que representan la construcción de componentes y sistemas de interfaz.
- Evitar palabras, números y cuadrícula continua para que el fondo no parezca contenido ni imite literalmente una hoja de cuaderno.
- Usar el azul cielo y el azul señal con baja opacidad. Desvanecer hacia el centro para mantener el texto despejado.
- La textura base se limita a las esquinas; el puntero revela un segundo nivel de guías de anidación de componentes. No contiene texto ni números legibles.
- El header fijo usa un panel translúcido, más compacto y con esquinas de radio pequeño; los enlaces cambian color y peso al hover/foco, sin subrayado.
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
- Los tokens de marca (`canvas`, `ink`, `brand-accent`, `signal`, `line`) viven junto a los tokens semánticos de shadcn en `src/app/globals.css`.
- Componentes compartidos iniciales: `Button`, `Badge`, `Separator`, `PageContainer`, `SectionHeading`, `ProjectRow`, `SiteHeader` y `SiteFooter`.
- El isotipo geométrico propio representa el paso de un punto de curiosidad hacia una estructura; las redes usarán iconos reconocibles con texto visible, sin redibujar marcas de terceros.
- El pie de página ya tiene un espacio común para correo y redes. Añadir perfiles cuando se definan las URL oficiales.

## Accesibilidad

- Meta inicial WCAG 2.2 AA: contraste de texto normal de al menos 4.5:1 y de texto grande de al menos 3:1.
- Mantener foco de teclado visible, orden de tabulación lógico y estados de interacción distinguibles.
- No comunicar estados solo mediante color; acompañar con texto, iconos o forma.
- Verificar escalado de texto, ancho de lectura y adaptación móvil.
