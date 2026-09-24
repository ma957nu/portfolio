/*
 * Todo el contenido de la web vive aquí. Para cambiar un texto, una fecha
 * o un enlace, edita este archivo y guarda: no hace falta tocar el HTML.
 * Los campos vacíos ("") no se pintan en la web, así que puedes dejarlos
 * así hasta que tengas el dato.
 */

const DATOS = {

  meta: {
    titulo: "Manuel Pérez · Administración de sistemas y ciberseguridad",
    descripcion:
      "Portfolio de Manuel Pérez, administrador de sistemas y redes orientado a ciberseguridad (SOC N1).",
  },

  perfil: {
    nombre: "Manuel Pérez",
    rol: "Administrador de Sistemas y Redes",
    objetivo: "orientado a Ciberseguridad · Analista SOC N1",
    ubicacion: "A Coruña, España",
    eyebrow: "sistemas · redes · ciberseguridad",
    // Frase corta de portada. Va debajo del nombre, conviene que quepa en
    // dos o tres líneas.
    titular:
      "Administro sistemas y accesos en un entorno bancario real. Ahora estoy llevando esa experiencia hacia la defensa: detección de amenazas, hardening y automatización.",
    // Texto largo de la sección "Quién soy".
    resumen:
      "Llevo cerca de un año administrando sistemas en un entorno bancario real, con herramientas de identidad y acceso que no perdonan un fallo. Resuelvo incidencias por mi cuenta y aprendo rápido lo que hace falta para la siguiente. Ahora mismo estoy cursando un máster en Ciberseguridad e Inteligencia Artificial para enfocar ese conocimiento hacia detección de amenazas, hardening y automatización de despliegues seguros.",
  },

  contacto: {
    email: "perezmanivesamanuel@gmail.com",
    // Si rellenas el teléfono aparecerá un enlace de llamada en la web pública.
    telefono: "",
    // Si rellenas la dirección aparecerá en la web pública. Se deja vacía por privacidad.
    direccion: "",
    github: "https://github.com/ma957nu",
    linkedin: "https://www.linkedin.com/in/manuel-p%C3%A9rez-manivesa-11b9943b9/",
    // Perfil de HackTheBox. El enlace va sin los parámetros de la barra del
    // navegador, que solo guardan las pestañas que tenías abiertas.
    hackthebox: "https://app.hackthebox.com/users/3368481",
  },

  cv: {
    // Vacío a propósito: el PDF del CV lleva teléfono y dirección postal, y la
    // web es pública. Si algún día quieres ofrecerlo, deja aquí la ruta de una
    // versión recortada (por ejemplo "cv/Manuel_Perez_CV_publico.pdf") y el
    // botón de descarga vuelve a aparecer solo.
    archivo: "",
    etiqueta: "descargar CV",
  },

  experiencia: [
    {
      empresa: "Abanca",
      puesto: "Administrador de sistemas",
      periodo: "~ 1 año",
      contexto: "ecosistema bancario",
      descripcion:
        "Gestión e integración de herramientas de identidad y seguridad dentro de un entorno bancario en producción. Participé en proyectos de IAM y de ciclo de vida de identidades, donde un cambio mal hecho no se soluciona con un redeploy.",
      etiquetas: ["IdentityQ", "ISIM", "CyberArk", "Entrust", "IAM"],
    },
  ],

  formacion: [
    {
      titulo: "Máster en Ciberseguridad e Inteligencia Artificial",
      centro: "en curso",
      periodo: "actualidad",
      detalle:
        "Seguridad ofensiva y defensiva, machine learning aplicado a ciberseguridad, análisis de amenazas y automatización con IA.",
    },
    {
      titulo: "CS Administración de Sistemas Informáticos en Red (ASIR)",
      centro: "CPIFP Rodolfo Ucha Piñeiro, Ferrol",
      periodo: "",
      detalle: "Redes, Linux y Windows, virtualización, servicios en red.",
    },
    {
      titulo: "ESO y Bachillerato, ABAU",
      centro: "IES Francisco Aguiar",
      periodo: "",
      detalle: "",
    },
  ],

  stack: [
    {
      categoria: "sistemas",
      items: ["GNU/Linux (Arch, Kali)", "Windows Server", "Docker", "VirtualBox"],
    },
    {
      categoria: "identidad y acceso",
      items: ["CyberArk", "Entrust", "IdentityQ", "ISIM"],
    },
    {
      categoria: "desarrollo",
      items: ["PHP", "HTML", "CSS", "MySQL", "Bash"],
    },
    {
      categoria: "en aprendizaje",
      items: ["Ansible", "Terraform"],
    },
  ],

  objetivos: [
    "Seguridad ofensiva y defensiva: CTFs y pentesting.",
    "IA aplicada a ciberseguridad.",
    "Automatización de infraestructura segura.",
  ],

  idiomas: [
    { idioma: "Castellano", nivel: "nativo" },
    { idioma: "Gallego", nivel: "nativo" },
    { idioma: "Inglés", nivel: "nivel alto" },
    { idioma: "Portugués", nivel: "comprensión oral" },
  ],

  proyectos: [
    {
      destacado: true,
      // Si quitas "estado", la ficha vuelve a mostrar solo "proyecto propio".
      estado: "en desarrollo",
      nombre: "JondaSiviz",
      resumen: "Planificador de preparación de coches del grupo Volkswagen.",
      problema:
        "Elegir piezas de preparación compatibles entre sí y legales es un trabajo manual propenso a errores: una pieza puede encajar en el motor y no en el chasis, o dejar el coche fuera de norma.",
      stack: ["React", "TypeScript", "Tauri"],
      resultado:
        "Catálogo de 207 modelos y 271 piezas con un motor de compatibilidad que cruza plataforma de motor, chasis y reglas de legalidad de la UE antes de sugerir nada. Funciona como app web y de escritorio, y sigue creciendo.",
      nota: "Todavía no está terminado. Las buenas cosas se hacen lentamente.",
      enlace: "https://github.com/JondaSivizVolkswagen/jondasiviz",
      enlaceEtiqueta: "ver repositorio",
    },
    {
      destacado: false,
      nombre: "Kali AwesomeWM Rice",
      resumen: "Mi entorno de trabajo para pentesting, montado sobre Kali.",
      problema:
        "Saltar entre máquinas y laboratorios cuesta tiempo si cada vez hay que recolocar el escritorio y comprobar a mano en qué interfaz estás.",
      stack: ["AwesomeWM", "Lua", "picom", "Bash"],
      resultado:
        "Configuración completa de AwesomeWM con un widget de IP que cambia de color según el estado de la interfaz, y un install.sh que deja el entorno montado en un paso.",
      enlace: "https://github.com/ma957nu/mi-kali-rice",
      enlaceEtiqueta: "ver repositorio",
    },
    {
      destacado: false,
      nombre: "DebianAwesomeWM",
      resumen: "El mismo entorno, adaptado a Debian 12.",
      problema:
        "Reinstalar y dejar un equipo Debian como lo tenía configurado significaba repetir horas de ajustes uno a uno.",
      stack: ["AwesomeWM", "Kitty", "Zsh", "Rofi", "Neovim"],
      resultado:
        "Dotfiles versionados del escritorio entero: gestor de ventanas, terminal, launcher, editor y compositor, listos para clonar y volver a tener el equipo igual.",
      enlace: "https://github.com/ma957nu/DebianAwesomeWM",
      enlaceEtiqueta: "ver repositorio",
    },
  ],

};
