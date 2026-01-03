import { useTranslation } from 'react-i18next';
import { portfolioProjects, type PortfolioProject } from '@/data/portfolioData';

export interface TranslatedPortfolioProject extends Omit<PortfolioProject, 'title' | 'description' | 'type'> {
  title: string;
  description: string;
  type: string;
  date: string;
}

export function usePortfolioData(): TranslatedPortfolioProject[] {
  const { t } = useTranslation('portfolio');

  return portfolioProjects.map((project) => {
    const translatedProject = t(`projects.${project.id}`, { returnObjects: true }) as {
      title?: string;
      description?: string;
      type?: string;
      date?: string;
    };

    return {
      ...project,
      title: translatedProject?.title || project.title,
      description: translatedProject?.description || project.description,
      type: translatedProject?.type || project.type,
      date: translatedProject?.date || project.date,
    };
  });
}

export function usePortfolioProject(id: string): TranslatedPortfolioProject | undefined {
  const projects = usePortfolioData();
  return projects.find((p) => p.id === id);
}

export function usePortfolioCategories() {
  const { t } = useTranslation('portfolio');

  return {
    all: t('categories.all'),
    'artes-visuais': t('categories.artes-visuais'),
    'historias': t('categories.historias'),
  };
}

export default usePortfolioData;
