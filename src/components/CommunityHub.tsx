import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface SubstackPost {
  title: string;
  pubDate: string;
  link: string;
  description: string;
}

// Configure upcoming events here
const upcomingEvents = [
  {
    date: "Fevereiro 2025",
    title: "Encontro Curitiba",
    description: "Imersão presencial de storytelling e identidade visual com IA.",
    type: "Presencial · Curitiba",
    link: null as string | null,
  },
  {
    date: "Março 2025",
    title: "Encontro Brasília",
    description: "Workshop de narrativa pessoal e presença digital autêntica.",
    type: "Presencial · Brasília",
    link: null as string | null,
  },
];

const CommunityHub = () => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://taynapuri.substack.com/feed`
        );
        const data = await response.json();
        if (data.status === "ok") {
          setPosts(data.items.slice(0, 2));
        }
      } catch (error) {
        console.error("Error fetching Substack posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const estimateReadTime = (description: string) => {
    const text = description.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const minutes = Math.max(3, Math.ceil(words / 200));
    return `${minutes} min`;
  };

  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-brutal-black">
      <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto max-w-5xl relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUpSimple} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="code-text text-sm text-matrix-green">05</span>
            <div className="h-px bg-concrete-border flex-1" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brutal-white leading-none mb-4">
            CONEXÕES
          </h2>
          <p className="text-lg text-concrete max-w-xl">
            Onde o ai.telier encontra você.
          </p>
        </motion.div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* LEFT: LEIA */}
          <motion.div variants={fadeInUpSimple}>
            <h3 className="text-sm font-mono text-text-muted tracking-widest mb-8">
              LEIA
            </h3>

            {loading ? (
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-5 bg-concrete-border/30 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-concrete-border/20 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <a
                    key={index}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h4 className="text-lg md:text-xl text-brutal-white mb-2 group-hover:text-matrix-green transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
                      <span>{formatDate(post.pubDate)}</span>
                      <span>·</span>
                      <span>{estimateReadTime(post.description)}</span>
                    </div>
                  </a>
                ))}

                <a
                  href="https://taynapuri.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-matrix-green hover:text-brutal-white transition-colors font-mono group"
                >
                  Ver todos os artigos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}
          </motion.div>

          {/* RIGHT: PARTICIPE */}
          <motion.div variants={fadeInUpSimple}>
            <h3 className="text-sm font-mono text-text-muted tracking-widest mb-8">
              PARTICIPE
            </h3>

            {/* Event Cards */}
            <div className="space-y-4 mb-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="border border-concrete-border/30 p-5 hover:border-matrix-green/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg text-brutal-white mb-1">
                        {event.title}
                      </h4>
                      <p className="text-sm text-concrete mb-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-matrix-green whitespace-nowrap">
                      {event.type}
                    </div>
                  </div>
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-sm text-matrix-green hover:text-brutal-white transition-colors font-mono"
                    >
                      Quero participar
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Newsletter Mini */}
            <div className="text-sm text-concrete">
              <p className="mb-3">
                Receba artigos e avisos de eventos por email:
              </p>
              <a
                href="https://taynapuri.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-matrix-green hover:text-brutal-white transition-colors font-mono"
              >
                Assinar newsletter
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CommunityHub;
