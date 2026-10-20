"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface EnquiryContextType {
  isOpen: boolean;
  selectedService: string;
  openEnquiry: (service?: string) => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("General Enquiry");

  const openEnquiry = useCallback((service?: string) => {
    if (service) {
      setSelectedService(service);
    }
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <EnquiryContext.Provider
      value={{
        isOpen,
        selectedService,
        openEnquiry,
        closeEnquiry,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}
