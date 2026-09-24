# Portfolio de Manuel Pérez

Web estática, sin build ni dependencias. Se abre con doble clic sobre `index.html` o se despliega en Netlify tal cual.

## Editar el contenido

Todo el texto de la web (nombre, resumen, experiencia, stack, proyectos, formación, idiomas, casos del triage y datos de contacto) vive en `js/datos.js`. Es un único objeto `DATOS` con comentarios en español. Cambia lo que haga falta ahí y guarda: no hace falta tocar `index.html` ni `js/app.js`.

Campos que quedan pendientes de rellenar:

- `contacto.telefono` y `contacto.direccion`: vacíos por privacidad. Si los rellenas, aparecen en la web pública.

## El triage de logs

La sección `~/triage` enseña una línea de log y pide decidir si es normal o sospechosa. Los casos están en `DATOS.triage.casos`, y cada uno tiene cuatro campos:

- `origen`: de dónde sale el log, se muestra debajo en gris.
- `linea`: el texto del log. Los saltos de línea se escriben con `\n`.
- `sospechoso`: `true` o `false`, la respuesta correcta.
- `explicacion`: lo que se muestra después de responder, acierte o falle.

Para añadir un caso, copia un objeto entero y cambia los campos. La web se adapta sola al número de casos: el contador, el marcador y el texto de cierre salen de ahí. Si vacías `casos`, la sección y su enlace del menú desaparecen solos.

Los textos de cierre según el porcentaje de aciertos están en `DATOS.triage.cierres` (`alto` desde el 75%, `medio` desde el 50%, `bajo` por debajo).

## El fondo

Son dos capas y ninguna captura el ratón:

- La rejilla de 48px es CSS puro (`body::before` en `css/estilo.css`).
- La red de nodos es `js/fondo.js` dibujando sobre un `<canvas>`. Se para sola si la pestaña deja de verse y, si el sistema pide menos movimiento, pinta un fotograma y no anima. Para quitarla, borra la etiqueta `<script src="js/fondo.js">` de `index.html`.

## Estructura

```
index.html          estructura de la página
css/estilo.css       estilo (tema oscuro, tipografía, layout)
js/datos.js           todo el contenido editable
js/app.js              vuelca datos.js en el HTML y mueve el triage
js/fondo.js             red de nodos del fondo
netlify.toml             configuración de despliegue y cabeceras
```

## El CV

La web no ofrece el CV en descarga. El PDF original lleva teléfono y dirección
postal, y esto es una página pública. Si quieres ofrecerlo, prepara una versión
sin esos datos, guárdala en `cv/` y pon su ruta en `cv.archivo` dentro de
`js/datos.js`: el botón de descarga vuelve a aparecer solo.

## Cabeceras de seguridad

`netlify.toml` fija una CSP que solo permite estilos de Google Fonts y scripts del propio sitio. **No admite scripts ni estilos escritos dentro del HTML**: si añades un `<script>` con código suelto o un `style="..."` en una etiqueta, funcionará en local y fallará en producción. Todo el JavaScript va en archivos dentro de `js/`.

## Desplegar en Netlify

1. Sube esta carpeta a un repositorio de GitHub.
2. En Netlify, "Add new site" → "Import an existing project" → selecciona el repo.
3. Build command: déjalo vacío. Publish directory: `.` (la raíz).
4. Deploy. No hace falta ninguna variable de entorno.

Cada vez que hagas push a la rama principal, Netlify vuelve a publicar sola.
