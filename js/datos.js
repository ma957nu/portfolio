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
    // Pon aquí tu URL de LinkedIn cuando la tengas. Si se queda vacía, el enlace no se muestra.
    linkedin: "",
  },

  cv: {
    archivo: "cv/Manuel_Perez_CV.pdf",
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
      nombre: "JondaSiviz",
      resumen: "Planificador de preparación de coches del grupo Volkswagen.",
      problema:
        "Elegir piezas de preparación compatibles entre sí y legales es un trabajo manual propenso a errores: una pieza puede encajar en el motor y no en el chasis, o dejar el coche fuera de norma.",
      stack: ["React", "TypeScript", "Tauri"],
      resultado:
        "Catálogo de 207 modelos y 271 piezas con un motor de compatibilidad que cruza plataforma de motor, chasis y reglas de legalidad de la UE antes de sugerir nada. Disponible como app web y de escritorio.",
      enlace: "https://github.com/JondaSivizVolkswagen/jondasiviz",
      enlaceEtiqueta: "ver repositorio",
    },
    // Plantilla de ejemplo. Borra o sustituye por tu propio homelab cuando lo documentes.
    {
      destacado: false,
      nombre: "Homelab",
      resumen: "Ejemplo de ficha para tu laboratorio doméstico.",
      problema: "Describe aquí qué querías montar y por qué.",
      stack: ["Proxmox", "pfSense", "..."],
      resultado: "Qué conseguiste, qué aprendiste, qué queda pendiente.",
      enlace: "",
      enlaceEtiqueta: "ver detalle",
    },
    // Plantilla de ejemplo. Borra o sustituye cuando publiques tu primer write-up de CTF.
    {
      destacado: false,
      nombre: "Write-up de CTF",
      resumen: "Ejemplo de ficha para un reto resuelto en TryHackMe o HackTheBox.",
      problema: "Qué máquina o reto era y qué vulnerabilidad explotaba.",
      stack: ["nmap", "Burp Suite", "..."],
      resultado: "Cómo llegaste al objetivo, paso a paso.",
      enlace: "",
      enlaceEtiqueta: "ver write-up",
    },
  ],

};
