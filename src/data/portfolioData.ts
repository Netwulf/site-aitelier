// Portfolio data - ai.telier Archive v3
// 11 projetos completos com 131 imagens

export interface PortfolioProject {
  id: string;
  title: string;
  category: "artes-visuais" | "historias";
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
    type: "Realidade Virtual",
    date: "2024",
    year: 2024,
    location: "Midjourney",
    description: "Visões do amanhã. Realidade virtual, bibliotecas cósmicas infinitas, tecnologia imersiva. Portais entre mundos onde o conhecimento flutua como estrelas.",
    coverImage: "/assets/archive/portfolio/11-futures/futures-01.png",
    images: Array.from({length: 7}, (_, i) => `/assets/archive/portfolio/11-futures/futures-${String(i + 1).padStart(2, '0')}.png`),
  },
];

// Helper to get all images flattened
export const getAllPortfolioImages = () => {
  return portfolioProjects.flatMap((project) =>
    project.images.map((src) => ({
      src,
      projectId: project.id,
      projectTitle: project.title,
      category: project.category,
    }))
  );
};

// Helper to filter by category
export const getProjectsByCategory = (category: "artes-visuais" | "historias") => {
  return portfolioProjects.filter((p) => p.category === category);
};

// Helper to get projects grouped by year
export const getProjectsByYear = () => {
  const grouped: Record<number, PortfolioProject[]> = {};
  portfolioProjects.forEach((project) => {
    if (!grouped[project.year]) {
      grouped[project.year] = [];
    }
    grouped[project.year].push(project);
  });
  return grouped;
};

// Stats
export const getPortfolioStats = () => ({
  totalProjects: portfolioProjects.length,
  totalImages: getAllPortfolioImages().length,
  artesVisuais: getProjectsByCategory("artes-visuais").length,
  historias: getProjectsByCategory("historias").length,
  years: Object.keys(getProjectsByYear()).length,
});
