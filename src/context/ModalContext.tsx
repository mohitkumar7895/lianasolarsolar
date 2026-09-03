'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isQuoteModalOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
  isCallQueryOpen: boolean;
  openCallQueryModal: () => void;
  closeCallQueryModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCallQueryOpen, setIsCallQueryOpen] = useState(false);

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  const openCallQueryModal = () => setIsCallQueryOpen(true);
  const closeCallQueryModal = () => setIsCallQueryOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        isCallQueryOpen,
        openCallQueryModal,
        closeCallQueryModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
