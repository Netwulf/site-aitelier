import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const EstudosEntry = () => {
  const { t } = useTranslation('school');
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'pt';
  const contactPath = currentLang === 'en' ? 'contact' : 'contato';

  return (
    <div className="py-16">
      <p className="text-xl text-ancestral-white mb-8">
        {t('entry.title')}
      </p>

      <p className="text-text-secondary mb-8">
        {t('entry.subtitle')}
      </p>

      <Link
        to={`/${currentLang}/${contactPath}?from=escola`}
        className="inline-block px-8 py-4
                   border border-ancestral-white text-ancestral-white
                   hover:bg-ancestral-white hover:text-ancestral-black
                   transition-all duration-300
                   font-mono-v2 text-sm tracking-wide"
      >
        [{t('entry.cta')}]
      </Link>
    </div>
  );
};

export default EstudosEntry;
