import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ExternalLink, Clock, Calendar } from "lucide-react";

const SUBSTACK_URL = "taynapuri.substack.com";

interface SubstackPost {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  content: string;
  categories: string[];
  thumbnail?: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const estimateReadTime = (content: string) => {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min`;
};

const getExcerpt = (html: string, maxLength: number = 200) => {
  const text = html.replace(/<[^>]*>/g, "");
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const JournalEntryRow = ({
  post,
  index,
}: {
  post: SubstackPost;
  index: number;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? {} : { delay: index * 0.05 }}
    >
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block border-b border-text-muted/20 py-6
                   hover:bg-stone-dark/30 transition-colors
                   group"
      >
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h3
            className="font-display text-xl text-ancestral-white
                       group-hover:text-ancestral-amber transition-colors"
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-text-secondary text-sm line-clamp-2">
            {getExcerpt(post.description)}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-text-muted font-mono-v2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.pubDate)}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {estimateReadTime(post.content || post.description)}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-ancestral-amber/60 group-hover:text-ancestral-amber">
              Ler no Substack
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-0 border-t border-text-muted/20">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="border-b border-text-muted/20 py-6 animate-pulse"
      >
        <div className="h-6 bg-stone-dark rounded w-3/4 mb-3" />
        <div className="h-4 bg-stone-dark/50 rounded w-full mb-2" />
        <div className="h-4 bg-stone-dark/50 rounded w-2/3 mb-3" />
        <div className="flex gap-4">
          <div className="h-3 bg-stone-dark/30 rounded w-20" />
          <div className="h-3 bg-stone-dark/30 rounded w-16" />
        </div>
      </div>
    ))}
  </div>
);

export const JournalList = () => {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://${SUBSTACK_URL}/feed`
        );
        const data = await response.json();
        if (data.status === "ok") {
          setPosts(data.items);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching Substack posts:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-text-secondary text-lg">
            Reflexões sobre identidade, storytelling e IA.
          </p>
          <p className="text-text-muted text-sm mt-1">
            Publicado semanalmente no Substack
          </p>
        </div>

        <a
          href={`https://${SUBSTACK_URL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono-v2 text-xs
                     text-ancestral-amber hover:text-ancestral-white transition-colors"
        >
          [Assinar Newsletter]
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Posts List */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="py-16 text-center border border-text-muted/20">
          <p className="text-text-secondary mb-4">
            Não foi possível carregar os artigos.
          </p>
          <a
            href={`https://${SUBSTACK_URL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ancestral-amber hover:underline font-mono-v2 text-sm"
          >
            Visitar Substack diretamente
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      ) : posts.length === 0 ? (
        <div className="py-16 text-center border border-text-muted/20">
          <p className="text-text-muted font-mono-v2 text-sm">
            Nenhum artigo publicado ainda.
          </p>
        </div>
      ) : (
        <div className="space-y-0 border-t border-text-muted/20">
          {posts.map((post, index) => (
            <JournalEntryRow key={post.link} post={post} index={index} />
          ))}
        </div>
      )}

      {/* Newsletter Embed */}
      <div className="mt-12 pt-12 border-t border-text-muted/20">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-display text-2xl text-ancestral-white mb-2">
            Receba direto no email
          </h3>
          <p className="text-text-secondary text-sm mb-6">
            Artigos semanais sobre identidade, storytelling e IA aplicada.
          </p>

          <div className="bg-stone-dark/30 p-6 border border-text-muted/20">
            <iframe
              src={`https://${SUBSTACK_URL}/embed`}
              width="100%"
              height="150"
              style={{
                border: "none",
                background: "transparent",
                colorScheme: "dark",
              }}
              frameBorder="0"
              scrolling="no"
              title="Newsletter signup"
            />
          </div>

          <p className="font-mono-v2 text-xs text-text-muted mt-4">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JournalList;
