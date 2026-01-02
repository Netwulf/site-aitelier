import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight, Sparkles, TrendingUp, Lightbulb } from "lucide-react";

const News = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const articles = [
    {
      category: "LANÇAMENTO",
      icon: Sparkles,
      date: "05 NOV 2025",
      title: "Nova ferramenta: Sora é liberada para todos",
      excerpt: "OpenAI abre acesso público ao gerador de vídeos. Analisamos o impacto para criadores brasileiros e cases de uso.",
      readTime: "8 min",
      featured: true,
    },
    {
      category: "TENDÊNCIA",
      icon: TrendingUp,
      date: "03 NOV 2025",
      title: "O fim dos bancos de imagem?",
      excerpt: "Getty Images perde 40% de receita. Getty Images processa Stability AI. O que isso significa para criadores.",
      readTime: "5 min",
      featured: false,
    },
    {
      category: "TUTORIAL",
      icon: Lightbulb,
      date: "01 NOV 2025",
      title: "Como criar um clone de voz em 10 minutos",
      excerpt: "Passo a passo completo usando ElevenLabs. Desde gravação até aplicação em projetos reais.",
      readTime: "12 min",
      featured: false,
    },
    {
      category: "ANÁLISE",
      icon: TrendingUp,
      date: "28 OUT 2025",
      title: "IA generativa já é mainstream",
      excerpt: "78% dos criativos usam IA diariamente. Dados da pesquisa Adobe + Creative Market sobre adoção.",
      readTime: "6 min",
      featured: false,
    },
  ];

  return (
    <section 
      id="noticias" 
      className="py-20 md:py-32 bg-brutal-black relative overflow-hidden" 
      ref={ref as any}
    >
      {/* Efeito de fundo */}
      <div className="absolute top-20 right-0 w-1/2 h-96 bg-matrix-green/5 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header Swiss Grid */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7 border-l-4 border-matrix-green pl-8">
              <div className="code-text text-xs mb-4">&gt; NEWS_FEED</div>
              <h2 className="text-brutal-white mb-6">
                NOTÍCIAS &<br />ATUALIZAÇÕES
              </h2>
              <p className="poetic-text text-lg text-brutal-white/70">
                O que está acontecendo no mundo da IA criativa. Análises, tutoriais e tendências.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-end">
              <button className="btn-ghost text-sm">
                <span>VER TUDO</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Grid Quebrado - Magazine Layout */}
        <div className="news-grid">
          {/* Artigo principal (featured) */}
          {articles
            .filter((article) => article.featured)
            .map((article, index) => (
              <motion.article
                key={index}
                className="news-featured group"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={prefersReducedMotion ? {} : fadeInUpSimple}
              >
                <div className="brutal-block p-8 md:p-12 h-full hover-brutal">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <article.icon className="w-5 h-5 text-matrix-green" />
                      <span className="news-category">{article.category}</span>
                    </div>
                    <span className="code-text text-xs">{article.date}</span>
                  </div>

                  {/* Título grande - destaque editorial */}
                  <h3 className="text-brutal-white text-4xl md:text-5xl leading-tight mb-6">
                    {article.title}
                  </h3>

                  <div className="brutal-line opacity-30 my-6" />

                  {/* Excerpt */}
                  <p className="poetic-text text-xl text-brutal-white/70 mb-8">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-concrete uppercase tracking-wider">
                      Leitura: {article.readTime}
                    </span>
                    <div className="flex items-center gap-2 text-matrix-green group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-medium">LER MAIS</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Linha de hover */}
                  <div className="h-1 bg-matrix-green w-0 transition-all duration-500 group-hover:w-full mt-6" />
                </div>
              </motion.article>
            ))}

          {/* Artigos secundários - grid quebrado */}
          <div className="news-secondary-grid">
            {articles
              .filter((article) => !article.featured)
              .map((article, index) => (
                <motion.article
                  key={index}
                  className="news-card group"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={prefersReducedMotion ? {} : fadeInUpSimple}
                  style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div className="glass p-6 h-full hover-brutal">
                    {/* Header compacto */}
                    <div className="flex items-center gap-3 mb-4">
                      <article.icon className="w-4 h-4 text-matrix-green" />
                      <span className="news-category-small">{article.category}</span>
                      <span className="code-text text-xs ml-auto">{article.date}</span>
                    </div>

                    {/* Título */}
                    <h4 className="text-brutal-white text-xl md:text-2xl leading-tight mb-3">
                      {article.title}
                    </h4>

                    {/* Excerpt curto */}
                    <p className="text-sm text-brutal-white/60 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-concrete">{article.readTime}</span>
                      <ArrowRight className="w-4 h-4 text-matrix-green group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <motion.div
          className="mt-20 border-2 border-matrix-green p-8 md:p-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-brutal-white text-3xl mb-4">
                NEWSLETTER SEMANAL
              </h3>
              <p className="poetic-text text-brutal-white/70">
                Receba as principais notícias, ferramentas e tutoriais de IA criativa toda segunda-feira.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 bg-concrete border-2 border-white/20 px-6 py-4 text-brutal-white placeholder:text-concrete focus:border-matrix-green outline-none transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                ASSINAR
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default News;
