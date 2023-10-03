"use client";
import { ModalProps } from "@/components/modals/Modal";
import React, { ReactNode, createContext, useContext, useState } from "react";

export interface IModalContext {
  modalInfo: ModalProps;
  setModalProps: (modalProps: Partial<ModalProps>) => void;
  closeModal: () => void;
}

const modalContext: React.Context<any> = createContext(null);

const useModal = (): IModalContext => {
  const [modalInfo, setModalInfo] = useState<ModalProps>({
    title: "",
    description: "",
    onClick: null,
    closeModal: null,
    isOpen: false,
    acceptButton: false,
    cancelButton: false,
    closeButton: false,
    loading: false,
    icon: null,
    children: null,
  });

  const setModalProps = (modalProps: Partial<ModalProps>) => {
    setModalInfo({
      ...modalInfo,
      ...modalProps,
    });
  };

  const closeModal = () => {
    setModalInfo({
      ...modalInfo,
      isOpen: false,
    });
  };

  return {
    modalInfo,
    setModalProps,
    closeModal,
  };
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const modalProvider: any = useModal();

  return (
    <modalContext.Provider value={modalProvider}>
      {children}
    </modalContext.Provider>
  );
}

export const useModalContext = () => {
  const context: IModalContext = useContext(modalContext);

  if (!context) {
    throw new Error(
      "useModalContext debe ser utilizado dentro de modalProvider"
    );
  }

  return context;
};
