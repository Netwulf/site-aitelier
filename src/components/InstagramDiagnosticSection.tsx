import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import DiagnosisLoadingStates from "./DiagnosisLoadingStates";
import DiagnosisResultCard from "./DiagnosisResultCard";

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

const InstagramDiagnosticSection = () => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();

  const [username, setUsername] = useState("");
  const [step, setStep] = useState<ProcessingStep>("idle");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [initialObservation, setInitialObservation] = useState("");
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [diagnosisId, setDiagnosisId] = useState<string | null>(null);
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
      // Step 1: Scrape Instagram
      const { data: scrapeData, error: scrapeError } = await supabase.functions.invoke(
        "scrape-instagram",
        {
          body: { username: username.trim() },
        }
      );

      if (scrapeError || !scrapeData?.success) {
        throw new Error(scrapeData?.error || "Erro ao buscar perfil");
      }

      setProfile(scrapeData.profile);
      setDiagnosisId(scrapeData.diagnosisId);
      setPostsCount(scrapeData.postsCount || 0);
      setReelsCount(scrapeData.reelsCount || 0);
      setStep("profile_loaded");

      // Small delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep("initial_analysis");

      // Step 2: Get initial observation
      const { data: initialData, error: initialError } = await supabase.functions.invoke(
        "analyze-profile",
        {
          body: { diagnosisId: scrapeData.diagnosisId, analysisType: "initial" },
        }
      );

      if (initialError || !initialData?.success) {
        throw new Error(initialData?.error || "Erro na análise inicial");
      }

      setInitialObservation(initialData.observation);

      // Small delay for reading
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStep("full_analysis");

      // Step 3: Get full diagnosis
      const { data: fullData, error: fullError } = await supabase.functions.invoke(
        "analyze-profile",
        {
          body: { diagnosisId: scrapeData.diagnosisId, analysisType: "full" },
        }
      );

      if (fullError || !fullData?.success) {
        throw new Error(fullData?.error || "Erro no diagnóstico completo");
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
    setDiagnosisId(null);
    setError("");
    setPostsCount(0);
    setReelsCount(0);
  };

  return (
    <section
      id="diagnostic"
      className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-brutal-black"
    >
      {/* Background Effects */}
      <div className="organic-glow" style={{ top: "30%", left: "60%" }} />
      <div className="mesh-gradient-1" />

      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto max-w-4xl relative z-10"
      >
        {/* Idle State - Input Form */}
        {step === "idle" && (
          <motion.div variants={fadeInUpSimple} className="text-center">
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px bg-concrete-border w-12" />
              <span className="code-text text-sm terminal-flicker">AI_DIAGNOSTIC</span>
              <div className="h-px bg-concrete-border w-12" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-brutal-white uppercase tracking-tighter mb-4">
              Descubra o que sua
              <br />
              <span className="text-matrix-green">marca já comunica</span>
            </h2>

            <p className="poetic-text text-lg md:text-xl text-brutal-white/70 mb-12 max-w-xl mx-auto">
              Nossa IA lê todo seu perfil do Instagram, incluindo seus Reels, e revela um
              diagnóstico completo de quem você é.
            </p>

            {/* Input Section */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-4">
              <div className="relative flex-1">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-concrete" />
                <input
                  type="text"
                  placeholder="seu_usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  className="w-full pl-12 pr-4 h-14 bg-concrete border-2 border-concrete-border text-brutal-white placeholder:text-concrete text-lg focus:border-matrix-green focus:outline-none transition-colors"
                />
              </div>
              <button onClick={handleAnalyze} className="btn-primary h-14 px-8">
                <span className="flex items-center gap-2">
                  Analisar
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </div>

            {error && <p className="text-fire-orange text-sm mb-4">{error}</p>}

            <p className="text-xs text-concrete">Seu perfil precisa ser público para a análise funcionar</p>
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
          <DiagnosisResultCard profile={profile} diagnosis={diagnosis} onReset={handleReset} />
        )}

        {/* Error State */}
        {step === "error" && (
          <motion.div variants={fadeInUpSimple} className="glass p-12 text-center">
            <p className="text-fire-orange text-lg mb-6">{error}</p>
            <button onClick={handleReset} className="btn-ghost">
              Tentar novamente
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Subtle grid */}
      <div className="brutal-grid absolute inset-0 opacity-5" />
    </section>
  );
};

export default InstagramDiagnosticSection;
