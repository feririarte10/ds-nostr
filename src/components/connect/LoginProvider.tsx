"use client";
import { useNostrify } from "@/contexts/Nostrify";
import React from "react";
import ConnectWithKey from "./WithKey";
import ConnectWithExtension from "./WithExtension";

const LoginProvider = ({ children }) => {
  const { providers, userPubkey } = useNostrify();

  if (userPubkey.length > 0) return children;

  return (
    <>
      {providers.webln && <ConnectWithExtension />}
      <ConnectWithKey />
    </>
  );
};

export default LoginProvider;
