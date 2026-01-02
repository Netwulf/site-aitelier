// Unified Gallery Data - Single source of truth for all visual assets
// Used by: ArchivePreview (featured), VisualArchiveGrid (all), and other components

// Import all gallery images
import forestPortal from "@/assets/gallery/forest-portal.png";
import waterCeremony from "@/assets/gallery/water-ceremony.png";
import treeCircuitry from "@/assets/gallery/tree-circuitry.png";
import windowMoment from "@/assets/gallery/window-moment.png";
import studioCreate from "@/assets/gallery/studio-create.png";
import thresholdFigure from "@/assets/gallery/threshold-figure.png";
import breatherThreshold from "@/assets/gallery/breather-threshold.png";
import cafeConversation from "@/assets/gallery/cafe-conversation.png";
import concreteVoid from "@/assets/gallery/concrete-void.png";
import forestPathCinematic from "@/assets/gallery/forest-path-cinematic.png";
import industrialLight from "@/assets/gallery/industrial-light.png";
import overpassSolitude from "@/assets/gallery/overpass-solitude.png";
import streetWalk from "@/assets/gallery/street-walk.png";
import waterReflectionCinematic from "@/assets/gallery/water-reflection-cinematic.png";

// Import generated assets
import manifestoContemplation from "@/assets/generated/manifesto-contemplation.png";
import methodologyWorkspace from "@/assets/generated/methodology-workspace.png";
import heroPortal from "@/assets/hero-portal.png";

// Types - Categories aligned with actual content themes
export type GalleryCategory =
  | "futuro-ancestral"  // Tech + ancestralidade, afrofuturismo, cyberpunk-ancestral
  | "cinema"            // Cenas cinematográficas, narrativas visuais
  | "natureza"          // Elementos naturais, água, floresta
  | "urbano"            // Cidades, São Paulo, cyberpunk urbano
  | "retratos"          // Pessoas, guerreiras, personagens
  | "personagens"       // Criaturas, seres fantásticos
  | "movimento";        // Dança, performance, corpo

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category: GalleryCategory;
  featured: boolean;
  year: number;
  tags?: string[];
}

