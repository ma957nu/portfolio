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

## El globo 3D

La sección `~/mapa` dibuja un globo con three.js: los continentes son puntos, y cada arco es un origen llamando a la puerta de un servidor.

- **Los datos son una muestra, no tráfico real.** Están en `DATOS.globo` dentro de `js/datos.js`: el destino (`destino`) y la lista de orígenes con ciudad, país, coordenadas y tipo de intento. Si algún día pones datos de verdad, cambia también el texto de `nota`, que es el que avisa de que esto es una simulación.
- **Los continentes** salen de `js/globo-puntos.js`, 2.250 pares de latitud y longitud (27 KB). Se generaron una sola vez a partir del mapa de Natural Earth, muestreando una rejilla y quedándose con los puntos que caen en tierra. No hace falta ninguna imagen ni conexión.
- **three.js** vive en `js/vendor/` (690 KB) y **solo se descarga cuando la sección se acerca a la pantalla**. Quien entre a leer la experiencia y se vaya no lo paga.

**Al abrir `index.html` con doble clic, el globo no se ve.** three.js es un módulo y el navegador bloquea los módulos cuando la página viene del disco en vez de un servidor. En Netlify funciona con normalidad; en local, la sección enseña un aviso explicándolo y el resto de la web sigue igual. Para verlo en local hace falta levantar un servidor, por ejemplo `npx serve` en esta carpeta.

## Tipografías e iconos

La mono es **Hack** y los iconos son glifos de **Nerd Fonts**. Las dos se sirven desde `fonts/`, no desde un CDN, y van recortadas a lo que la web usa de verdad:

| archivo | contenido | peso |
| --- | --- | --- |
| `hack-regular.woff2` | Hack, solo latín y signos | 15 KB |
| `hack-bold.woff2` | lo mismo en negrita | 15 KB |
| `simbolos-nerd.woff2` | los 22 iconos que se usan | 4 KB |

Sin recortar, Hack pesa 105 KB por peso y la fuente de símbolos 2,4 MB.

Un icono se escribe así, y siempre con `aria-hidden` para que un lector de pantalla no lo lea:

```html
<span class="icono" aria-hidden="true">&#xf007;</span>
```

En `js/app.js` hay un objeto `ICONOS` con los puntos de código que usan las partes generadas por JavaScript (contacto, stack, proyectos, triage).

**Si añades un icono nuevo hay que regenerar la fuente**, porque el que no esté en el recorte sale como un cuadradito vacío. Hace falta la fuente completa (`SymbolsNerdFont-Regular.ttf` del repositorio de Nerd Fonts) y el paquete `subset-font`:

```js
import subsetFont from 'subset-font';
const iconos = [0xf007, 0xf0b1 /* ...y el nuevo */]
  .map(c => String.fromCodePoint(c)).join('');
const recortada = await subsetFont(fuenteCompleta, iconos, { targetFormat: 'woff2' });
```

Las licencias de ambas fuentes están en `fonts/`. Inter se sigue pidiendo a Google Fonts.

## El icono de la pestaña

`favicon.svg` es el icono que sale en la pestaña del navegador: un prompt `>_` en verde sobre fondo oscuro, dibujado con formas y sin texto, para que se vea igual en cualquier sistema. `apple-touch-icon.png` es el mismo icono a 180px, que es el que usa iOS al guardar la web en la pantalla de inicio.

Si lo cambias, toca los dos archivos: el navegador cachea los iconos con ganas, así que puede tardar en refrescarse (Ctrl+F5, o abrir `favicon.svg` directamente para comprobar el nuevo).

## Estructura

```
index.html          estructura de la página
css/estilo.css       estilo (tema oscuro, tipografía, layout)
js/datos.js           todo el contenido editable
js/app.js              vuelca datos.js en el HTML y mueve el triage
js/fondo.js             red de nodos del fondo
js/globo.js              globo 3D de ~/mapa
js/globo-puntos.js        los continentes, punto a punto
js/vendor/three.module.js  three.js
fonts/                   Hack y los iconos, recortadas
favicon.svg               icono de la pestaña
apple-touch-icon.png      el mismo icono para iOS
netlify.toml               configuración de despliegue y cabeceras
```

## El CV

La web no ofrece el CV en descarga. El PDF original lleva teléfono y dirección
postal, y esto es una página pública. Si quieres ofrecerlo, prepara una versión
sin esos datos, guárdala en `cv/` y pon su ruta en `cv.archivo` dentro de
`js/datos.js`: el botón de descarga vuelve a aparecer solo.

## Cabeceras de seguridad

`netlify.toml` fija una CSP que solo permite estilos de Google Fonts, fuentes del propio sitio y de Google, y scripts del propio sitio. **No admite scripts ni estilos escritos dentro del HTML**: si añades un `<script>` con código suelto o un `style="..."` en una etiqueta, funcionará en local y fallará en producción. Todo el JavaScript va en archivos dentro de `js/`.

## Desplegar en Netlify

1. Sube esta carpeta a un repositorio de GitHub.
2. En Netlify, "Add new site" → "Import an existing project" → selecciona el repo.
3. Build command: déjalo vacío. Publish directory: `.` (la raíz).
4. Deploy. No hace falta ninguna variable de entorno.

Cada vez que hagas push a la rama principal, Netlify vuelve a publicar sola.
