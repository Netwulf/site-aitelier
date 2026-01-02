import { HeroFrameProps } from '@/components/navigation/HeroFrame';

export const frames: Omit<HeroFrameProps, 'children'>[] = [
  {
    id: 'aitelier',
    title: 'Uma escola de arte para a era da IA.',
    subtitle: 'Onde storytelling, cinema e tecnologia se organizam como linguagem.',
    code: '// O futuro é ancestral.'
  },
  {
    id: 'escola',
    title: 'ESCOLA',
    subtitle: 'Cursos, laboratórios, residências.',
    code: '// onde se forma a linguagem'
  },
  {
    id: 'studio',
    title: 'STUDIO',
    subtitle: 'Filmes, narrativas, direção criativa.',
    code: '// onde identidade vira obra'
  },
  {
    id: 'playground',
    title: 'PLAYGROUND',
    subtitle: 'Obras, ferramentas, experimentos.',
    code: '// onde experimentamos em público'
  }
];

export const frameLabels = ['ai.telier', 'Escola', 'Studio', 'Playground'];
