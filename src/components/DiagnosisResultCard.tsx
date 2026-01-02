import { motion } from "framer-motion";
import { Star, Target, Lightbulb, Lock, Video, RotateCcw } from "lucide-react";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";

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

interface DiagnosisResultCardProps {
  profile: ProfileData;
  diagnosis: DiagnosisResult;
  onReset: () => void;
}

const DiagnosisResultCard = ({ profile, diagnosis, onReset }: DiagnosisResultCardProps) => {
  // Helper to clean any leftover markdown or instruction text
  const cleanText = (text: string | undefined): string => {
    if (!text) return "";
    return text
      .replace(/```json[\s\S]*?```/g, "")
      .replace(/Mantenha-se fiel[\s\S]*?conclusão\./gi, "")
      .replace(/^[\s\n]*/, "")
      .trim();
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-6 text-left"
    >
      {/* Header with Profile */}
      <motion.div variants={fadeInUpSimple} className="glass p-8">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={profile.profilePicture || "/placeholder.svg"}
            alt={profile.name}
            className="w-16 h-16 object-cover border-2 border-matrix-green"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          <div>
            <h3 className="text-xl font-bold text-brutal-white uppercase tracking-tight">
              {profile.name}
            </h3>
            <p className="code-text text-sm">
              {profile.followersCount.toLocaleString()} seguidores
            </p>
          </div>
        </div>

        {/* Quem você parece ser */}
        <div className="mb-8 border-l-2 border-matrix-green pl-6">
          <h4 className="code-text text-xs mb-3 uppercase tracking-widest">
            QUEM_VOCÊ_PARECE_SER
          </h4>
          <p className="text-brutal-white text-lg leading-relaxed">
            {cleanText(diagnosis.quem_voce_parece_ser)}
          </p>
        </div>

        {/* O que seu brand demonstra */}
        <div className="border-l-2 border-brutal-white/30 pl-6">
          <h4 className="code-text text-xs mb-3 uppercase tracking-widest text-brutal-white/60">
            O_QUE_SEU_BRAND_COMUNICA
          </h4>
          <p className="text-concrete leading-relaxed">
            {cleanText(diagnosis.o_que_seu_brand_demonstra)}
          </p>
        </div>
      </motion.div>

      {/* Características Fortes */}
      <motion.div variants={fadeInUpSimple} className="glass p-8">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-5 h-5 text-matrix-green" />
          <h4 className="text-lg font-bold text-brutal-white uppercase tracking-tight">
            Características Fortes
          </h4>
        </div>
        <div className="grid gap-3">
          {diagnosis.caracteristicas_fortes.map((caracteristica, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 glass-subtle border-l-2 border-matrix-green"
            >
              <div className="w-8 h-8 bg-matrix-green/20 border border-matrix-green flex items-center justify-center flex-shrink-0">
                <span className="code-text text-sm">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <span className="text-brutal-white">{caracteristica}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Ponto Travado & Potencial */}
      <motion.div variants={fadeInUpSimple} className="grid md:grid-cols-2 gap-6">
        <div className="glass p-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-fire-orange" />
            <h4 className="text-lg font-bold text-brutal-white uppercase tracking-tight">
              Ponto Travado
            </h4>
          </div>
          <p className="text-concrete leading-relaxed">{cleanText(diagnosis.ponto_travado)}</p>
        </div>

        <div className="glass p-8">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-matrix-green" />
            <h4 className="text-lg font-bold text-brutal-white uppercase tracking-tight">
              Potencial Identificado
            </h4>
          </div>
          <p className="text-concrete leading-relaxed">
            {cleanText(diagnosis.potencial_identificado)}
          </p>
        </div>
      </motion.div>

      {/* Insights dos Reels */}
      {diagnosis.insights_dos_reels && (
        <motion.div variants={fadeInUpSimple} className="glass p-8">
          <div className="flex items-center gap-3 mb-6">
            <Video className="w-5 h-5 text-matrix-green" />
            <h4 className="text-lg font-bold text-brutal-white uppercase tracking-tight">
              Insights dos Reels
            </h4>
          </div>

          <div className="grid gap-6">
            {diagnosis.insights_dos_reels.estilo_comunicacao && (
              <div className="border-l-2 border-matrix-green/50 pl-6">
                <p className="code-text text-xs mb-2 uppercase tracking-widest">
                  ESTILO_DE_COMUNICAÇÃO
                </p>
                <p className="text-concrete">{diagnosis.insights_dos_reels.estilo_comunicacao}</p>
              </div>
            )}

            {diagnosis.insights_dos_reels.presenca_visual && (
              <div className="border-l-2 border-matrix-green/50 pl-6">
                <p className="code-text text-xs mb-2 uppercase tracking-widest">PRESENÇA_VISUAL</p>
                <p className="text-concrete">{diagnosis.insights_dos_reels.presenca_visual}</p>
              </div>
            )}

            {diagnosis.insights_dos_reels.temas_recorrentes?.length > 0 && (
              <div className="border-l-2 border-matrix-green/50 pl-6">
                <p className="code-text text-xs mb-3 uppercase tracking-widest">
                  TEMAS_RECORRENTES
                </p>
                <div className="flex flex-wrap gap-2">
                  {diagnosis.insights_dos_reels.temas_recorrentes.map((tema, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 border border-matrix-green/50 text-sm text-brutal-white"
                    >
                      {tema}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* CTA - Institucional */}
      <motion.div variants={fadeInUpSimple} className="glass p-8 text-center">
        <Target className="w-10 h-10 text-matrix-green mx-auto mb-4" />
        <h4 className="text-xl font-bold text-brutal-white uppercase tracking-tight mb-2">
          Quer dar o próximo passo?
        </h4>
        <p className="text-concrete mb-8 max-w-md mx-auto">
          Trabalhamos com pessoas que têm densidade interna mas ainda não sabem se expressar
          publicamente. Vamos conversar?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onReset} className="btn-ghost">
            <span className="flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Analisar outro perfil
            </span>
          </button>
          <a href="/contact" className="btn-primary">
            <span>Iniciar conversa</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DiagnosisResultCard;
