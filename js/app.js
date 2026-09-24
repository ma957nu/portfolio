/*
 * Toma el contenido de js/datos.js y lo vuelca en el HTML.
 * No hay build step: esto es JS plano pensado para abrirse con file://.
 */

(function () {
  "use strict";

  /*
   * Iconos de Nerd Fonts. Se pasan por aquí para que siempre salgan con
   * aria-hidden: quien navegue con lector de pantalla oye el texto de al lado,
   * no el nombre del glifo.
   */
  const ICONOS = {
    email: 0xf0e0,
    github: 0xf09b,
    linkedin: 0xf08c,
    hackthebox: 0xf023,
    telefono: 0xf2c2,
    enlace: 0xf08e,
    acierto: 0xf00c,
    fallo: 0xf00d,
    sistemas: 0xf17c,
    "identidad y acceso": 0xf084,
    desarrollo: 0xf121,
    "en aprendizaje": 0xf02d,
  };

  function icono(clave) {
    const punto = typeof clave === "number" ? clave : ICONOS[clave];
    if (!punto) return null;
    const span = document.createElement("span");
    span.className = "icono";
    span.setAttribute("aria-hidden", "true");
    span.textContent = String.fromCodePoint(punto);
    return span;
  }

  function texto(id, valor) {
    const el = document.getElementById(id);
    if (el && valor) el.textContent = valor;
  }

  function pintarCabecera() {
    document.title = DATOS.meta.titulo;
    const meta = document.querySelector('meta[name="descripcion"]');
    if (meta) meta.setAttribute("content", DATOS.meta.descripcion);

    texto("hero-eyebrow", DATOS.perfil.eyebrow);
    texto("hero-nombre", DATOS.perfil.nombre);
    texto("hero-rol", DATOS.perfil.rol);
    texto("hero-objetivo", DATOS.perfil.objetivo);
    texto("hero-resumen", DATOS.perfil.titular || DATOS.perfil.resumen);
    texto("hero-ubicacion", DATOS.perfil.ubicacion);
    texto("sobre-mi-texto", DATOS.perfil.resumen);

    const cv = DATOS.cv.archivo;
    ["enlace-cv-nav", "enlace-cv-hero"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el && cv) {
        el.setAttribute("href", cv);
        el.textContent = DATOS.cv.etiqueta || "descargar CV";
      } else if (el) {
        el.remove();
      }
    });

    // Sin CV, el hero se quedaría con un único botón de contorno: le damos el
    // peso del botón principal para que la llamada a la acción no se pierda.
    if (!cv) {
      const contacto = document.querySelector(".hero__acciones .boton--linea");
      if (contacto) {
        contacto.classList.remove("boton--linea");
        contacto.classList.add("boton--primario");
      }
    }
  }

  function pintarExperiencia() {
    const cont = document.getElementById("lista-experiencia");
    if (!cont) return;
    DATOS.experiencia.forEach(function (item) {
      const art = document.createElement("article");
      art.className = "tarjeta-experiencia";

      const cabecera = document.createElement("div");
      cabecera.className = "tarjeta-experiencia__cabecera";

      const titulos = document.createElement("div");
      const puesto = document.createElement("h3");
      puesto.className = "tarjeta-experiencia__puesto";
      puesto.textContent = item.puesto;
      const empresa = document.createElement("p");
      empresa.className = "mono tarjeta-experiencia__empresa";
      empresa.textContent = item.empresa + (item.contexto ? " · " + item.contexto : "");
      titulos.appendChild(puesto);
      titulos.appendChild(empresa);

      const periodo = document.createElement("p");
      periodo.className = "mono tarjeta-experiencia__periodo";
      periodo.textContent = item.periodo;

      cabecera.appendChild(titulos);
      cabecera.appendChild(periodo);

      const desc = document.createElement("p");
      desc.className = "prosa tarjeta-experiencia__descripcion";
      desc.textContent = item.descripcion;

      art.appendChild(cabecera);
      art.appendChild(desc);

      if (item.etiquetas && item.etiquetas.length) {
        const etiquetas = document.createElement("ul");
        etiquetas.className = "etiquetas";
        item.etiquetas.forEach(function (e) {
          const li = document.createElement("li");
          li.className = "mono etiqueta-chip";
          li.textContent = e;
          etiquetas.appendChild(li);
        });
        art.appendChild(etiquetas);
      }

      cont.appendChild(art);
    });
  }

  function pintarStack() {
    const cont = document.getElementById("rejilla-stack");
    if (!cont) return;
    DATOS.stack.forEach(function (grupo) {
      const bloque = document.createElement("div");
      bloque.className = "grupo-stack";

      const titulo = document.createElement("p");
      titulo.className = "mono grupo-stack__titulo";
      const icoStack = icono(grupo.categoria);
      if (icoStack) titulo.appendChild(icoStack);
      titulo.appendChild(document.createTextNode(grupo.categoria));

      const lista = document.createElement("ul");
      lista.className = "grupo-stack__lista";
      grupo.items.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
      });

      bloque.appendChild(titulo);
      bloque.appendChild(lista);
      cont.appendChild(bloque);
    });

    const listaObjetivos = document.getElementById("lista-objetivos");
    if (listaObjetivos && DATOS.objetivos) {
      DATOS.objetivos.forEach(function (obj) {
        const li = document.createElement("li");
        li.textContent = obj;
        listaObjetivos.appendChild(li);
      });
    }
  }

  function pintarProyectos() {
    const cont = document.getElementById("rejilla-proyectos");
    if (!cont) return;
    DATOS.proyectos.forEach(function (p) {
      const art = document.createElement("article");
      art.className = "tarjeta-proyecto" + (p.destacado ? " tarjeta-proyecto--destacado" : "");

      const cabecera = document.createElement("div");
      cabecera.className = "tarjeta-proyecto__cabecera";
      const nombre = document.createElement("h3");
      nombre.textContent = p.nombre;
      cabecera.appendChild(nombre);
      if (p.estado) {
        const marca = document.createElement("span");
        marca.className = "mono marca-estado";
        marca.textContent = p.estado;
        cabecera.appendChild(marca);
      } else if (p.destacado) {
        const marca = document.createElement("span");
        marca.className = "mono marca-destacado";
        marca.textContent = "proyecto propio";
        cabecera.appendChild(marca);
      }
      art.appendChild(cabecera);

      const resumen = document.createElement("p");
      resumen.className = "prosa tarjeta-proyecto__resumen";
      resumen.textContent = p.resumen;
      art.appendChild(resumen);

      if (p.problema) {
        const bloqueProblema = document.createElement("p");
        bloqueProblema.className = "prosa tarjeta-proyecto__bloque";
        const etiqueta = document.createElement("span");
        etiqueta.className = "mono tarjeta-proyecto__etiqueta";
        etiqueta.textContent = "problema ";
        bloqueProblema.appendChild(etiqueta);
        bloqueProblema.appendChild(document.createTextNode(p.problema));
        art.appendChild(bloqueProblema);
      }

      if (p.resultado) {
        const bloqueResultado = document.createElement("p");
        bloqueResultado.className = "prosa tarjeta-proyecto__bloque";
        const etiqueta = document.createElement("span");
        etiqueta.className = "mono tarjeta-proyecto__etiqueta";
        etiqueta.textContent = "resultado ";
        bloqueResultado.appendChild(etiqueta);
        bloqueResultado.appendChild(document.createTextNode(p.resultado));
        art.appendChild(bloqueResultado);
      }

      if (p.stack && p.stack.length) {
        const etiquetas = document.createElement("ul");
        etiquetas.className = "etiquetas";
        p.stack.forEach(function (s) {
          const li = document.createElement("li");
          li.className = "mono etiqueta-chip";
          li.textContent = s;
          etiquetas.appendChild(li);
        });
        art.appendChild(etiquetas);
      }

      if (p.nota) {
        const nota = document.createElement("p");
        nota.className = "tarjeta-proyecto__nota";
        nota.textContent = p.nota;
        art.appendChild(nota);
      }

      if (p.enlace) {
        const enlace = document.createElement("a");
        enlace.className = "enlace-proyecto";
        enlace.href = p.enlace;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        const icoEnlace = icono("enlace");
        if (icoEnlace) enlace.appendChild(icoEnlace);
        enlace.appendChild(document.createTextNode(p.enlaceEtiqueta || "ver más"));
        art.appendChild(enlace);
      }

      cont.appendChild(art);
    });
  }

  /*
   * Triage de logs: enseña una línea, recoge la decisión del visitante y
   * explica qué la delataba. El estado vive aquí dentro, no hay nada que
   * guardar ni que enviar a ningún sitio.
   */
  function pintarTriage() {
    const panel = document.getElementById("triage-panel");
    if (!panel) return;

    const cfg = DATOS.triage;
    const casos = cfg && cfg.casos ? cfg.casos : [];
    if (!casos.length) {
      const seccion = document.getElementById("triage");
      if (seccion) seccion.remove();
      const enlaceNav = document.querySelector('.nav a[href="#triage"]');
      if (enlaceNav) enlaceNav.remove();
      return;
    }

    texto("triage-titulo", cfg.titulo);
    texto("triage-intro", cfg.intro);

    const elLog = document.getElementById("triage-log");
    const elOrigen = document.getElementById("triage-origen");
    const elContador = document.getElementById("triage-contador");
    const elMarcador = document.getElementById("triage-marcador");
    const acciones = document.getElementById("triage-acciones");
    const respuesta = document.getElementById("triage-respuesta");
    const veredicto = document.getElementById("triage-veredicto");
    const explicacion = document.getElementById("triage-explicacion");
    const cierre = document.getElementById("triage-cierre");
    const resultado = document.getElementById("triage-resultado");
    const cierreTexto = document.getElementById("triage-cierre-texto");

    let indice = 0;
    let aciertos = 0;

    function mostrarCaso() {
      const caso = casos[indice];
      elLog.textContent = caso.linea;
      elOrigen.textContent = caso.origen || "";
      elContador.textContent = "caso " + (indice + 1) + " de " + casos.length;
      elMarcador.textContent = "aciertos " + aciertos;
      respuesta.hidden = true;
      cierre.hidden = true;
      acciones.hidden = false;
    }

    function responder(esSospechoso) {
      const caso = casos[indice];
      const acierto = esSospechoso === caso.sospechoso;
      if (acierto) aciertos++;

      const etiquetaCaso = caso.sospechoso ? "sospechoso" : "normal";
      veredicto.textContent = "";
      const icoVeredicto = icono(acierto ? "acierto" : "fallo");
      if (icoVeredicto) veredicto.appendChild(icoVeredicto);
      veredicto.appendChild(
        document.createTextNode((acierto ? "correcto · " : "no era eso · ") + etiquetaCaso)
      );
      veredicto.className = "mono triage__veredicto " + (acierto ? "triage__veredicto--ok" : "triage__veredicto--fallo");
      explicacion.textContent = caso.explicacion;

      elMarcador.textContent = "aciertos " + aciertos;
      acciones.hidden = true;
      respuesta.hidden = false;
      document.getElementById("triage-siguiente").focus();
    }

    function terminar() {
      const ratio = aciertos / casos.length;
      const cierres = cfg.cierres || {};
      resultado.textContent = aciertos + " de " + casos.length;
      resultado.className = "mono triage__veredicto";
      cierreTexto.textContent =
        ratio >= 0.75 ? cierres.alto : ratio >= 0.5 ? cierres.medio : cierres.bajo;
      acciones.hidden = true;
      respuesta.hidden = true;
      cierre.hidden = false;
      elLog.textContent = "";
      elOrigen.textContent = "";
      elContador.textContent = "ronda terminada";
      elMarcador.textContent = "";
    }

    document.getElementById("triage-normal").addEventListener("click", function () {
      responder(false);
    });
    document.getElementById("triage-sospechoso").addEventListener("click", function () {
      responder(true);
    });
    document.getElementById("triage-siguiente").addEventListener("click", function () {
      indice++;
      if (indice >= casos.length) terminar();
      else mostrarCaso();
    });
    document.getElementById("triage-reiniciar").addEventListener("click", function () {
      indice = 0;
      aciertos = 0;
      mostrarCaso();
      elLog.focus();
    });

    mostrarCaso();
  }

  /* Textos de la sección del globo. El 3D lo monta js/globo.js. */
  /* Textos de la consola de pega. La terminal la mueve js/consola.js. */
  function pintarConsola() {
    const seccion = document.getElementById("consola");
    if (!seccion) return;
    if (!DATOS.consola) {
      seccion.remove();
      const enlace = document.querySelector('.nav a[href="#consola"]');
      if (enlace) enlace.remove();
      return;
    }
    texto("consola-titulo", DATOS.consola.titulo);
    texto("consola-intro", DATOS.consola.intro);
    texto("consola-aviso", DATOS.consola.aviso);
    texto("consola-pie", DATOS.consola.pie);
  }

  function pintarGlobo() {
    const seccion = document.getElementById("mapa");
    if (!seccion) return;
    if (!DATOS.globo) {
      seccion.remove();
      const enlace = document.querySelector('.nav a[href="#mapa"]');
      if (enlace) enlace.remove();
      return;
    }
    texto("globo-titulo", DATOS.globo.titulo);
    texto("globo-intro", DATOS.globo.intro);
    texto("globo-nota", DATOS.globo.nota);
    if (DATOS.globo.destino) texto("globo-destino", "destino: " + DATOS.globo.destino.nombre);
  }

  function pintarFormacion() {
    const cont = document.getElementById("lista-formacion");
    if (!cont) return;
    DATOS.formacion.forEach(function (f) {
      const art = document.createElement("article");
      art.className = "tarjeta-formacion";

      const cabecera = document.createElement("div");
      cabecera.className = "tarjeta-formacion__cabecera";
      const titulo = document.createElement("h3");
      titulo.textContent = f.titulo;
      cabecera.appendChild(titulo);
      if (f.periodo) {
        const periodo = document.createElement("span");
        periodo.className = "mono tarjeta-formacion__periodo";
        periodo.textContent = f.periodo;
        cabecera.appendChild(periodo);
      }
      art.appendChild(cabecera);

      if (f.centro) {
        const centro = document.createElement("p");
        centro.className = "mono tarjeta-formacion__centro";
        centro.textContent = f.centro;
        art.appendChild(centro);
      }

      if (f.detalle) {
        const detalle = document.createElement("p");
        detalle.className = "prosa tarjeta-formacion__detalle";
        detalle.textContent = f.detalle;
        art.appendChild(detalle);
      }

      cont.appendChild(art);
    });
  }

  function pintarIdiomas() {
    const cont = document.getElementById("chips-idiomas");
    if (!cont) return;
    DATOS.idiomas.forEach(function (i) {
      const chip = document.createElement("div");
      chip.className = "chip-idioma";
      const idioma = document.createElement("span");
      idioma.textContent = i.idioma;
      const nivel = document.createElement("span");
      nivel.className = "mono chip-idioma__nivel";
      nivel.textContent = i.nivel;
      chip.appendChild(idioma);
      chip.appendChild(nivel);
      cont.appendChild(chip);
    });
  }

  function pintarContacto() {
    const cont = document.getElementById("enlaces-contacto");
    if (!cont) return;
    const c = DATOS.contacto;

    function fila(etiqueta, valor, href) {
      if (!valor) return;
      const a = document.createElement("a");
      a.className = "fila-contacto";
      a.href = href;
      if (href.indexOf("http") === 0) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      const e = document.createElement("span");
      e.className = "mono fila-contacto__etiqueta";
      const ico = icono(etiqueta);
      if (ico) e.appendChild(ico);
      e.appendChild(document.createTextNode(etiqueta));
      const v = document.createElement("span");
      v.className = "fila-contacto__valor";
      v.textContent = valor;
      a.appendChild(e);
      a.appendChild(v);
      cont.appendChild(a);
    }

    fila("email", c.email, "mailto:" + c.email);
    fila("teléfono", c.telefono, "tel:" + c.telefono);
    fila("github", "ma957nu", c.github);
    fila("linkedin", c.linkedin ? "Manuel Pérez Manivesa" : "", c.linkedin);
    fila("hackthebox", c.hackthebox ? "perfil público" : "", c.hackthebox);
  }

  /*
   * Enrutador. Los enlaces del menú siguen siendo anclas (#mapa) en el HTML,
   * porque es lo que funciona en cualquier sitio, incluido abrir el archivo
   * con doble clic. Cuando la web se sirve por http, además se reescribe la
   * barra de direcciones a /mapa, sin almohadilla, apoyándose en las reglas
   * de netlify.toml que sirven esas rutas como esta misma página.
   */
  function activarRutas() {
    const enSitioWeb = location.protocol === "http:" || location.protocol === "https:";
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function seccionDe(id) {
      if (!id) return null;
      const destino = document.getElementById(id);
      // Solo las secciones tienen ruta propia: el enlace de "saltar al
      // contenido" apunta al <main> y ese no debe cambiar la URL.
      return destino && destino.tagName === "SECTION" ? destino : null;
    }

    function irA(id, cambiarUrl) {
      const destino = seccionDe(id);
      if (!destino) return false;
      // La URL se cambia ANTES de desplazarse. El navegador guarda la posición
      // actual en la entrada que deja atrás: si primero bajásemos y luego
      // cambiáramos la URL, el botón de atrás devolvería la posición nueva.
      if (enSitioWeb && cambiarUrl) {
        history.pushState({ seccion: id }, "", id === "inicio" ? "/" : "/" + id);
      }
      destino.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
      return true;
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (enlace) {
      enlace.addEventListener("click", function (e) {
        const id = enlace.getAttribute("href").slice(1);
        if (irA(id, true)) e.preventDefault();
      });
    });

    // "/consola/" -> "consola". Sin expresión regular, que con las barras se
    // lee peor de lo que ayuda.
    function rutaActual() {
      const trozos = location.pathname.split("/").filter(Boolean);
      return trozos.length ? trozos[trozos.length - 1] : "";
    }

    window.addEventListener("popstate", function () {
      irA(rutaActual() || "inicio", false);
    });

    // Al entrar directamente en /consola hay que bajar hasta ahí.
    const inicial = rutaActual();
    if (inicial && seccionDe(inicial)) {
      window.requestAnimationFrame(function () {
        seccionDe(inicial).scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
  }

  function pintarPie() {
    texto("pie-anio", String(new Date().getFullYear()));
  }

  function activarRevelado() {
    const objetivos = document.querySelectorAll(
      ".seccion, .tarjeta-experiencia, .tarjeta-proyecto, .tarjeta-formacion, .grupo-stack"
    );
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      objetivos.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    objetivos.forEach(function (el) { observador.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    pintarCabecera();
    pintarExperiencia();
    pintarStack();
    pintarProyectos();
    pintarTriage();
    pintarConsola();
    pintarGlobo();
    pintarFormacion();
    pintarIdiomas();
    pintarContacto();
    pintarPie();
    activarRevelado();
    activarRutas();
  });
})();
