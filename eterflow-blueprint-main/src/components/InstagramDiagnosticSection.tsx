import React, { useState } from 'react';
import { Instagram, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from '@/integrations/supabase/client';
import DiagnosisLoadingStates from './DiagnosisLoadingStates';
import DiagnosisResultCard from './DiagnosisResultCard';

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

type ProcessingStep = 'idle' | 'scraping' | 'profile_loaded' | 'initial_analysis' | 'full_analysis' | 'completed' | 'error';

const InstagramDiagnosticSection = () => {
  const [username, setUsername] = useState('');
  const [step, setStep] = useState<ProcessingStep>('idle');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [initialObservation, setInitialObservation] = useState('');
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [diagnosisId, setDiagnosisId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [postsCount, setPostsCount] = useState(0);
  const [reelsCount, setReelsCount] = useState(0);

  const handleAnalyze = async () => {
    if (!username.trim()) {
      setError('Digite seu @ do Instagram');
      return;
    }

    setError('');
    setStep('scraping');

    try {
      const { data: scrapeData, error: scrapeError } = await supabase.functions.invoke('scrape-instagram', {
        body: { username: username.trim() },
      });

      if (scrapeError || !scrapeData?.success) {
        throw new Error(scrapeData?.error || 'Erro ao buscar perfil');
      }

      setProfile(scrapeData.profile);
      setDiagnosisId(scrapeData.diagnosisId);
      setPostsCount(scrapeData.postsCount || 0);
      setReelsCount(scrapeData.reelsCount || 0);
      setStep('profile_loaded');

      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep('initial_analysis');

      const { data: initialData, error: initialError } = await supabase.functions.invoke('analyze-profile', {
        body: { diagnosisId: scrapeData.diagnosisId, analysisType: 'initial' },
      });

      if (initialError || !initialData?.success) {
        throw new Error(initialData?.error || 'Erro na análise inicial');
      }

      setInitialObservation(initialData.observation);

      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('full_analysis');

      const { data: fullData, error: fullError } = await supabase.functions.invoke('analyze-profile', {
        body: { diagnosisId: scrapeData.diagnosisId, analysisType: 'full' },
      });

      if (fullError || !fullData?.success) {
        throw new Error(fullData?.error || 'Erro no diagnóstico completo');
      }

      setDiagnosis(fullData.diagnosis);
      setStep('completed');

    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao analisar perfil');
      setStep('error');
    }
  };

  const handleReset = () => {
    setUsername('');
    setStep('idle');
    setProfile(null);
    setInitialObservation('');
    setDiagnosis(null);
    setDiagnosisId(null);
    setError('');
    setPostsCount(0);
    setReelsCount(0);
  };

  return (
    <section className="relative py-20 overflow-hidden section-dark">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          {step === 'idle' && (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-olive mb-6">
                <Sparkles className="w-4 h-4 text-olive" />
                <span className="text-sm text-olive font-mono uppercase tracking-wider">Experimente o poder da IA</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Descubra o que sua </span>
                <span className="text-olive">marca já comunica</span>
              </h2>

              <p className="text-lg text-neutral-400 mb-8 max-w-xl mx-auto">
                Nossa IA vai ler todo seu perfil do Instagram, incluindo seus Reels,
                e revelar um diagnóstico completo de quem você é.
              </p>

              {/* Input Section */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <Input
                    type="text"
                    placeholder="seu_usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                    className="pl-12 h-14 bg-neutral-100 border-2 border-neutral-200 text-lg text-white placeholder:text-neutral-500 focus:border-olive"
                  />
                </div>
                <Button
                  onClick={handleAnalyze}
                  className="h-14 px-8 btn-brutal"
                >
                  <span className="flex items-center gap-2">
                    Analisar meu perfil
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-4">{error}</p>
              )}

              <p className="text-xs text-neutral-600 mt-4 font-mono">
                Seu perfil precisa ser público para a análise funcionar
              </p>
            </>
          )}

          {/* Loading States */}
          {(step === 'scraping' || step === 'profile_loaded' || step === 'initial_analysis' || step === 'full_analysis') && (
            <DiagnosisLoadingStates
              step={step}
              profile={profile}
              initialObservation={initialObservation}
              postsCount={postsCount}
              reelsCount={reelsCount}
            />
          )}

          {/* Result */}
          {step === 'completed' && diagnosis && profile && (
            <DiagnosisResultCard
              profile={profile}
              diagnosis={diagnosis}
              onReset={handleReset}
            />
          )}

          {/* Error State */}
          {step === 'error' && (
            <div className="card-brutal text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={handleReset} className="btn-brutal-outline">
                Tentar novamente
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InstagramDiagnosticSection;
