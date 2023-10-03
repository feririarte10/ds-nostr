"use client";
import { ModalProvider } from "@/contexts/ModalContext";
import React from "react";

const layout = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

export default layout;