// All gallery images - unified source with correct categories
export const galleryImages: GalleryImage[] = [
  // === FEATURED (appear on home) - Curated for maximum impact ===
  {
    id: "criancas-futuro-featured",
    src: "/assets/archive/portfolio/01-criancas-futuro/criancas-futuro-01.png",
    alt: "Crianças do Futuro - Afrofuturismo",
    title: "Crianças do Futuro",
    category: "futuro-ancestral",
    featured: true,
    year: 2023,
    tags: ["afrofuturismo", "ancestral", "futuro", "criança"],
  },
  {
    id: "raizes-featured",
    src: "/assets/archive/portfolio/03-raizes/raizes-01.png",
    alt: "Raízes - Dança ancestral em movimento",
    title: "Raízes",
    category: "movimento",
    featured: true,
    year: 2023,
    tags: ["dança", "movimento", "ancestral", "corpo"],
  },
  {
    id: "egos-featured",
    src: "/assets/archive/portfolio/04-egos/egos-01.png",
    alt: "Egos - Portal dimensional",
    title: "Egos",
    category: "futuro-ancestral",
    featured: true,
    year: 2023,
    tags: ["portal", "dimensional", "limiar", "transição"],
  },
  {
    id: "guerreiras-featured",
    src: "/assets/archive/portfolio/07-guerreiras/guerreiras-01.png",
    alt: "Guerreiras - Mulheres indígenas",
    title: "Guerreiras",
    category: "retratos",
    featured: true,
    year: 2023,
    tags: ["guerreiras", "indígenas", "força", "resistência"],
  },
  {
    id: "studio-create",
    src: studioCreate,
    alt: "Criação no studio - processo artístico",
    title: "Studio Create",
    category: "retratos",
    featured: true,
    year: 2024,
    tags: ["studio", "criação", "processo", "artista"],
  },
  {
    id: "threshold-figure",
    src: thresholdFigure,
    alt: "Figura no limiar - transição entre mundos",
    title: "Threshold Figure",
    category: "cinema",
    featured: true,
    year: 2024,
    tags: ["limiar", "figura", "transição", "portal"],
  },
  // === NON-FEATURED (moved from featured) ===
  {
    id: "forest-portal",
    src: forestPortal,
    alt: "Portal na floresta - visão cinematográfica",
    title: "Forest Portal",
    category: "cinema",
    featured: false,
    year: 2024,
    tags: ["portal", "floresta", "cinematic"],
  },
  {
    id: "water-ceremony",
    src: waterCeremony,
    alt: "Cerimônia na água - ritual sagrado",
    title: "Water Ceremony",
    category: "natureza",
    featured: false,
    year: 2024,
    tags: ["água", "cerimônia", "ritual", "sagrado"],
  },
  {
    id: "tree-circuitry",
    src: treeCircuitry,
    alt: "Árvore e circuitos - fusão tecnologia natureza",
    title: "Tree Circuitry",
    category: "futuro-ancestral",
    featured: false,
    year: 2024,
    tags: ["árvore", "tecnologia", "fusão", "tech-shaman"],
  },
  {
    id: "window-moment",
    src: windowMoment,
    alt: "Momento na janela - contemplação urbana",
    title: "Window Moment",
    category: "cinema",
    featured: false,
    year: 2024,
    tags: ["janela", "luz", "contemplação", "silhueta"],
  },

  // === NON-FEATURED (archive only) ===
  {
    id: "breather-threshold",
    src: breatherThreshold,
    alt: "Limiar - momento de respiro cinematográfico",
    title: "Breather Threshold",
    category: "cinema",
    featured: false,
    year: 2024,
    tags: ["respiro", "limiar", "cinematic"],
  },
  {
    id: "cafe-conversation",
    src: cafeConversation,
    alt: "Conversa no café - cena urbana",
    title: "Café Conversation",
    category: "urbano",
    featured: false,
    year: 2024,
    tags: ["café", "urbano", "conversa", "cotidiano"],
  },
  {
    id: "concrete-void",
    src: concreteVoid,
    alt: "Vazio de concreto - brutalismo urbano",
    title: "Concrete Void",
    category: "urbano",
    featured: false,
    year: 2024,
    tags: ["concreto", "brutalismo", "vazio", "arquitetura"],
  },
  {
    id: "forest-path-cinematic",
    src: forestPathCinematic,
    alt: "Caminho na floresta - cinematográfico",
    title: "Forest Path",
    category: "cinema",
    featured: false,
    year: 2024,
    tags: ["floresta", "caminho", "cinema", "natureza"],
  },
  {
    id: "industrial-light",
    src: industrialLight,
    alt: "Luz industrial - atmosfera urbana",
    title: "Industrial Light",
    category: "urbano",
    featured: false,
    year: 2024,
    tags: ["industrial", "luz", "urbano", "fábrica"],
  },
  {
    id: "overpass-solitude",
    src: overpassSolitude,
    alt: "Solidão no viaduto - São Paulo noturno",
    title: "Overpass Solitude",
    category: "urbano",
    featured: false,
    year: 2024,
    tags: ["viaduto", "solidão", "noturno", "SP"],
  },
  {
    id: "street-walk",
    src: streetWalk,
    alt: "Caminhada na rua - cena urbana noturna",
    title: "Street Walk",
    category: "urbano",
    featured: false,
    year: 2024,
    tags: ["rua", "caminhada", "noturno", "cidade"],
  },
  {
    id: "water-reflection-cinematic",
    src: waterReflectionCinematic,
    alt: "Reflexo na água - cinematográfico",
    title: "Water Reflection",
    category: "natureza",
    featured: false,
    year: 2024,
    tags: ["água", "reflexo", "cinema", "contemplação"],
  },
  {
    id: "manifesto-contemplation",
    src: manifestoContemplation,
    alt: "Contemplação do manifesto - figura pensativa",
    title: "Manifesto Contemplation",
    category: "retratos",
    featured: false,
    year: 2024,
    tags: ["manifesto", "contemplação", "retrato"],
  },
  {
    id: "methodology-workspace",
    src: methodologyWorkspace,
    alt: "Espaço de trabalho - metodologia criativa",
    title: "Methodology Workspace",
    category: "futuro-ancestral",
    featured: false,
    year: 2024,
    tags: ["metodologia", "workspace", "tech"],
  },
  {
    id: "hero-portal",
    src: heroPortal,
    alt: "Portal heroico - tech shaman landscape",
    title: "Hero Portal",
    category: "futuro-ancestral",
    featured: false,
    year: 2024,
    tags: ["portal", "hero", "tech-shaman", "deserto"],
  },
];

