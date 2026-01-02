import { motion } from "framer-motion";
import { Loader2, Sparkles, Video, FileText } from "lucide-react";
import { fadeInUpSimple } from "@/utils/motionVariants";

interface ProfileData {
  name: string;
  bio: string;
  profilePicture: string;
  followersCount: number;
}

interface DiagnosisLoadingStatesProps {
  step: "scraping" | "profile_loaded" | "initial_analysis" | "full_analysis";
  profile: ProfileData | null;
  initialObservation: string;
  postsCount: number;
  reelsCount: number;
}

const DiagnosisLoadingStates = ({
  step,
  profile,
  initialObservation,
  postsCount,
  reelsCount,
}: DiagnosisLoadingStatesProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUpSimple}
      className="glass p-8 md:p-12"
    >
      {/* Scraping State */}
      {step === "scraping" && (
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 border-2 border-matrix-green flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-matrix-green animate-spin" />
          </div>
          <div className="text-center">
            <p className="code-text text-sm mb-2">&gt; SCANNING_PROFILE...</p>
            <p className="text-brutal-white text-lg">Conectando com seu perfil...</p>
            <p className="text-concrete text-sm mt-2">Isso pode levar alguns segundos</p>
          </div>
        </div>
      )}

      {/* Profile Loaded State */}
      {step === "profile_loaded" && profile && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <img
              src={profile.profilePicture || "/placeholder.svg"}
              alt={profile.name}
              className="w-24 h-24 object-cover border-2 border-matrix-green"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-matrix-green flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brutal-black" />
            </div>
          </div>

          <div className="text-center">
            <p className="code-text text-sm mb-2">&gt; PROFILE_FOUND</p>
            <h3 className="text-2xl font-bold text-brutal-white uppercase tracking-tight">
              Olá, {profile.name}!
            </h3>
            <p className="text-concrete mt-2">Estamos descobrindo tudo sobre você...</p>
          </div>

          <div className="flex gap-8 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-matrix-green" />
              <span className="code-text">{postsCount} posts</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Video className="w-4 h-4 text-matrix-green" />
              <span className="code-text">{reelsCount} reels</span>
            </div>
          </div>
        </div>
      )}

      {/* Initial Analysis State */}
      {step === "initial_analysis" && profile && (
        <div className="flex flex-col items-center gap-6">
          <img
            src={profile.profilePicture || "/placeholder.svg"}
            alt={profile.name}
            className="w-24 h-24 object-cover border-2 border-matrix-green"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />

          <div className="text-center max-w-md">
            <h3 className="text-xl font-bold text-brutal-white uppercase mb-3">
              {profile.name}
            </h3>
            <div className="flex items-center justify-center gap-2 text-matrix-green">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="code-text text-sm">ANALYZING_BIO_AND_CONTENT...</span>
            </div>
          </div>
        </div>
      )}

      {/* Full Analysis State */}
      {step === "full_analysis" && profile && (
        <div className="flex flex-col items-center gap-6">
          <img
            src={profile.profilePicture || "/placeholder.svg"}
            alt={profile.name}
            className="w-24 h-24 object-cover border-2 border-matrix-green"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />

          <div className="text-center max-w-md">
            <h3 className="text-xl font-bold text-brutal-white uppercase mb-4">
              {profile.name}
            </h3>

            {initialObservation && (
              <div className="glass-subtle p-4 mb-4 border-l-2 border-matrix-green">
                <p className="poetic-text text-brutal-white/90">"{initialObservation}"</p>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-matrix-green">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="code-text text-sm">
                PROCESSING_{postsCount}_POSTS_AND_{reelsCount}_REELS...
              </span>
            </div>

            <p className="text-xs text-concrete mt-3">
              Gerando seu diagnóstico completo de marca pessoal
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DiagnosisLoadingStates;
