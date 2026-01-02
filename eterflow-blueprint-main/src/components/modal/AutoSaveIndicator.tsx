
import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface AutoSaveIndicatorProps {
  isVisible: boolean;
  status: 'saving' | 'saved' | 'error';
  lastSaveTime?: Date | null;
}

const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ 
  isVisible, 
  status, 
  lastSaveTime 
}) => {
  if (!isVisible) return null;

  const getIcon = () => {
    switch (status) {
      case 'saving':
        return <Clock className="w-3 h-3 animate-spin" />;
      case 'saved':
        return <Check className="w-3 h-3" />;
      case 'error':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getMessage = () => {
    switch (status) {
      case 'saving':
        return 'Salvando...';
      case 'saved':
        return lastSaveTime 
          ? `Salvo ${lastSaveTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
          : 'Dados salvos';
      case 'error':
        return 'Erro ao salvar';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'saving':
        return 'text-blue-400';
      case 'saved':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    }`}>
      <div className="bg-black-900/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
        <div className={`flex items-center gap-2 text-xs ${getStatusColor()}`}>
          {getIcon()}
          <span>{getMessage()}</span>
        </div>
      </div>
    </div>
  );
};

export default AutoSaveIndicator;
