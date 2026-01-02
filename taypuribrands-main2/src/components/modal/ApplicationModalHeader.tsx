
import React from 'react';
import { CheckCircle, User, Building, Target, DollarSign } from 'lucide-react';

interface ApplicationModalHeaderProps {
  currentStep: number;
}

const ApplicationModalHeader: React.FC<ApplicationModalHeaderProps> = ({ currentStep }) => {
  const stepIcons = [User, Building, Target, DollarSign];
  const progressPercentage = currentStep === 0 ? 0 : currentStep >= 5 ? 100 : ((currentStep) / 4) * 100;

  if (currentStep === 0 || currentStep === 5) {
    return null;
  }

  return (
    <div className="px-2 sm:px-4 md:px-6 pt-2 sm:pt-4 pb-2 sm:pb-3 shrink-0">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        {Array.from({ length: 4 }, (_, index) => {
          const StepIcon = stepIcons[index];
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${
                isActive 
                  ? 'bg-gradient-to-br from-gold-500 to-gold-600 scale-110 glow-gold' 
                  : isCompleted 
                    ? 'bg-gradient-to-br from-green-500 to-green-600' 
                    : 'bg-white/10'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                ) : (
                  <StepIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${isActive ? 'text-black' : 'text-white/70'}`} />
                )}
              </div>
              <span className={`text-[10px] sm:text-xs mt-1 transition-colors duration-300 ${
                isActive ? 'text-gold-400' : isCompleted ? 'text-green-400' : 'text-white/50'
              }`}>
                {index + 1}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="relative h-0.5 sm:h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-700 ease-out glow-gold"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ApplicationModalHeader;
