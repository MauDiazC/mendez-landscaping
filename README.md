# Mi Proyecto Web - Evergreen Landscaping

Sitio web estático desarrollado con HTML5, Tailwind CSS, CSS3 personalizado y JavaScript modular.

## Estructura del Proyecto

```
mi-proyecto/
│
├── index.html              ← Página principal (réplica organizada de pivote/home.html)
├── README.md               ← Documentación del proyecto
│
├── pages/                  ← Páginas adicionales del sitio
│   ├── service-areas.html  ← Cobertura regional, distritos, mapa de flota y FAQs
│   └── areas.html          ← Alias/réplica de service-areas.html
│
├── components/             ← Fragmentos reutilizables
│   ├── navbar.html         ← Encabezado con navegación responsiva y selector de idioma
│   └── footer.html         ← Pie de página con enlaces y banner de contacto
│
├── css/
│   └── styles.css          ← Estilos globales y tokens de diseño (Verdant Craft)
│
├── js/
│   └── main.js             ← JavaScript modular (menú móvil, idioma, validador de ZIP, acordeones)
│
├── docs/                   ← Documentación y Guía de Estilos
│   ├── home.md             ← Tokens de diseño y especificaciones (réplica de pivote)
│   ├── areas.md            ← Especificaciones de áreas y diseño
│   └── design-system.md    ← Guía completa del sistema de diseño (Verdant Craft)
│
├── assets/                 ← Recursos estáticos
│   ├── images/             ← Imágenes
│   ├── videos/             ← Videos
│   ├── fonts/              ← Fuentes tipográficas
│   └── icons/              ← Íconos
│
└── pivote/                 ← Archivos originales de referencia
    ├── areas.html
    └── areas.md
```

## Características y Reorganización Realizada

1. **Página Principal (`index.html`)**:
   - Ensamblada en la raíz como punto de entrada del proyecto.
   - Enlazada a `css/styles.css` y `js/main.js`.
   - Navegación y pie de página enlazados directamente a `pages/service-areas.html`.
   - Incluye Tailwind CSS CDN configurado con los tokens de diseño de la marca.
   - Cuenta con las 8 secciones completas de contenido, imágenes y tipografía.

2. **Página de Áreas de Servicio (`pages/service-areas.html`)**:
   - Aloja el contenido estructurado de `pivote/areas.html` integrado con los estilos globales y scripts del proyecto.
   - Contiene el validador interactivo de código postal (ZIP Code Coverage Checker), mapa estático con pines de flota y telemetría en tiempo real, directorio de distritos (Districts A, B, C y D), galería bento de proyectos locales y acordeón de preguntas frecuentes (FAQs).
   - "Service Areas" activo en la barra de navegación y enlaces relativos hacia `../index.html`.

3. **Componentes Modulares (`components/`)**:
   - `navbar.html`: Header fijo con desenfoque de fondo (*backdrop-blur*), logotipo, menú de servicios desplegable, selector de idioma (EN/ES), enlace a `pages/service-areas.html`, botón de llamada a la acción (*CTA*) y menú hamburguesa responsivo.
   - `footer.html`: Barra de llamado a la acción previa, pie de página en 4 columnas (marca, enlaces rápidos enlazando a `pages/service-areas.html`, servicios, contacto) y franja legal.

4. **Estilos Globales y Tokens (`css/styles.css`)**:
   - Definición de todas las variables CSS (`:root`) extraídas del sistema de diseño Verdant Craft (colores primarios, secundarios, de superficie, contenedores, escalas tipográficas y espaciados).
   - Clases de utilidad tipográfica (Display Hero, Headlines, Body, Labels).
   - Estilos de componentes (botones píldora, tarjetas con elevación Nivel 1 y 2).

5. **Lógica de Interacción (`js/main.js`)**:
   - Menú móvil desplegable con control de accesibilidad (`aria-expanded`), cierre automático al hacer clic en enlaces y soporte para la tecla `Escape`.
   - Selector de idioma dinámico (guarda la preferencia en `localStorage`).
   - Verificador de cobertura por código postal (ZIP search con retroalimentación instantánea).
   - Filtro de zonas operativas (`zone-filter-btn`).
   - Acordeón accesible de preguntas frecuentes (`faq-toggle-btn`) con animación de iconos.
   - Sombra dinámica de la barra de navegación al hacer scroll y desplazamiento suave (*smooth scroll*).

6. **Documentación del Sistema de Diseño (`docs/`)**:
   - `docs/home.md`, `docs/areas.md` y `docs/design-system.md`: Documentación completa de la paleta de colores, jerarquía de superficies, escalas tipográficas y componentes del sistema Verdant Craft.

## Cómo usar

Abre `index.html` en tu navegador o usa un servidor local como Live Server en VS Code.
Navega a "Service Areas" desde el navbar o footer para explorar la página regional.
