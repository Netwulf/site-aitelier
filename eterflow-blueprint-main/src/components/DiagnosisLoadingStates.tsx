import React from 'react';
import { Loader2, User, Sparkles, Video, FileText } from 'lucide-react';

interface ProfileData {
  name: string;
  bio: string;
  profilePicture: string;
  followersCount: number;
}

interface DiagnosisLoadingStatesProps {
  step: 'scraping' | 'profile_loaded' | 'initial_analysis' | 'full_analysis';
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
    <div className="card-premium py-12">
      {/* Scraping State */}
      {step === 'scraping' && (
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-20 h-20 rounded-full glass-strong flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
          </div>
          <p className="text-lg text-foreground">Conectando com seu perfil...</p>
          <p className="text-sm text-muted-foreground">Isso pode levar alguns segundos</p>
        </div>
      )}

      {/* Profile Loaded State */}
      {step === 'profile_loaded' && profile && (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={profile.profilePicture || '/placeholder.svg'}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-emerald-400/50 animate-pulse"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground">Olá, {profile.name}!</h3>
            <p className="text-muted-foreground mt-1">Estamos descobrindo tudo sobre você...</p>
          </div>

          <div className="flex gap-6 mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>{postsCount} posts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>{reelsCount} reels</span>
            </div>
          </div>
        </div>
      )}

      {/* Initial Analysis State */}
      {step === 'initial_analysis' && profile && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <img
              src={profile.profilePicture || '/placeholder.svg'}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-emerald-400"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>

          <div className="text-center max-w-md">
            <h3 className="text-xl font-bold text-foreground mb-2">{profile.name}</h3>
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Analisando sua bio e conteúdo...</span>
            </div>
          </div>
        </div>
      )}

      {/* Full Analysis State */}
      {step === 'full_analysis' && profile && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <img
              src={profile.profilePicture || '/placeholder.svg'}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-emerald-400"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>

          <div className="text-center max-w-md">
            <h3 className="text-xl font-bold text-foreground mb-3">{profile.name}</h3>
            
            {initialObservation && (
              <div className="glass-strong rounded-xl p-4 mb-4">
                <p className="text-foreground italic">"{initialObservation}"</p>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">
                Analisando {postsCount} posts e {reelsCount} reels...
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              Gerando seu diagnóstico completo de marca pessoal
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisLoadingStates;
