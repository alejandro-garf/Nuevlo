export const translations = {
  en: {
    nav: {
      howItWorks: "How It Works",
      forOrgs: "For Organizations",
      joinWaitlist: "Join Waitlist",
    },
    hero: {
      tagline: "Know Your Rights",
      subtext:
        "Free AI-powered immigration guidance. Real attorneys when you need them.",
      cta: "Join the Movement",
      emailPlaceholder: "Enter your email",
    },
    howItWorks: {
      title: "How Nuevlo Works",
      step1Title: "Describe Your Situation",
      step1Desc:
        "Tell us what you're facing in your own words — in English or Spanish. No legal jargon needed.",
      step2Title: "Get Clear Guidance",
      step2Desc:
        "Our AI explains your rights and options in plain, warm language you can actually understand.",
      step3Title: "Connect with an Attorney",
      step3Desc:
        "When you're ready, we connect you with a vetted immigration attorney who speaks your language.",
    },
    intake: {
      title: "Tell Us Your Story",
      subtitle: "Free, confidential, no account needed",
      placeholder:
        "Describe your immigration situation here... For example: I came to the US 10 years ago and I'm worried about my status. What are my options?",
      button: "Get Guidance",
      loading: "Thinking...",
      disclaimer:
        "This is not legal advice. For legal advice, consult a licensed attorney.",
    },
    waitlist: {
      title: "Join the Movement",
      individual: {
        title: "I Need Legal Help",
        name: "Full Name",
        email: "Email Address",
        zip: "Zip Code",
        topic: "Immigration Topic",
        topicOptions: [
          "Select a topic...",
          "DACA / Dreamers",
          "Asylum",
          "Green Card / Residency",
          "Work Permits",
          "Family Petitions",
          "Deportation Defense",
          "Citizenship",
          "Other",
        ],
        submit: "Join Waitlist",
        success: "You're on the list! We'll be in touch soon.",
      },
      org: {
        title: "I Represent an Organization",
        name: "Your Name",
        organization: "Organization Name",
        email: "Email Address",
        role: "Your Role",
        submit: "Partner With Us",
        success: "Thank you! Our team will reach out shortly.",
      },
    },
    partners: {
      title: "Founding Community Partners",
      subtitle: "Trusted by organizations serving immigrant communities",
    },
    footer: {
      tagline: "Free. Bilingual. Built for your community.",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      builtWith: "Built with",
      inSF: "in San Francisco",
    },
  },
  es: {
    nav: {
      howItWorks: "Cómo Funciona",
      forOrgs: "Para Organizaciones",
      joinWaitlist: "Únete a la Lista",
    },
    hero: {
      tagline: "Conoce Tus Derechos",
      subtext:
        "Orientación migratoria gratuita con IA. Abogados reales cuando los necesites.",
      cta: "Únete al Movimiento",
      emailPlaceholder: "Ingresa tu email",
    },
    howItWorks: {
      title: "Cómo Funciona Nuevlo",
      step1Title: "Describe Tu Situación",
      step1Desc:
        "Cuéntanos lo que enfrentas en tus propias palabras — en inglés o español. No necesitas lenguaje legal.",
      step2Title: "Recibe Orientación Clara",
      step2Desc:
        "Nuestra IA te explica tus derechos y opciones en un lenguaje claro y cálido que puedes entender.",
      step3Title: "Conéctate con un Abogado",
      step3Desc:
        "Cuando estés listo, te conectamos con un abogado de inmigración verificado que habla tu idioma.",
    },
    intake: {
      title: "Cuéntanos Tu Historia",
      subtitle: "Gratis, confidencial, sin necesidad de cuenta",
      placeholder:
        "Describe tu situación migratoria aquí... Por ejemplo: Llegué a EE.UU. hace 10 años y me preocupa mi estatus. ¿Cuáles son mis opciones?",
      button: "Obtener Orientación",
      loading: "Pensando...",
      disclaimer:
        "Esto no es asesoría legal. Para asesoría legal, consulta a un abogado licenciado.",
    },
    waitlist: {
      title: "Únete al Movimiento",
      individual: {
        title: "Necesito Ayuda Legal",
        name: "Nombre Completo",
        email: "Correo Electrónico",
        zip: "Código Postal",
        topic: "Tema Migratorio",
        topicOptions: [
          "Selecciona un tema...",
          "DACA / Soñadores",
          "Asilo",
          "Tarjeta Verde / Residencia",
          "Permisos de Trabajo",
          "Peticiones Familiares",
          "Defensa contra Deportación",
          "Ciudadanía",
          "Otro",
        ],
        submit: "Unirme a la Lista",
        success: "¡Estás en la lista! Te contactaremos pronto.",
      },
      org: {
        title: "Represento una Organización",
        name: "Tu Nombre",
        organization: "Nombre de la Organización",
        email: "Correo Electrónico",
        role: "Tu Rol",
        submit: "Asociarse con Nosotros",
        success: "¡Gracias! Nuestro equipo te contactará pronto.",
      },
    },
    partners: {
      title: "Socios Comunitarios Fundadores",
      subtitle:
        "Confiado por organizaciones que sirven a comunidades inmigrantes",
    },
    footer: {
      tagline: "Gratis. Bilingüe. Hecho para tu comunidad.",
      privacy: "Privacidad",
      terms: "Términos",
      contact: "Contacto",
      builtWith: "Hecho con",
      inSF: "en San Francisco",
    },
  },
} as const;

export type Lang = "en" | "es";
