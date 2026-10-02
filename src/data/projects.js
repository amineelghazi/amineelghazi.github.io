export const PROJECTS = [
  {
    id: "u-owl",
    title: { fr: "U-Owl - Location de camions en temps réel", en: "U-Owl - Real-Time Truck Rental" },
    description: {
      fr: "Projet collégial de location de camions avec visualisation en temps réel de la disponibilité du stock sur une carte interactive. Développement du frontend (localisation live, UX), de la communication frontend-backend et de l'authentification, contribution ponctuelle au backend, et conteneurisation avec Docker.",
      en: "A college truck-rental project featuring real-time visualization of stock availability on an interactive map. Built the frontend (live location tracking, UX), the frontend-backend communication and authentication, contributed to the backend, and containerized the app with Docker.",
    },
    tags: ["React", "TypeScript", "Vite", "NestJS", "Docker"],
    image: "/u-owl.png",
    codeUrls: [
      { label: "Frontend", url: "https://github.com/Khaled-AbHe/U-Owl-Frontend" },
      { label: "Backend", url: "https://github.com/Khaled-AbHe/U-Owl-Backend" },
    ],
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
  },
  {
    id: "cinetrack",
    title: {
      fr: "CineTrack - Découverte & suivi de films/séries",
      en: "CineTrack - Movie & TV Show Discovery & Tracking",
    },
    description: {
      fr: "Plateforme collégiale de découverte et de suivi de films et séries (fiches, favoris, commentaires) intégrant une API externe pour les métadonnées. Product Owner pour une équipe de 6 développeurs (gestion Jira, epics, spécification des exigences) ; développement de la vérification de compte par courriel et de la fonctionnalité de favoris de bout en bout.",
      en: "A college platform for discovering and tracking movies and TV shows (detail pages, favorites, comments) integrating an external API for metadata. Product Owner for a team of 6 developers (Jira management, epics, requirements specification); built email account verification and the end-to-end favorites feature.",
    },
    tags: ["C#", "WPF", "SQL", "Jira", "Product Management"],
    image: "/cinetrack.png",
    codeUrls: [],
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
  },
];
