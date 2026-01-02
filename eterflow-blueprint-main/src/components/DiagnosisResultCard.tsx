import React from 'react';
import { User, Star, Target, Lightbulb, Lock, Video, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useCheckoutModal } from '@/contexts/CheckoutModalContext';

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
  const { openCheckoutModal } = useCheckoutModal();

  // Helper to clean any leftover markdown or instruction text
  const cleanText = (text: string | undefined): string => {
    if (!text) return '';
    return text
      .replace(/```json[\s\S]*?```/g, '')
      .replace(/Mantenha-se fiel[\s\S]*?conclusão\./gi, '')
      .replace(/^[\s\n]*/, '')
      .trim();
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header with Profile */}
      <div className="card-premium">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={profile.profilePicture || '/placeholder.svg'}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <div>
            <h3 className="text-xl font-bold text-foreground">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">
              {profile.followersCount.toLocaleString()} seguidores
            </p>
          </div>
        </div>

        {/* Quem você parece ser */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Quem você parece ser
          </h4>
          <p className="text-foreground text-lg">{cleanText(diagnosis.quem_voce_parece_ser)}</p>
        </div>

        {/* O que seu brand demonstra */}
        <div>
          <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            O que seu brand comunica
          </h4>
          <p className="text-muted-foreground">{cleanText(diagnosis.o_que_seu_brand_demonstra)}</p>
        </div>
      </div>

      {/* Características Fortes */}
      <div className="card-premium">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-emerald-400" />
          <h4 className="text-lg font-semibold text-foreground">Características Fortes</h4>
        </div>
        <div className="grid gap-3">
          {diagnosis.caracteristicas_fortes.map((caracteristica, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg glass"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 font-semibold text-sm">{index + 1}</span>
              </div>
              <span className="text-foreground">{caracteristica}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ponto Travado & Potencial */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-premium">
        <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-amber-400" />
            <h4 className="text-lg font-semibold text-foreground">Ponto Travado</h4>
          </div>
          <p className="text-muted-foreground">{cleanText(diagnosis.ponto_travado)}</p>
        </div>

        <div className="card-premium">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-emerald-400" />
            <h4 className="text-lg font-semibold text-foreground">Potencial Identificado</h4>
          </div>
          <p className="text-muted-foreground">{cleanText(diagnosis.potencial_identificado)}</p>
        </div>
      </div>

      {/* Insights dos Reels */}
      {diagnosis.insights_dos_reels && (
        <div className="card-premium">
          <div className="flex items-center gap-2 mb-4">
            <Video className="w-5 h-5 text-emerald-400" />
            <h4 className="text-lg font-semibold text-foreground">Insights dos Reels</h4>
          </div>
          
          <div className="grid gap-4">
            {diagnosis.insights_dos_reels.estilo_comunicacao && (
              <div>
                <p className="text-sm text-emerald-400 font-medium mb-1">Estilo de Comunicação</p>
                <p className="text-muted-foreground">{diagnosis.insights_dos_reels.estilo_comunicacao}</p>
              </div>
            )}
            
            {diagnosis.insights_dos_reels.presenca_visual && (
              <div>
                <p className="text-sm text-emerald-400 font-medium mb-1">Presença Visual</p>
                <p className="text-muted-foreground">{diagnosis.insights_dos_reels.presenca_visual}</p>
              </div>
            )}
            
            {diagnosis.insights_dos_reels.temas_recorrentes?.length > 0 && (
              <div>
                <p className="text-sm text-emerald-400 font-medium mb-2">Temas Recorrentes</p>
                <div className="flex flex-wrap gap-2">
                  {diagnosis.insights_dos_reels.temas_recorrentes.map((tema, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm glass text-foreground"
                    >
                      {tema}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="card-premium bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-center">
        <Target className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
        <h4 className="text-xl font-bold text-foreground mb-2">
          Quer destravar sua marca pessoal?
        </h4>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          No Workshop Negócio Solo 2.0 você vai construir um negócio de uma pessoa 
          só com IAs, criando posicionamento único e comunicação autêntica.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onReset}
            variant="outline"
            className="border-white/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Analisar outro perfil
          </Button>
          <Button
            onClick={openCheckoutModal}
            className="btn-premium"
          >
            <span className="flex items-center gap-2">
              Quero participar do Workshop
              <ArrowRight className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResultCard;
