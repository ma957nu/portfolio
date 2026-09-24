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

## Las direcciones de las secciones

Cada sección tiene su propia URL, sin almohadilla: `/consola`, `/mapa`, `/triage`... En el HTML los enlaces siguen siendo anclas normales (`href="#mapa"`), que es lo que funciona en todas partes, incluido abrir el archivo con doble clic. Lo que hace que la barra de direcciones quede limpia son dos piezas:

1. **Las reglas de `netlify.toml`**: cada sección se sirve como `index.html` con estado 200, sin redirección visible. Van listadas una a una a propósito: con un comodín, cualquier URL inventada devolvería la portada en lugar de un 404.
2. **El enrutador de `js/app.js`** (`activarRutas`): al pulsar un enlace cambia la URL con `history.pushState` y baja a la sección; al entrar directamente en `/consola` lee la ruta y baja sola; y el botón de atrás del navegador funciona.

**Si añades una sección nueva, hay que añadir también su regla en `netlify.toml`.** Si se olvida, el enlace del menú seguirá funcionando, pero compartir esa URL o recargar la página dará un 404.

Abierta desde el disco (`file://`) no hay rutas que valgan, así que el enrutador se queda quieto y los enlaces funcionan como anclas de toda la vida.

## La consola de pega

La sección `~/consola` es una terminal falsa para quien llegue con ganas de probar cosas. No ejecuta nada: compara lo escrito contra una lista de expresiones regulares y responde con texto.

Todo vive en `DATOS.consola` dentro de `js/datos.js`:

- `respuestas`: lista de `{ patron, texto }`. `patron` es una expresión regular normal (`/^ls(s|$)/i`) y `texto` un array de líneas. **El primer patrón que encaja gana, así que el orden importa**: los comandos normales van antes que los patrones de ataque, o `cat` acabaría capturado por el de inyección de comandos.
- `porDefecto`: respuestas para cuando no encaja nada. Van rotando.
- `bienvenida`, `intro`, `aviso` y `pie`: los textos de alrededor.

Hay una flag escondida: `ls` lista un fichero que invita a no mirarlo, `cat` sobre ese fichero la enseña, y escribirla tiene su propia respuesta.

**Tres reglas que no se rompen en `js/consola.js`:**

1. Todo se pinta con `textContent`, nunca con `innerHTML`. Sería ridículo tener un XSS de verdad justo en la sección que se ríe de quien busca uno.
2. Nada de `eval` ni de `new Function` sobre lo que escribe el visitante.
3. No se envía nada a ningún sitio ni se guarda nada: no hay servidor detrás, y el texto de la sección lo dice.

## El globo 3D

La sección `~/mapa` dibuja un globo con three.js: los continentes son puntos, y cada arco es un origen llamando a la puerta de un servidor.

- **Los datos son una muestra, no tráfico real.** Están en `DATOS.globo` dentro de `js/datos.js`: el destino (`destino`) y la lista de orígenes con ciudad, país, coordenadas y tipo de intento. Si algún día pones datos de verdad, cambia también el texto de `nota`, que es el que avisa de que esto es una simulación.
- **Los continentes** salen de `js/globo-puntos.js`, 2.456 pares de latitud y longitud (29 KB), Antártida incluida. Se generaron una sola vez a partir del mapa de Natural Earth, muestreando una rejilla y quedándose con los puntos que caen en tierra. Las filas se separan más según se acercan a los polos, donde los meridianos se juntan: sin eso, la Antártida acaba con un amasijo de puntos en el centro. No hace falta ninguna imagen ni conexión.
- **three.js** vive en `js/vendor/` (690 KB) y **solo se descarga cuando la sección se acerca a la pantalla**. Quien entre a leer la experiencia y se vaya no lo paga.

**Al abrir `index.html` con doble clic, el globo no se ve.** three.js es un módulo y el navegador bloquea los módulos cuando la página viene del disco en vez de un servidor. En Netlify funciona con normalidad; en local, la sección enseña un aviso explicándolo y el resto de la web sigue igual. Para verlo en local hace falta levantar un servidor, por ejemplo `npx serve` en esta carpeta.

## Tipografías e iconos

Tres fuentes, las tres servidas desde `fonts/` y recortadas a lo que la web usa. **No se pide nada a Google ni a ningún CDN**, así que la web no depende de terceros ni filtra a nadie quién la visita.

| archivo | para qué | peso |
| --- | --- | --- |
| `departure-mono.woff2` | solo la sección ~/mapa (fuente de píxeles) | 4,8 KB |
| `hack-regular.woff2` | todo el texto | 15 KB |
| `hack-bold.woff2` | lo mismo en negrita | 15 KB |
| `simbolos-nerd.woff2` | los 26 iconos que se usan | 4,3 KB |

Sin recortar, Hack pesa 105 KB por peso y la fuente de símbolos 2,4 MB.

Departure Mono se usa **solo dentro de `#mapa`**: el título de la sección y los textos del panel del globo, que es donde una pantalla de vigilancia pega. El párrafo de entrada de esa sección se queda en Hack, porque son cuatro líneas seguidas y en píxeles se leen peor. El resto de la web va en Hack de principio a fin.

Departure Mono solo tiene un grosor, así que va con `font-weight: 400`: pedirle negrita haría que el navegador se la invente y los píxeles se emborronan. El texto corrido lleva `line-height: 1.75`, más aire del normal, porque un párrafo monoespaciado cansa más que uno en sans.

Si prefieres volver a una sans para el texto corrido, es una línea: cambia `--fuente-sans` en `css/estilo.css`.

Un icono se escribe así, y siempre con `aria-hidden` para que un lector de pantalla no lo lea:

```html
<span class="icono" aria-hidden="true">&#xf007;</span>
```

Los puntos de código de las partes generadas por JavaScript están en el objeto `ICONOS` de `js/app.js` y en `ICONOS_TIPO` de `js/globo.js` (uno por tipo de intento del globo).

**Si añades un icono nuevo hay que regenerar la fuente**, porque el que no esté en el recorte sale como un cuadradito vacío. Hace falta la fuente completa (`SymbolsNerdFont-Regular.ttf` del repositorio de Nerd Fonts) y el paquete `subset-font`:

```js
import subsetFont from 'subset-font';
const iconos = [0xf007, 0xf0b1 /* ...y el nuevo */]
  .map(c => String.fromCodePoint(c)).join('');
const recortada = await subsetFont(fuenteCompleta, iconos, { targetFormat: 'woff2' });
```

Las licencias de las tres fuentes están en `fonts/`. Departure Mono es de Helena Zhang, bajo SIL Open Font License.

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
js/consola.js            la terminal de pega
js/globo.js               globo 3D de ~/mapa
js/globo-puntos.js        los continentes, punto a punto
js/vendor/three.module.js  three.js
fonts/                   las tres fuentes, recortadas
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

`netlify.toml` fija una CSP cerrada: todo (estilos, fuentes, scripts) tiene que venir del propio sitio. Al dejar de usar Google Fonts ya no hay ninguna excepción para dominios externos. **No admite scripts ni estilos escritos dentro del HTML**: si añades un `<script>` con código suelto o un `style="..."` en una etiqueta, funcionará en local y fallará en producción. Todo el JavaScript va en archivos dentro de `js/`.

## Desplegar en Netlify

1. Sube esta carpeta a un repositorio de GitHub.
2. En Netlify, "Add new site" → "Import an existing project" → selecciona el repo.
3. Build command: déjalo vacío. Publish directory: `.` (la raíz).
4. Deploy. No hace falta ninguna variable de entorno.

Cada vez que hagas push a la rama principal, Netlify vuelve a publicar sola.
