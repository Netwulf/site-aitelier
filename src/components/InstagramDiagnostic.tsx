import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import DiagnosisLoadingStates from "./DiagnosisLoadingStates";
import DiagnosisResultCard from "./DiagnosisResultCard";

type DiagnosticVariant = "archive" | "studio" | "estudos";

interface InstagramDiagnosticProps {
  variant: DiagnosticVariant;
}

interface ProfileData {
  name: string;
  bio: string;
  profilePicture: string;
  followersCount: number;
}

interface DiagnosisResult {
  quem_voce_parece_ser: string;
  o_que_seu_brand_demonstra: string;
  caracteristicas_fortes: string[];
  ponto_travado: string;
  potencial_identificado: string;
  insights_dos_reels?: {
    estilo_comunicacao: string;
    presenca_visual: string;
    temas_recorrentes: string[];
  };
}

type ProcessingStep =
  | "idle"
  | "scraping"
  | "profile_loaded"
  | "initial_analysis"
  | "full_analysis"
  | "completed"
  | "error";

const variantContent = {
  archive: {
    label: "FERRAMENTA",
    headline: "Diagnostico de Presenca Digital",
    subtext: "Uma de nossas criacoes. Experimente.",
    inputPlaceholder: "@seuinstagram",
    ctaText: "Analisar",
  },
  studio: {
    label: "PRIMEIRO PASSO",
    headline: "Onde voce esta agora?",
    subtext: "Antes de comecarmos, precisamos entender sua presenca atual.",
    inputPlaceholder: "@seuinstagram",
    ctaText: "Mapear Perfil",
  },
  estudos: {
    label: "AUTOCONHECIMENTO",
    headline: "Descubra sua expressao",
    subtext: "Como artista, como outsider, como voce se apresenta ao mundo?",
    inputPlaceholder: "@seuinstagram",
    ctaText: "Descobrir",
  },
};

export const InstagramDiagnostic = ({ variant }: InstagramDiagnosticProps) => {
  const content = variantContent[variant];
  const prefersReducedMotion = useReducedMotion();

  const [username, setUsername] = useState("");
  const [step, setStep] = useState<ProcessingStep>("idle");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [initialObservation, setInitialObservation] = useState("");
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState("");
  const [postsCount, setPostsCount] = useState(0);
  const [reelsCount, setReelsCount] = useState(0);

  const handleAnalyze = async () => {
    if (!username.trim()) {
      setError("Digite seu @ do Instagram");
      return;
    }

    setError("");
    setStep("scraping");

    try {
      const { data: scrapeData, error: scrapeError } = await supabase.functions.invoke(
        "scrape-instagram",
        { body: { username: username.trim() } }
      );

      if (scrapeError || !scrapeData?.success) {
        throw new Error(scrapeData?.error || "Erro ao buscar perfil");
      }

      setProfile(scrapeData.profile);
      setPostsCount(scrapeData.postsCount || 0);
      setReelsCount(scrapeData.reelsCount || 0);
      setStep("profile_loaded");

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep("initial_analysis");

      const { data: initialData, error: initialError } = await supabase.functions.invoke(
        "analyze-profile",
        { body: { diagnosisId: scrapeData.diagnosisId, analysisType: "initial" } }
      );

      if (initialError || !initialData?.success) {
        throw new Error(initialData?.error || "Erro na analise inicial");
      }

      setInitialObservation(initialData.observation);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStep("full_analysis");

      const { data: fullData, error: fullError } = await supabase.functions.invoke(
        "analyze-profile",
        { body: { diagnosisId: scrapeData.diagnosisId, analysisType: "full" } }
      );

      if (fullError || !fullData?.success) {
        throw new Error(fullData?.error || "Erro no diagnostico completo");
      }

      setDiagnosis(fullData.diagnosis);
      setStep("completed");
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : "Erro ao analisar perfil");
      setStep("error");
    }
  };

  const handleReset = () => {
    setUsername("");
    setStep("idle");
    setProfile(null);
    setInitialObservation("");
    setDiagnosis(null);
    setError("");
    setPostsCount(0);
    setReelsCount(0);
  };

  return (
    <section id="diagnostic" className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Idle State */}
        {step === "idle" && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Header */}
            <span className="font-mono-v2 text-xs tracking-widest text-tech-olive mb-4 block">
              {content.label}
            </span>
            <h2 className="text-2xl md:text-3xl font-display text-warm-ivory mb-3">
              {content.headline}
            </h2>
            <p className="text-warm-ivory/50 mb-8">
              {content.subtext}
            </p>

            {/* Input */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-ivory/30" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  placeholder={content.inputPlaceholder}
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-white/20
                           text-warm-ivory placeholder:text-warm-ivory/30
                           focus:border-tech-olive focus:outline-none
                           font-mono-v2 text-sm"
                />
              </div>
              <button
                onClick={handleAnalyze}
                className="px-6 py-3 bg-tech-olive text-void-black
                         font-mono-v2 text-sm tracking-wider
                         hover:bg-tech-olive/90 transition-colors
                         flex items-center gap-2"
              >
                {content.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <p className="text-warm-ivory/30 text-xs">
              Seu perfil precisa ser publico para a analise funcionar
            </p>
          </motion.div>
        )}

        {/* Loading States */}
        {(step === "scraping" ||
          step === "profile_loaded" ||
          step === "initial_analysis" ||
          step === "full_analysis") && (
          <DiagnosisLoadingStates
            step={step}
            profile={profile}
            initialObservation={initialObservation}
            postsCount={postsCount}
            reelsCount={reelsCount}
          />
        )}

        {/* Result */}
        {step === "completed" && diagnosis && profile && (
          <DiagnosisResultCard
            profile={profile}
            diagnosis={diagnosis}
            onReset={handleReset}
          />
        )}

        {/* Error State */}
        {step === "error" && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            className="border border-white/10 p-8 text-center"
          >
            <p className="text-red-400 text-lg mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="border border-warm-ivory/30 px-6 py-3
                       text-warm-ivory font-mono-v2 text-sm
                       hover:border-tech-olive hover:text-tech-olive
                       transition-colors"
            >
              Tentar novamente
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InstagramDiagnostic;
