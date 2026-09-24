/*
 * Fondo: red de nodos que se mueve muy despacio detrás del contenido.
 * Se dibuja en un canvas propio, por debajo de todo y sin capturar clics.
 *
 * Reglas que se respetan aquí:
 *  - Si el visitante pide menos movimiento, se pinta un fotograma y se para.
 *  - Si la pestaña deja de verse, el bucle se detiene (no gasta batería).
 *  - En pantallas pequeñas hay menos nodos, que es donde más se nota el coste.
 */

(function () {
  "use strict";

  const lienzo = document.getElementById("fondo-red");
  if (!lienzo || !lienzo.getContext) return;

  const ctx = lienzo.getContext("2d");
  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

  const COLOR = "100, 219, 184"; // el acento de la web, en componentes RGB
  const DISTANCIA_ENLACE = 130; // px entre nodos para dibujar la línea
  const RADIO_RATON = 170; // radio de influencia del cursor

  let nodos = [];
  let ancho = 0;
  let alto = 0;
  let animacion = null;
  const raton = { x: null, y: null };

  function cuantosNodos() {
    // Un nodo por cada ~22.000 px² de pantalla, con topes para que ni se vacíe
    // en un móvil ni se convierta en una malla en un monitor grande.
    const porArea = Math.round((ancho * alto) / 22000);
    return Math.max(24, Math.min(90, porArea));
  }

  function crearNodos() {
    const total = cuantosNodos();
    nodos = [];
    for (let i = 0; i < total; i++) {
      nodos.push({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        // Velocidades deliberadamente bajas: la red debe respirar, no viajar.
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.2 + 0.8,
      });
    }
  }

  function dimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ancho = window.innerWidth;
    alto = window.innerHeight;
    lienzo.width = Math.floor(ancho * dpr);
    lienzo.height = Math.floor(alto * dpr);
    lienzo.style.width = ancho + "px";
    lienzo.style.height = alto + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    crearNodos();
  }

  function dibujar() {
    ctx.clearRect(0, 0, ancho, alto);

    for (let i = 0; i < nodos.length; i++) {
      const a = nodos[i];

      for (let j = i + 1; j < nodos.length; j++) {
        const b = nodos[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > DISTANCIA_ENLACE) continue;
        // Cuanto más lejos están dos nodos, más se apaga la línea que los une.
        const alfa = (1 - dist / DISTANCIA_ENLACE) * 0.18;
        ctx.strokeStyle = "rgba(" + COLOR + "," + alfa.toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(" + COLOR + ",0.32)";
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Línea del cursor a los nodos cercanos: la única parte que reacciona.
    if (raton.x !== null) {
      for (let i = 0; i < nodos.length; i++) {
        const n = nodos[i];
        const dx = n.x - raton.x;
        const dy = n.y - raton.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > RADIO_RATON) continue;
        const alfa = (1 - dist / RADIO_RATON) * 0.3;
        ctx.strokeStyle = "rgba(" + COLOR + "," + alfa.toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(raton.x, raton.y);
        ctx.stroke();
      }
    }
  }

  function mover() {
    for (let i = 0; i < nodos.length; i++) {
      const n = nodos[i];
      n.x += n.vx;
      n.y += n.vy;
      // Rebote suave en los bordes, así ningún nodo se pierde fuera de pantalla.
      if (n.x < 0 || n.x > ancho) n.vx *= -1;
      if (n.y < 0 || n.y > alto) n.vy *= -1;
    }
  }

  function bucle() {
    mover();
    dibujar();
    animacion = window.requestAnimationFrame(bucle);
  }

  function arrancar() {
    if (animacion !== null) return;
    if (menosMovimiento.matches) {
      dibujar();
      return;
    }
    animacion = window.requestAnimationFrame(bucle);
  }

  function parar() {
    if (animacion === null) return;
    window.cancelAnimationFrame(animacion);
    animacion = null;
  }

  let temporizador = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(temporizador);
    temporizador = window.setTimeout(function () {
      dimensionar();
      if (menosMovimiento.matches) dibujar();
    }, 200);
  });

  window.addEventListener("pointermove", function (e) {
    raton.x = e.clientX;
    raton.y = e.clientY;
  });

  window.addEventListener("pointerleave", function () {
    raton.x = null;
    raton.y = null;
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) parar();
    else arrancar();
  });

  if (menosMovimiento.addEventListener) {
    menosMovimiento.addEventListener("change", function () {
      parar();
      arrancar();
    });
  }

  dimensionar();
  arrancar();
})();
