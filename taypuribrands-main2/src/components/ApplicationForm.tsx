import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  User,
  Building,
  Target,
  DollarSign,
  Sparkles,
  Instagram,
} from "lucide-react";

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "@",
    company: "",
    role: "",
    industry: "",
    currentRevenue: "",
    goals: "",
    timeline: "",
    investment: "",
    motivation: "",
  });

  const totalSteps = 4;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (field === "instagram" && !value.startsWith("@")) {
      value = "@" + value;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      // TODO: Save form data to database when Supabase is connected
      console.log("Saving form data:", formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final form submission here
    console.log("Form submitted:", formData);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const stepIcons = [User, Building, Target, DollarSign];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-black-900 to-black-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-400/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-white leading-tight">
              APLICAÇÃO PAR <span className="text-gradient">Divergentes®</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Este processo é altamente seletivo. Apenas candidatos que demonstrarem potencial real de liderança serão
              aceitos.
            </p>

            {/* Exclusivity Badge */}
            <div className="inline-flex items-center glass px-6 py-3 rounded-full">
              <Sparkles className="w-4 h-4 text-gold-400 mr-2 animate-pulse" />
              <span className="text-gold-400 text-sm font-medium">9 vagas restantes</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className={`mb-12 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              {Array.from({ length: totalSteps }, (_, index) => {
                const StepIcon = stepIcons[index];
                const isActive = currentStep === index + 1;
                const isCompleted = currentStep > index + 1;

                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-gold-500 to-gold-600 scale-110 glow-gold"
                          : isCompleted
                            ? "bg-gradient-to-br from-green-500 to-green-600"
                            : "bg-white/10"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <StepIcon className={`w-6 h-6 ${isActive ? "text-black" : "text-white/70"}`} />
                      )}
                    </div>
                    <span
                      className={`text-sm mt-2 transition-colors duration-300 ${
                        isActive ? "text-gold-400" : isCompleted ? "text-green-400" : "text-white/50"
                      }`}
                    >
                      Etapa {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress Line */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-700 ease-out glow-gold"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <div
            className={`card-premium transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6">Informações Pessoais</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">WhatsApp *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">Instagram *</label>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          type="text"
                          value={formData.instagram}
                          onChange={(e) => handleInputChange("instagram", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                          placeholder="@seuinstagram"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Info */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6">Informações Profissionais</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">Empresa/Negócio *</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                        placeholder="Nome da sua empresa"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-white/80 text-sm font-medium mb-2">Cargo/Função *</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                        placeholder="CEO, Fundador, Especialista..."
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-white/80 text-sm font-medium mb-2">Segmento/Indústria *</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange("industry", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                    >
                      <option value="">Selecione seu segmento</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="consultoria">Consultoria</option>
                      <option value="marketing">Marketing</option>
                      <option value="financas">Finanças</option>
                      <option value="saude">Saúde</option>
                      <option value="educacao">Educação</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Goals & Vision */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6">Objetivos e Visão</h3>

                  <div className="relative">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Principais objetivos com sua marca pessoal *
                    </label>
                    <textarea
                      value={formData.goals}
                      onChange={(e) => handleInputChange("goals", e.target.value)}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                      placeholder="Descreva onde você quer chegar com sua marca pessoal..."
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Prazo para alcançar esses objetivos *
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                    >
                      <option value="">Selecione o prazo</option>
                      <option value="6meses">6 meses</option>
                      <option value="1ano">1 ano</option>
                      <option value="2anos">2 anos</option>
                      <option value="3anos+">3+ anos</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Investment & Commitment */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-6">Investimento e Comprometimento</h3>

                  <div className="relative">
                    <label className="block text-white/80 text-sm font-medium mb-2">Faturamento atual mensal *</label>
                    <select
                      value={formData.currentRevenue}
                      onChange={(e) => handleInputChange("currentRevenue", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                    >
                      <option value="">Selecione sua faixa de faturamento</option>
                      <option value="50k-100k">R$ 50K - R$ 100K</option>
                      <option value="100k-300k">R$ 100K - R$ 300K</option>
                      <option value="300k-500k">R$ 300K - R$ 500K</option>
                      <option value="500k+">R$ 500K+</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Por que você deveria ser um dos 12 escolhidos? *
                    </label>
                    <textarea
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      placeholder="Conte sua história, seus diferenciais e por que você está pronto para construir seu One Person Brand..."
                    />
                  </div>

                  {/* Investment Info */}
                  <div className="card-premium bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border-emerald-500/20">
                    <h4 className="text-xl font-bold text-white mb-4">Investimento</h4>
                    <div className="text-3xl font-black text-gradient mb-2">R$ 97.000</div>
                    <div className="text-white/80 mb-4">12x de R$ 8.083 sem juros</div>
                    <div className="text-sm text-emerald-400">
                      ✓ Inclui Brand OS™ completo
                      <br />
                      ✓ Mentoria pessoal com Taynã Puri
                      <br />
                      ✓ Entregáveis completos
                      <br />✓ 90 dias de transformação
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps ? (
                  <button type="button" onClick={nextStep} className="btn-premium group">
                    <span className="flex items-center">
                      Próximo
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                ) : (
                  <button type="submit" className="btn-premium text-lg group glow-gold-strong">
                    <span className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      ENVIAR APLICAÇÃO
                    </span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Trust Indicators */}
          <div
            className={`text-center mt-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex justify-center items-center space-x-8 text-white/60">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm">Processo Seletivo</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm">Resposta em 48h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
