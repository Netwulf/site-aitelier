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
      type: "icon",
      icon: "Feather",
    },
    api: {
      endpoint: "https://unified-clones-api-production.up.railway.app/neil_gaiman/chat",
    },
    suggestedPrompts: [
      "How do I overcome writer's block?",
      "What makes a story truly memorable?",
      "Tell me about the power of imagination",
    ],
    placeholder: "Ask about writing, stories, imagination...",
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
      type: "icon",
      icon: "Globe",
    },
    api: {
      endpoint: "https://unified-clones-api-production.up.railway.app/ursula_k_le_guin/chat",
    },
    suggestedPrompts: [
      "What is the Carrier Bag Theory of Fiction?",
      "How do I build a believable world?",
      "Tell me about the power of imagination in dark times",
    ],
    placeholder: "Ask about worldbuilding, stories, resistance...",
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