// Portfolio projects with proper category mapping
export interface PortfolioProject {
  id: string;
  title: string;
  category: "artes-visuais" | "historias";
  galleryCategory: GalleryCategory; // Category for filtering in archive
  type: string;
  date: string;
  year: number;
  location?: string;
  description: string;
  coverImage: string;
  images: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  // === 01 - CRIANÇAS DO FUTURO (41 imagens) ===
  {
    id: "criancas-futuro",
    title: "Crianças do Futuro",
    category: "artes-visuais",
    galleryCategory: "futuro-ancestral",
    type: "Afrofuturismo - AI Art",
    date: "Julho de 2023",
    year: 2023,
    location: "Midjourney",
    description: "Projeto de arte generativa conectado a uma grande rede de pessoas focadas em um futuro regenerativo e ancestral. Crianças de todas as etnias com estética cyberpunk-ancestral, onde a tecnologia é profundamente integrada à natureza e às raízes culturais.",
    coverImage: "/assets/archive/portfolio/01-criancas-futuro/criancas-futuro-01.png",
    images: Array.from({length: 41}, (_, i) => `/assets/archive/portfolio/01-criancas-futuro/criancas-futuro-${String(i + 1).padStart(2, '0')}.png`),
  },
  // === 02 - VELOCIDADES (12 imagens) ===
  {
    id: "velocidades",
    title: "VeloCidades",
    category: "artes-visuais",
    galleryCategory: "urbano",
    type: "Urbanismo Cyberpunk",
    date: "Maio de 2023",
    year: 2023,
    location: "São Paulo",
    description: "São Paulo noturno em sua essência cyberpunk brasileira. Becos com grafite, metrô, vida noturna, skatistas e músicos de rua. O movimento e ritmo das grandes cidades capturado em neon e sombras.",
    coverImage: "/assets/archive/portfolio/02-velocidades/velocidades-01.jpg",
    images: [
      "/assets/archive/portfolio/02-velocidades/velocidades-01.jpg",
      "/assets/archive/portfolio/02-velocidades/velocidades-02.jpg",
      "/assets/archive/portfolio/02-velocidades/velocidades-03.jpg",
      "/assets/archive/portfolio/02-velocidades/velocidades-04.png",
      "/assets/archive/portfolio/02-velocidades/velocidades-05.png",
      "/assets/archive/portfolio/02-velocidades/velocidades-06.png",
      "/assets/archive/portfolio/02-velocidades/velocidades-07.png",
      "/assets/archive/portfolio/02-velocidades/velocidades-08.png",
      "/assets/archive/portfolio/02-velocidades/velocidades-09.png",
      "/assets/archive/portfolio/02-velocidades/velocidades-10.png",
      "/assets/archive/portfolio/02-velocidades/velocidades-11.png",
      "/assets/archive/portfolio/02-velocidades/velocidades-12.png",
    ],
  },
  // === 03 - RAÍZES (10 imagens) ===
  {
    id: "raizes",
    title: "Raízes",
    category: "artes-visuais",
    galleryCategory: "movimento",
    type: "Danças Artificiais",
    date: "Abril de 2023",
    year: 2023,
    location: "Midjourney",
    description: "Dança, movimento corporal, ancestralidade e performance. Corpos em movimento expressivo capturados em estudo de imagens fotográficas com IA generativa.",
    coverImage: "/assets/archive/portfolio/03-raizes/raizes-01.png",
    images: Array.from({length: 10}, (_, i) => `/assets/archive/portfolio/03-raizes/raizes-${String(i + 1).padStart(2, '0')}.png`),
  },
  // === 04 - EGOS (11 imagens) ===
  {
    id: "egos",
    title: "Egos",
    category: "historias",
    galleryCategory: "futuro-ancestral",
    type: "Mundos e Portais",
    date: "Agosto de 2023",
    year: 2023,
    description: "Portais dimensionais, cidades futuristas e utopias onde tecnologia e natureza coexistem. O Mundo dos Sonhos se mostra na sua complexidade a partir de Neturnia, entre a fantasia mágica e o horror dos pesadelos.",
    coverImage: "/assets/archive/portfolio/04-egos/egos-01.png",
    images: Array.from({length: 11}, (_, i) => `/assets/archive/portfolio/04-egos/egos-${String(i + 1).padStart(2, '0')}.png`),
  },
  // === 05 - ÁGUAS (8 imagens) ===
  {
    id: "aguas",
    title: "Águas",
    category: "artes-visuais",
    galleryCategory: "natureza",
    type: "Elemento Sagrado",
    date: "Setembro de 2023",
    year: 2023,
    location: "Midjourney",
    description: "O elemento água em sua forma sagrada. Reflexos, memória ancestral, cachoeiras de luz bioluminescente. A vibração energética da água como portal de cura e conexão.",
    coverImage: "/assets/archive/portfolio/05-aguas/aguas-01.png",
    images: Array.from({length: 8}, (_, i) => `/assets/archive/portfolio/05-aguas/aguas-${String(i + 1).padStart(2, '0')}.png`),
  },
  // === 06 - CRIATURAS (8 imagens) ===
  {
    id: "criaturas",
    title: "Criaturas",
    category: "historias",
    galleryCategory: "personagens",
    type: "Seres Fantásticos",
    date: "Outubro de 2023",
    year: 2023,
    description: "Seres alienígenas, changelings e criaturas fantásticas de outros mundos. Entidades que habitam o limiar entre o humano e o sobrenatural.",
    coverImage: "/assets/archive/portfolio/06-criaturas/criaturas-01.png",
    images: Array.from({length: 8}, (_, i) => `/assets/archive/portfolio/06-criaturas/criaturas-${String(i + 1).padStart(2, '0')}.png`),
  },
  // === 07 - GUERREIRAS (8 imagens) ===
  {
    id: "guerreiras",
    title: "Guerreiras",
    category: "artes-visuais",
    galleryCategory: "retratos",
    type: "Mulheres Indígenas",
    date: "Setembro de 2023",
    year: 2023,
    location: "Marcha das Mulheres Indígenas",
    description: "Mulheres indígenas guerreiras em toda sua força e resistência. Arte criada em conexão com a Marcha das Mulheres Indígenas - ancestralidade feminina em luta.",
    coverImage: "/assets/archive/portfolio/07-guerreiras/guerreiras-01.png",
    images: Array.from({length: 8}, (_, i) => `/assets/archive/portfolio/07-guerreiras/guerreiras-${String(i + 1).padStart(2, '0')}.png`),
  },
  // === 08 - COLAGENS (8 imagens) ===
  {
    id: "colagens",
    title: "Colagens Ancestrais",
    category: "artes-visuais",
    galleryCategory: "futuro-ancestral",
    type: "Arte Digital Fragmentada",
    date: "Novembro de 2023",
    year: 2023,
    location: "Midjourney",
    description: "Fusão ancestral-futurista em colagens digitais. Fragmentos de passado e futuro se encontram em composições que conectam símbolos ancestrais com estética contemporânea.",
    coverImage: "/assets/archive/portfolio/08-colagens/colagens-01.png",
    images: Array.from({length: 8}, (_, i) => `/assets/archive/portfolio/08-colagens/colagens-${String(i + 1).padStart(2, '0')}.png`),
  },
  // === 09 - TECH SHAMAN (10 imagens) ===
  {
    id: "tech-shaman",
    title: "Tech Shaman",
    category: "artes-visuais",
    galleryCategory: "futuro-ancestral",
    type: "Deserto Místico",
    date: "2024",
    year: 2024,
    location: "Midjourney",
    description: "O universo visual Tech Shaman. Deserto místico, santuários futuristas, geometria sagrada. Onde código antigo encontra tecnologia do futuro em paisagens de contemplação.",
    coverImage: "/assets/archive/portfolio/09-tech-shaman/tech-shaman-01.png",
    images: Array.from({length: 10}, (_, i) => `/assets/archive/portfolio/09-tech-shaman/tech-shaman-${String(i + 1).padStart(2, '0')}.png`),
  },
  // === 10 - ORIGENS (8 imagens) ===
  {
    id: "origens",
    title: "Origens",
    category: "artes-visuais",
    galleryCategory: "futuro-ancestral",
    type: "Primeiros Experimentos",
    date: "2022",
    year: 2022,
    location: "Midjourney / Stable Diffusion",
    description: "Os primeiros experimentos com IA generativa em 2022. Mitologia, cyberpunk roxo/verde, exploração de possibilidades. O início de uma jornada visual.",
    coverImage: "/assets/archive/portfolio/10-origens/origens-01.png",
    images: Array.from({length: 8}, (_, i) => `/assets/archive/portfolio/10-origens/origens-${String(i + 1).padStart(2, '0')}.png`),
  },
  // === 11 - FUTURES (7 imagens) ===
  {
    id: "futures",
    title: "Futuros",
    category: "artes-visuais",
    galleryCategory: "futuro-ancestral",
    type: "Realidade Virtual",
    date: "2024",
    year: 2024,
    location: "Midjourney",
    description: "Visões do amanhã. Realidade virtual, bibliotecas cósmicas infinitas, tecnologia imersiva. Portais entre mundos onde o conhecimento flutua como estrelas.",
    coverImage: "/assets/archive/portfolio/11-futures/futures-01.png",
    images: Array.from({length: 7}, (_, i) => `/assets/archive/portfolio/11-futures/futures-${String(i + 1).padStart(2, '0')}.png`),
  },
];

