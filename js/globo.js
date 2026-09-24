/*
 * Globo 3D de la sección ~/mapa.
 *
 * three.js solo se descarga cuando la sección se acerca a la pantalla: son
 * 690 KB y no tiene sentido que los pague quien entra a leer la experiencia
 * y se va. Si la carga falla (por ejemplo al abrir el index desde el disco,
 * donde el navegador bloquea los módulos) se enseña un aviso y el resto de
 * la web sigue funcionando igual.
 */

(function () {
  "use strict";

  const contenedor = document.getElementById("globo-lienzo");
  const seccion = document.getElementById("mapa");
  if (!contenedor || !seccion) return;
  if (typeof DATOS === "undefined" || !DATOS.globo) return;

  const cfg = DATOS.globo;
  const ACENTO = 0x64dbb8;
  const FONDO = 0x0b0d0e;

  // Ruta del módulo, resuelta a partir de la de este propio script: así
  // funciona igual esté la web en la raíz del dominio o en un subdirectorio.
  const miUrl = (document.currentScript && document.currentScript.src) || "";
  const urlThree = miUrl
    ? new URL("vendor/three.module.js", miUrl).href
    : "js/vendor/three.module.js";

  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Un icono por tipo de intento. Las claves son los mismos textos que hay en
  // DATOS.globo.origenes; si añades un tipo nuevo sin icono, la fila se pinta
  // igual, solo que sin él.
  const ICONOS_TIPO = {
    "escaneo de puertos": 0xf002,
    "fuerza bruta SSH": 0xf120,
    "fuerza bruta RDP": 0xf108,
    "sondeo HTTP": 0xf0ac,
    "sondeo de API": 0xf121,
    "credenciales por defecto": 0xf084,
  };

  function icono(punto) {
    if (!punto) return null;
    const span = document.createElement("span");
    span.className = "icono";
    span.setAttribute("aria-hidden", "true");
    span.textContent = String.fromCodePoint(punto);
    return span;
  }

  function avisar(mensaje) {
    const aviso = document.getElementById("globo-aviso");
    if (!aviso) return;
    aviso.textContent = mensaje;
    aviso.hidden = false;
  }

  function hayWebGL() {
    try {
      const prueba = document.createElement("canvas");
      return !!(prueba.getContext("webgl2") || prueba.getContext("webgl"));
    } catch (e) {
      return false;
    }
  }

  // Pasa latitud y longitud a un punto de la esfera de radio r.
  function aVector(THREE, lat, lon, r) {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  function anotarEvento(origen) {
    const lista = document.getElementById("globo-eventos");
    if (!lista) return;
    const li = document.createElement("li");
    li.className = "globo__evento";

    const donde = document.createElement("span");
    donde.className = "mono globo__evento-origen";
    donde.textContent = origen.ciudad + " · " + origen.pais;

    const que = document.createElement("span");
    que.className = "globo__evento-tipo";
    const ico = icono(ICONOS_TIPO[origen.tipo]);
    if (ico) que.appendChild(ico);
    que.appendChild(document.createTextNode(origen.tipo));

    li.appendChild(donde);
    li.appendChild(que);
    lista.insertBefore(li, lista.firstChild);

    while (lista.children.length > 5) lista.removeChild(lista.lastChild);
  }

  function montar(THREE) {
    const escena = new THREE.Scene();
    const camara = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camara.position.set(0, 0, 3.05);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    contenedor.appendChild(renderer.domElement);

    const globo = new THREE.Group();
    // Inclinación fija: mirar un globo perfectamente recto queda plano.
    globo.rotation.x = 0.32;
    globo.rotation.y = -1.1;
    escena.add(globo);

    // Esfera opaca del color del fondo. No se ve, pero tapa los puntos de la
    // cara de atrás; sin ella el globo parece una nube de puntos y se pierde
    // la sensación de volumen.
    const relleno = new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 48, 48),
      new THREE.MeshBasicMaterial({ color: FONDO })
    );
    globo.add(relleno);

    // Meridianos y paralelos dibujados a mano. Una esfera en modo alambre
    // sería más corta de escribir, pero enseña las diagonales de cada triángulo
    // y el globo acaba pareciendo una pelota de golf.
    const materialMalla = new THREE.LineBasicMaterial({
      color: ACENTO,
      transparent: true,
      opacity: 0.1,
    });

    for (let m = 0; m < 12; m++) {
      const puntos = [];
      for (let lat = -88; lat <= 88; lat += 4) {
        puntos.push(aVector(THREE, lat, m * 30 - 180, 1.002));
      }
      globo.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(puntos), materialMalla));
    }

    [-60, -30, 0, 30, 60].forEach(function (lat) {
      const puntos = [];
      for (let lon = -180; lon <= 180; lon += 4) {
        puntos.push(aVector(THREE, lat, lon, 1.002));
      }
      globo.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(puntos), materialMalla));
    });

    // Los continentes, punto a punto.
    if (typeof PUNTOS_TIERRA !== "undefined") {
      const coords = new Float32Array(PUNTOS_TIERRA.length * 3);
      for (let i = 0; i < PUNTOS_TIERRA.length; i++) {
        const v = aVector(THREE, PUNTOS_TIERRA[i][0], PUNTOS_TIERRA[i][1], 1);
        coords[i * 3] = v.x;
        coords[i * 3 + 1] = v.y;
        coords[i * 3 + 2] = v.z;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(coords, 3));
      globo.add(
        new THREE.Points(
          geo,
          new THREE.PointsMaterial({
            color: ACENTO,
            size: 0.016,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8,
          })
        )
      );
    }

    // Marcador del destino.
    const destino = aVector(THREE, cfg.destino.lat, cfg.destino.lon, 1.005);
    const faro = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    faro.position.copy(destino);
    globo.add(faro);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(0.03, 0.038, 32),
      new THREE.MeshBasicMaterial({
        color: ACENTO,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      })
    );
    halo.position.copy(destino);
    halo.lookAt(new THREE.Vector3(0, 0, 0));
    globo.add(halo);

    const arcos = [];

    function lanzarArco(origen) {
      const desde = aVector(THREE, origen.lat, origen.lon, 1);
      const hasta = destino.clone();
      const separacion = desde.distanceTo(hasta);
      // Cuanto más lejos está el origen, más alto vuela el arco.
      const medio = desde
        .clone()
        .add(hasta)
        .normalize()
        .multiplyScalar(1 + separacion * 0.38);

      const curva = new THREE.QuadraticBezierCurve3(desde, medio, hasta);
      const puntos = curva.getPoints(72);
      const geo = new THREE.BufferGeometry().setFromPoints(puntos);
      const material = new THREE.LineBasicMaterial({
        color: ACENTO,
        transparent: true,
        opacity: 0.85,
      });
      const linea = new THREE.Line(geo, material);
      geo.setDrawRange(0, 1);
      globo.add(linea);

      const origenPunto = new THREE.Mesh(
        new THREE.SphereGeometry(0.014, 12, 12),
        new THREE.MeshBasicMaterial({ color: ACENTO, transparent: true, opacity: 0.9 })
      );
      origenPunto.position.copy(desde);
      globo.add(origenPunto);

      arcos.push({ linea, origenPunto, total: puntos.length, avance: 0, vida: 0 });
      anotarEvento(origen);
    }

    let siguiente = 0;
    let indiceOrigen = Math.floor(Math.random() * cfg.origenes.length);

    function actualizarArcos(delta) {
      for (let i = arcos.length - 1; i >= 0; i--) {
        const a = arcos[i];
        if (a.avance < a.total) {
          a.avance += delta * 95;
          a.linea.geometry.setDrawRange(0, Math.min(a.total, Math.floor(a.avance)));
        } else {
          a.vida += delta;
          // Una vez dibujado, el arco se apaga en poco más de un segundo.
          const opacidad = Math.max(0, 0.85 - a.vida * 0.7);
          a.linea.material.opacity = opacidad;
          a.origenPunto.material.opacity = opacidad;
          if (opacidad <= 0) {
            globo.remove(a.linea);
            globo.remove(a.origenPunto);
            a.linea.geometry.dispose();
            a.linea.material.dispose();
            a.origenPunto.geometry.dispose();
            a.origenPunto.material.dispose();
            arcos.splice(i, 1);
          }
        }
      }
    }

    // Arrastrar para girar.
    let arrastrando = false;
    let ultimoX = 0;
    let ultimoY = 0;
    let inercia = 0.0016;

    renderer.domElement.addEventListener("pointerdown", function (e) {
      arrastrando = true;
      ultimoX = e.clientX;
      ultimoY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
    });

    renderer.domElement.addEventListener("pointermove", function (e) {
      if (!arrastrando) return;
      const dx = e.clientX - ultimoX;
      const dy = e.clientY - ultimoY;
      ultimoX = e.clientX;
      ultimoY = e.clientY;
      globo.rotation.y += dx * 0.005;
      // El giro vertical se limita para que el globo no acabe del revés.
      globo.rotation.x = Math.max(-0.9, Math.min(0.9, globo.rotation.x + dy * 0.004));
      inercia = dx * 0.0004;
    });

    function soltar(e) {
      if (!arrastrando) return;
      arrastrando = false;
      if (e && e.pointerId !== undefined) {
        try { renderer.domElement.releasePointerCapture(e.pointerId); } catch (err) {}
      }
    }
    renderer.domElement.addEventListener("pointerup", soltar);
    renderer.domElement.addEventListener("pointercancel", soltar);

    function dimensionar() {
      const ancho = contenedor.clientWidth;
      const alto = contenedor.clientHeight;
      if (!ancho || !alto) return;
      renderer.setSize(ancho, alto, false);
      camara.aspect = ancho / alto;
      camara.updateProjectionMatrix();
    }

    let animacion = null;
    let anterior = 0;

    function bucle(ahora) {
      const delta = anterior ? Math.min((ahora - anterior) / 1000, 0.1) : 0.016;
      anterior = ahora;

      if (!arrastrando) {
        globo.rotation.y += 0.0016;
        // La inercia del último arrastre se apaga poco a poco.
        if (Math.abs(inercia) > 0.0017) {
          globo.rotation.y += inercia;
          inercia *= 0.95;
        }
      }

      siguiente -= delta;
      if (siguiente <= 0) {
        indiceOrigen = (indiceOrigen + 1 + Math.floor(Math.random() * 3)) % cfg.origenes.length;
        lanzarArco(cfg.origenes[indiceOrigen]);
        siguiente = 1.1 + Math.random() * 1.2;
      }

      actualizarArcos(delta);

      // El halo del destino late al ritmo de los arcos que van llegando.
      const latido = 1 + Math.sin(ahora / 420) * 0.12;
      halo.scale.set(latido, latido, 1);

      renderer.render(escena, camara);
      animacion = window.requestAnimationFrame(bucle);
    }

    function arrancar() {
      if (animacion !== null) return;
      anterior = 0;
      animacion = window.requestAnimationFrame(bucle);
    }

    function parar() {
      if (animacion === null) return;
      window.cancelAnimationFrame(animacion);
      animacion = null;
    }

    dimensionar();
    window.addEventListener("resize", dimensionar);

    if (menosMovimiento.matches) {
      // Sin animación: unos cuantos arcos fijos y el globo quieto, que se
      // puede girar con el ratón si se quiere.
      for (let i = 0; i < 4; i++) {
        lanzarArco(cfg.origenes[(i * 3) % cfg.origenes.length]);
      }
      arcos.forEach(function (a) {
        a.linea.geometry.setDrawRange(0, a.total);
        a.avance = a.total;
      });
      renderer.render(escena, camara);
      renderer.domElement.addEventListener("pointermove", function () {
        renderer.render(escena, camara);
      });
      return;
    }

    // Solo se anima mientras la sección está a la vista.
    const vigilante = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting && !document.hidden) arrancar();
          else parar();
        });
      },
      { threshold: 0.05 }
    );
    vigilante.observe(seccion);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) parar();
      else if (seccion.getBoundingClientRect().top < window.innerHeight) arrancar();
    });
  }

  let cargando = false;

  function cargar() {
    if (cargando) return;
    cargando = true;

    if (!hayWebGL()) {
      avisar("Este navegador no tiene WebGL disponible, así que el globo no se puede dibujar.");
      return;
    }

    import(urlThree)
      .then(function (THREE) {
        montar(THREE);
      })
      .catch(function () {
        avisar(
          "El globo necesita que la web se sirva desde un servidor. Abierta directamente desde el disco, el navegador bloquea la carga de three.js."
        );
      });
  }

  // Se empieza a cargar un poco antes de que la sección entre en pantalla.
  if ("IntersectionObserver" in window) {
    const aviso = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          aviso.disconnect();
          cargar();
        });
      },
      { rootMargin: "300px" }
    );
    aviso.observe(seccion);
  } else {
    cargar();
  }
})();
