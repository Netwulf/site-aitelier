import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, ExternalLink, ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";

interface SubstackPost {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  content: string;
  categories: string[];
  thumbnail?: string;
}

const Journal = () => {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<SubstackPost | null>(null);

  const SUBSTACK_URL = "taynapuri.substack.com";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://${SUBSTACK_URL}/feed`
        );
        const data = await response.json();
        if (data.status === 'ok') {
          setPosts(data.items);
        }
      } catch (error) {
        console.error('Error fetching Substack posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const estimateReadTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  const getExcerpt = (html: string, maxLength: number = 300) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getCleanContent = (html: string) => {
    // Remove scripts and styles but keep basic formatting
    return html
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<a[^>]*class="[^"]*button[^"]*"[^>]*>.*?<\/a>/gi, '') // Remove CTA buttons
      .replace(/Subscribe now/gi, '')
      .replace(/Thanks for reading/gi, '');
  };

  return (
    <div className="min-h-screen bg-brutal-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 overflow-hidden border-b border-concrete-border/30">
        <div className="organic-glow" style={{ top: "20%", left: "10%", opacity: 0.15 }} />

        <motion.div
          className="container mx-auto max-w-6xl relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUpSimple} className="flex items-center gap-4 mb-6">
            <FileText className="w-5 h-5 text-matrix-green" />
            <span className="code-text text-sm text-matrix-green">JOURNAL</span>
          </motion.div>

          <motion.h1
            variants={fadeInUpSimple}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-brutal-white leading-none mb-6"
          >
            Reflexões sobre<br />
            <span className="text-matrix-green">identidade e IA</span>
          </motion.h1>

          <motion.p
            variants={fadeInUpSimple}
            className="text-lg text-concrete max-w-2xl leading-relaxed mb-8"
          >
            Artigos sobre storytelling, sistemas de marca, autonomia criativa
            e o futuro da presença digital.
          </motion.p>

          {/* Subscribe CTA */}
          <motion.div variants={fadeInUpSimple}>
            <a
              href={`https://${SUBSTACK_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-matrix-green text-brutal-black font-bold text-sm uppercase tracking-wider hover:bg-matrix-green/90 transition-all group"
            >
              Assinar Newsletter
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">

          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse border border-concrete-border/30 p-8">
                  <div className="h-4 bg-concrete-border/30 rounded w-1/4 mb-4" />
                  <div className="h-8 bg-concrete-border/30 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-concrete-border/30 rounded w-full mb-2" />
                  <div className="h-4 bg-concrete-border/30 rounded w-full mb-2" />
                  <div className="h-4 bg-concrete-border/30 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-concrete mb-8">
                Carregando artigos do Substack...
              </p>
              <a
                href={`https://${SUBSTACK_URL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-matrix-green hover:underline"
              >
                Visitar Substack diretamente
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Posts List - Left Column */}
              <div className="lg:col-span-1 space-y-4">
                <h2 className="code-text text-sm text-matrix-green mb-6">
                  ARTIGOS RECENTES
                </h2>

                {posts.map((post, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPost(post)}
                    className={`w-full text-left p-4 border transition-all ${
                      selectedPost?.link === post.link
                        ? "border-matrix-green bg-matrix-green/10"
                        : "border-concrete-border/30 hover:border-concrete-border"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-3 h-3 text-concrete" />
                      <span className="code-text text-xs text-concrete">
                        {formatDate(post.pubDate)}
                      </span>
                    </div>
                    <h3 className={`font-bold leading-tight ${
                      selectedPost?.link === post.link
                        ? "text-matrix-green"
                        : "text-brutal-white"
                    }`}>
                      {post.title}
                    </h3>
                  </button>
                ))}
              </div>

              {/* Selected Post - Right Column */}
              <div className="lg:col-span-2">
                {selectedPost ? (
                  <article className="border border-concrete-border/30 p-8 lg:p-12">
                    {/* Post Header */}
                    <div className="mb-8 pb-8 border-b border-concrete-border/30">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="code-text text-sm text-concrete">
                          {formatDate(selectedPost.pubDate)}
                        </span>
                        <span className="text-concrete">•</span>
                        <span className="code-text text-sm text-concrete flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {estimateReadTime(selectedPost.content || selectedPost.description)}
                        </span>
                      </div>

                      <h1 className="text-3xl md:text-4xl font-bold text-brutal-white leading-tight mb-6">
                        {selectedPost.title}
                      </h1>

                      <a
                        href={selectedPost.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-matrix-green hover:underline code-text text-sm"
                      >
                        Ler no Substack
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Post Content - Substack-like clean reading */}
                    <div
                      className="
                        text-[17px] leading-[1.8] text-concrete/90 font-light
                        [&>p]:mb-7
                        [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-brutal-white [&>h2]:mt-10 [&>h2]:mb-4
                        [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-brutal-white [&>h3]:mt-8 [&>h3]:mb-3
                        [&>a]:text-matrix-green [&>a]:underline [&>a]:underline-offset-2
                        [&>strong]:text-brutal-white [&>strong]:font-medium
                        [&>em]:text-concrete/80
                        [&>blockquote]:border-l [&>blockquote]:border-concrete-border/50 [&>blockquote]:pl-5 [&>blockquote]:my-8 [&>blockquote]:text-concrete/70 [&>blockquote]:italic
                        [&>ul]:my-6 [&>ul]:pl-5 [&>ul]:space-y-3
                        [&>ol]:my-6 [&>ol]:pl-5 [&>ol]:space-y-3
                        [&>li]:text-concrete/90
                        [&>hr]:border-concrete-border/20 [&>hr]:my-12
                        [&>img]:my-8 [&>img]:rounded
                        [&_p]:mb-7
                        [&_a]:text-matrix-green [&_a]:underline [&_a]:underline-offset-2
                        [&_strong]:text-brutal-white [&_strong]:font-medium
                        [&_em]:text-concrete/80
                        [&_blockquote]:border-l [&_blockquote]:border-concrete-border/50 [&_blockquote]:pl-5 [&_blockquote]:my-8 [&_blockquote]:text-concrete/70 [&_blockquote]:italic
                        [&_blockquote_p]:mb-0
                        [&_ul]:my-6 [&_ul]:pl-5 [&_ul]:space-y-3
                        [&_ol]:my-6 [&_ol]:pl-5 [&_ol]:space-y-3
                        [&_li]:text-concrete/90 [&_li]:leading-[1.7]
                        [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-brutal-white [&_h2]:mt-10 [&_h2]:mb-4
                        [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-brutal-white [&_h3]:mt-8 [&_h3]:mb-3
                      "
                      dangerouslySetInnerHTML={{
                        __html: getCleanContent(selectedPost.content || selectedPost.description)
                      }}
                    />

                    {/* Read More CTA */}
                    <div className="mt-12 pt-8 border-t border-concrete-border/30">
                      <a
                        href={selectedPost.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-matrix-green text-brutal-black font-bold text-sm uppercase tracking-wider hover:bg-matrix-green/90 transition-all group"
                      >
                        Continuar lendo no Substack
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ) : (
                  <div className="border border-concrete-border/30 p-8 lg:p-12">
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-concrete-border mx-auto mb-4" />
                      <p className="text-concrete mb-2">
                        Selecione um artigo para ler
                      </p>
                      <p className="text-sm text-concrete/60">
                        Ou acesse diretamente no Substack
                      </p>
                    </div>

                    {/* Featured Post Preview */}
                    {posts[0] && (
                      <div className="mt-8 pt-8 border-t border-concrete-border/30">
                        <p className="code-text text-xs text-matrix-green mb-4">MAIS RECENTE</p>
                        <button
                          onClick={() => setSelectedPost(posts[0])}
                          className="text-left group"
                        >
                          <h3 className="text-2xl font-bold text-brutal-white group-hover:text-matrix-green transition-colors mb-4">
                            {posts[0].title}
                          </h3>
                          <p className="text-concrete leading-relaxed mb-4">
                            {getExcerpt(posts[0].description, 200)}
                          </p>
                          <span className="inline-flex items-center gap-2 text-matrix-green code-text text-sm">
                            Ler artigo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Embed Section */}
      <section className="relative py-20 px-4 md:px-8 border-t border-concrete-border/30">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brutal-white mb-4">
            Receba direto no email
          </h2>
          <p className="text-concrete mb-8">
            Artigos semanais sobre identidade, storytelling e IA aplicada.
          </p>

          <div className="glass p-8">
            <iframe
              src={`https://${SUBSTACK_URL}/embed`}
              width="100%"
              height="150"
              style={{
                border: 'none',
                background: 'transparent',
                colorScheme: 'dark'
              }}
              frameBorder="0"
              scrolling="no"
              title="Newsletter signup"
            />
          </div>

          <p className="code-text text-xs text-concrete mt-6">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Journal;
