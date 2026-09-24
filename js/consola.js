/*
 * Consola de la sección ~/consola.
 *
 * Es una terminal de pega: compara lo que escribes contra una lista de
 * patrones y responde con texto. Reglas que no se rompen nunca aquí:
 *
 *   - Todo se pinta con textContent. Nada de innerHTML: sería irónico meter
 *     un XSS de verdad justo en la sección que se ríe de quien busca uno.
 *   - Nada de eval ni de new Function sobre lo que escribe el visitante.
 *   - No se envía nada a ningún sitio ni se guarda nada. No hay servidor.
 */

(function () {
  "use strict";

  const panel = document.getElementById("consola");
  if (!panel) return;
  if (typeof DATOS === "undefined" || !DATOS.consola) return;

  const cfg = DATOS.consola;
  const salida = document.getElementById("consola-salida");
  const entrada = document.getElementById("consola-entrada");
  if (!salida || !entrada) return;

  const LIMITE_LINEAS = 120;
  let siguienteDefecto = 0;
  const historial = [];
  let posicionHistorial = -1;

  function escribir(texto, clase) {
    const linea = document.createElement("p");
    linea.className = "consola__linea" + (clase ? " " + clase : "");
    linea.textContent = texto;
    salida.appendChild(linea);

    // Se recorta por arriba para que una sesión larga no infle el DOM.
    while (salida.children.length > LIMITE_LINEAS) {
      salida.removeChild(salida.firstChild);
    }
    salida.scrollTop = salida.scrollHeight;
  }

  function responder(orden) {
    const encaja = cfg.respuestas.find(function (r) {
      return r.patron.test(orden);
    });

    if (encaja) {
      encaja.texto.forEach(function (t) {
        escribir(t, "consola__linea--respuesta");
      });
      return;
    }

    const porDefecto = cfg.porDefecto || [];
    if (!porDefecto.length) return;
    // Van rotando, así que insistir con tonterías no devuelve siempre lo mismo.
    escribir(porDefecto[siguienteDefecto % porDefecto.length], "consola__linea--respuesta");
    siguienteDefecto++;
  }

  function ejecutar(orden) {
    escribir("$ " + orden, "consola__linea--orden");

    if (/^(limpiar|clear|cls)$/i.test(orden)) {
      salida.textContent = "";
      return;
    }

    responder(orden);
  }

  entrada.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (!historial.length) return;
      e.preventDefault();
      if (e.key === "ArrowUp") {
        posicionHistorial = posicionHistorial < 0 ? historial.length - 1 : Math.max(0, posicionHistorial - 1);
      } else {
        posicionHistorial = posicionHistorial < 0 ? -1 : Math.min(historial.length - 1, posicionHistorial + 1);
      }
      entrada.value = historial[posicionHistorial] || "";
      return;
    }

    if (e.key !== "Enter") return;
    const orden = entrada.value.trim();
    entrada.value = "";
    if (!orden) return;

    historial.push(orden);
    posicionHistorial = -1;
    ejecutar(orden);
  });

  (cfg.bienvenida || []).forEach(function (t) {
    escribir(t, "consola__linea--tenue");
  });
})();
