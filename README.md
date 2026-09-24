# Portfolio de Manuel Pérez

Web estática, sin build ni dependencias. Se abre con doble clic sobre `index.html` o se despliega en Netlify tal cual.

## Editar el contenido

Todo el texto de la web (nombre, resumen, experiencia, stack, proyectos, formación, idiomas y datos de contacto) vive en `js/datos.js`. Es un único objeto `DATOS` con comentarios en español. Cambia lo que haga falta ahí y guarda: no hace falta tocar `index.html` ni `js/app.js`.

Campos que quedan pendientes de rellenar:

- `contacto.telefono` y `contacto.direccion`: vacíos por privacidad. Si los rellenas, aparecen en la web pública.
- `contacto.linkedin`: vacío porque la URL no estaba confirmada. Si lo rellenas, aparece el enlace; si no, se oculta solo.
- Los dos últimos proyectos en `proyectos` son plantillas de ejemplo (homelab y write-up de CTF), marcadas con un comentario `// borra o sustituye`. Bórralas o rellénalas cuando tengas contenido real.

## Estructura

```
index.html          estructura de la página
css/estilo.css       estilo (tema oscuro, tipografía, layout)
js/datos.js           todo el contenido editable
js/app.js              vuelca datos.js en el HTML
```

## El CV

La web no ofrece el CV en descarga. El PDF original lleva teléfono y dirección
postal, y esto es una página pública. Si quieres ofrecerlo, prepara una versión
sin esos datos, guárdala en `cv/` y pon su ruta en `cv.archivo` dentro de
`js/datos.js`: el botón de descarga vuelve a aparecer solo.

## Desplegar en Netlify

1. Sube esta carpeta a un repositorio de GitHub.
2. En Netlify, "Add new site" → "Import an existing project" → selecciona el repo.
3. Build command: déjalo vacío. Publish directory: `.` (la raíz).
4. Deploy. No hace falta ninguna variable de entorno.

Cada vez que hagas push a la rama principal, Netlify vuelve a publicar sola.
