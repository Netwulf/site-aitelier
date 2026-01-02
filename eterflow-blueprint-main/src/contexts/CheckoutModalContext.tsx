import React, { createContext, useContext, ReactNode } from 'react';

const HOTMART_LINK = 'https://pay.hotmart.com/I103238627I?bid=1764713169588';

interface CheckoutModalContextType {
  isOpen: boolean;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;
}

const CheckoutModalContext = createContext<CheckoutModalContextType | undefined>(undefined);

export const useCheckoutModal = () => {
  const context = useContext(CheckoutModalContext);
  if (!context) {
    throw new Error('useCheckoutModal must be used within a CheckoutModalProvider');
  }
  return context;
};

interface CheckoutModalProviderProps {
  children: ReactNode;
}

export const CheckoutModalProvider: React.FC<CheckoutModalProviderProps> = ({ children }) => {
  // Redireciona diretamente para o Hotmart
  const openCheckoutModal = () => {
    window.open(HOTMART_LINK, '_blank');
  };

  const closeCheckoutModal = () => {};

  return (
    <CheckoutModalContext.Provider value={{ isOpen: false, openCheckoutModal, closeCheckoutModal }}>
      {children}
    </CheckoutModalContext.Provider>
  );
};
