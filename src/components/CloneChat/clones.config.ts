// Clone Configurations
// Each clone has its own API running on Railway with all prompts pre-configured
// Just add the endpoint + visual info here

import { CloneConfig } from "./types";

export const CLONES: Record<string, CloneConfig> = {
  // ============================================
  // NEIL GAIMAN - Master Storyteller
  // ============================================
  "neil-gaiman": {
    id: "neil-gaiman",
    name: "Neil Gaiman",
    title: "Neil Gaiman",
    subtitle: "Master Storyteller",
    category: "UPLOADED INTELLIGENCE",
    description: "Converse com um clone cognitivo do mestre das historias. Sabedoria sobre escrita e imaginacao.",
    avatar: {
      type: "image",
      imageUrl: "/clones/neil-gaiman-aitelier.png",
    },
    api: {
      endpoint: "https://unified-clones-api-production.up.railway.app/neil_gaiman/chat",
    },
    suggestedPrompts: [
      "Como supero o bloqueio criativo?",
      "O que torna uma história memorável?",
      "Me conta sobre o poder da imaginação",
    ],
    placeholder: "Pergunte sobre escrita, histórias, imaginação...",
    status: "active",
  },

  // ============================================
  // URSULA K. LE GUIN - Master of Worlds
  // ============================================
  "ursula-le-guin": {
    id: "ursula-le-guin",
    name: "Ursula K. Le Guin",
    title: "Ursula K. Le Guin",
    subtitle: "Master of Worlds",
    category: "UPLOADED INTELLIGENCE",
    description: "Converse com a mestre da ficcao cientifica e fantasia. Sabedoria sobre mundos, narrativa e resistencia.",
    avatar: {
      type: "image",
      imageUrl: "/clones/ursula-le-guin-aitelier.png",
    },
    api: {
      endpoint: "https://unified-clones-api-production.up.railway.app/ursula_k_le_guin/chat",
    },
    suggestedPrompts: [
      "O que é a Teoria do Saco de Carregar da Ficção?",
      "Como construo um mundo crível?",
      "Me conta sobre o poder da imaginação em tempos difíceis",
    ],
    placeholder: "Pergunte sobre mundos, histórias, resistência...",
    status: "active",
  },

  // ============================================
  // DAN KOE - Digital Philosopher
  // ============================================
  "dan-koe": {
    id: "dan-koe",
    name: "Dan Koe",
    title: "Dan Koe",
    subtitle: "Digital Philosopher",
    category: "UPLOADED INTELLIGENCE",
    description: "Filosofo digital e arquiteto de one-person business. Criador do Modern Mastery.",
    avatar: {
      type: "icon",
      icon: "Brain",
    },
    api: {
      endpoint: "https://unified-clones-api-production.up.railway.app/dan_koe/chat",
    },
    suggestedPrompts: [
      "How do I build a one-person business?",
      "What is the Queue System?",
      "How do I work less and produce more?",
    ],
    placeholder: "Ask about leverage, frameworks, sovereignty...",
    status: "coming_soon",
  },

  // ============================================
  // STEVE JOBS - Visionary Designer
  // ============================================
  "steve-jobs": {
    id: "steve-jobs",
    name: "Steve Jobs",
    title: "Steve Jobs",
    subtitle: "Visionary Designer",
    category: "UPLOADED INTELLIGENCE",
    description: "Visionario co-fundador da Apple. Mestre em design, simplicidade e reality distortion.",
    avatar: {
      type: "icon",
      icon: "Sparkles",
    },
    api: {
      endpoint: "https://unified-clones-api-production.up.railway.app/steve_jobs/chat",
    },
    suggestedPrompts: [
      "How do I know if a product is perfect?",
      "What makes design truly great?",
      "How do I create something revolutionary?",
    ],
    placeholder: "Ask about design, simplicity, innovation...",
    status: "coming_soon",
  },

  // ============================================
  // TAYNA PURI - Futuro Ancestral
  // ============================================
  "tayna-puri": {
    id: "tayna-puri",
    name: "Tayna Puri",
    title: "Tayna Puri",
    subtitle: "Futuro Ancestral",
    category: "UPLOADED INTELLIGENCE",
    description: "Pensador brasileiro que une sabedoria ancestral com IA. Criador da filosofia Futuro Ancestral.",
    avatar: {
      type: "image",
      imageUrl: "/tayna-portraits/tayna-studio-contemplative.png",
    },
    api: {
      endpoint: "https://unified-clones-api-production.up.railway.app/tayna_puri/chat",
    },
    suggestedPrompts: [
      "O que e o Futuro Ancestral?",
      "Como criar um negocio de uma pessoa so?",
      "Como unir tecnologia e espiritualidade?",
    ],
    placeholder: "Pergunte sobre IA, negocios, espiritualidade...",
    status: "active",
  },

  // ============================================
  // DAVID LYNCH - Master of Consciousness
  // ============================================
  "david-lynch": {
    id: "david-lynch",
    name: "David Lynch",
    title: "David Lynch",
    subtitle: "Master of Consciousness",
    category: "UPLOADED INTELLIGENCE",
    description: "Cineasta visionario e pintor. Criador de Twin Peaks, Mulholland Drive. Mestre da consciencia e do misterio.",
    avatar: {
      type: "image",
      imageUrl: "/clones/david-lynch-aitelier.png",
    },
    api: {
      endpoint: "https://unified-clones-api-production.up.railway.app/david_lynch/chat",
    },
    suggestedPrompts: [
      "Como pesco os grandes peixes de ideias?",
      "Qual o papel da intuição na criação?",
      "Me conta sobre consciência e meditação",
    ],
    placeholder: "Pergunte sobre criatividade, consciência, sonhos...",
    status: "active",
  },

  // ============================================
  // TEMPLATE - Copy this for new clones
  // ============================================
  // "clone-slug": {
  //   id: "clone-slug",                              // URL slug: /chat/clone-slug
  //   name: "Clone Name",                            // Display name
  //   title: "Clone Name",                           // Chat header title
  //   subtitle: "Short tagline",                     // Under the name
  //   category: "CATEGORY",                          // Badge text
  //   description: "Description for tool cards.",    // PlaygroundTools card
  //   avatar: {
  //     type: "image",                               // "icon" or "image"
  //     imageUrl: "https://...",                     // if type: "image"
  //     // icon: "Brain",                            // if type: "icon" (Lucide name)
  //   },
  //   api: {
  //     endpoint: "https://clone-api-production.up.railway.app/chat",
  //   },
  //   suggestedPrompts: [
  //     "First suggested question",
  //     "Second suggested question",
  //     "Third suggested question",
  //   ],
  //   placeholder: "Ask about...",
  //   status: "active",                              // "active" | "coming_soon"
  // },
};

export function getCloneById(id: string): CloneConfig | undefined {
  return CLONES[id];
}

export function getAllClones(): CloneConfig[] {
  return Object.values(CLONES);
}

export function getActiveClones(): CloneConfig[] {
  return Object.values(CLONES).filter((clone) => clone.status === "active");
}
