
import React, { createContext, useContext, useState } from 'react';

interface ApplicationModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ApplicationModalContext = createContext<ApplicationModalContextType | undefined>(undefined);

export const useApplicationModal = () => {
  const context = useContext(ApplicationModalContext);
  if (context === undefined) {
    throw new Error('useApplicationModal must be used within an ApplicationModalProvider');
  }
  return context;
};

export const ApplicationModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log('Opening application modal');
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log('Closing application modal');
    setIsOpen(false);
  };

  return (
    <ApplicationModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ApplicationModalContext.Provider>
  );
};
