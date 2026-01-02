
import React from 'react';

interface ChallengesStepProps {
  formData: {
    principais_desafios: string;
    cronograma: string;
  };
  errors: { [key: string]: string };
  onInputChange: (field: string, value: string) => void;
  getFieldClassName: (field: string, baseClassName: string) => string;
  getFieldError: (field: string) => string;
}

const ChallengesStep: React.FC<ChallengesStepProps> = ({
  formData,
  errors,
  onInputChange,
  getFieldClassName,
  getFieldError
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="relative">
        <label className="block text-white/80 text-sm font-medium mb-2">Principais desafios da sua marca pessoal *</label>
        <textarea
          value={formData.principais_desafios}
          onChange={(e) => onInputChange('principais_desafios', e.target.value)}
          rows={3}
          className={getFieldClassName('principais_desafios', "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-white/50 transition-all duration-300 resize-none text-base sm:text-sm")}
          placeholder="Descreva os principais desafios que enfrenta..."
        />
        {getFieldError('principais_desafios') && (
          <p className="text-red-400 text-xs mt-1">{getFieldError('principais_desafios')}</p>
        )}
      </div>
      
      <div className="relative">
        <label className="block text-white/80 text-sm font-medium mb-2">Cronograma para alcançar objetivos *</label>
        <select
          value={formData.cronograma}
          onChange={(e) => onInputChange('cronograma', e.target.value)}
          className={getFieldClassName('cronograma', "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white transition-all duration-300 text-base sm:text-sm")}
        >
          <option value="">Selecione o cronograma</option>
          <option value="6meses">6 meses</option>
          <option value="1ano">1 ano</option>
          <option value="2anos">2 anos</option>
          <option value="3anos+">3+ anos</option>
        </select>
        {getFieldError('cronograma') && (
          <p className="text-red-400 text-xs mt-1">{getFieldError('cronograma')}</p>
        )}
      </div>
    </div>
  );
};

export default ChallengesStep;