// === HELPER FUNCTIONS ===

// Get featured images for home page
export const getFeaturedImages = (): GalleryImage[] => {
  return galleryImages.filter((img) => img.featured);
};

// Get all images for archive
export const getAllImages = (): GalleryImage[] => {
  return galleryImages;
};

// Get images by category
export const getImagesByCategory = (category: GalleryCategory): GalleryImage[] => {
  return galleryImages.filter((img) => img.category === category);
};

// Get all portfolio images flattened (for backwards compatibility)
export const getAllPortfolioImages = () => {
  return portfolioProjects.flatMap((project) =>
    project.images.map((src) => ({
      src,
      projectId: project.id,
      projectTitle: project.title,
      category: project.category,
      galleryCategory: project.galleryCategory,
    }))
  );
};

// Get combined images for full archive view - now uses proper galleryCategory
export const getFullArchiveImages = () => {
  const gallery = galleryImages.map((img) => ({
    src: img.src,
    title: img.title || img.alt,
    category: img.category,
    year: img.year,
    type: "gallery" as const,
  }));

  // Portfolio uses galleryCategory for proper filtering
  const portfolio = portfolioProjects.flatMap((project) =>
    project.images.map((src) => ({
      src,
      title: project.title,
      category: project.galleryCategory, // Now uses the proper category!
      year: project.year,
      type: "portfolio" as const,
      projectId: project.id,
    }))
  );

  return [...gallery, ...portfolio];
};

// Get unique categories - includes all categories from gallery AND portfolio
export const getCategories = (): GalleryCategory[] => {
  const galleryCategories = new Set(galleryImages.map((img) => img.category));
  const portfolioCategories = new Set(portfolioProjects.map((p) => p.galleryCategory));

  // Merge both sets
  const allCategories = new Set([...galleryCategories, ...portfolioCategories]);
  return Array.from(allCategories);
};

// Stats
export const getGalleryStats = () => ({
  total: galleryImages.length + getAllPortfolioImages().length,
  gallery: galleryImages.length,
  portfolio: getAllPortfolioImages().length,
  featured: getFeaturedImages().length,
  categories: getCategories().length,
});

// Category labels for UI
export const categoryLabels: Record<GalleryCategory, string> = {
  "futuro-ancestral": "Futuro Ancestral",
  cinema: "Cinema",
  natureza: "Natureza",
  urbano: "Urbano",
  retratos: "Retratos",
  personagens: "Personagens",
  movimento: "Movimento",
};
