//@ts-nocheck
"use client";
import { useNostrify } from "@/contexts/Nostrify";
import React, { useEffect, useRef } from "react";
import "@/styles/login.css";

const LoginProvider = ({ children }) => {
  const {
    createNostrAccount,
    connectWithExtension,
    connectWithKey,
    connectWithHexKey,
    userPubkey,
  } = useNostrify();
  const hexInputRef = useRef();

  useEffect(() => {
    const localPrivateKey: string = localStorage.getItem("private_key");
    if (localPrivateKey) connectWithHexKey(localPrivateKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userPubkey.length > 0) return children;

  return (
    <div className="container">
      <div className="loginBox">
        <h1>DS Nostr</h1>
        <button className="button" onClick={connectWithExtension}>
          Conectarse con extensión
        </button>

        <button className="button" onClick={createNostrAccount}>
          Crear nueva cuenta
        </button>

        <input
          type="text"
          ref={hexInputRef}
          id="privateKeyInput"
          placeholder="Pegar clave privada"
        />
        <button
          className="button"
          onClick={async () => {
            const connected = await connectWithKey(hexInputRef.current.value);

            if (!connected) alert("ocurrió un error");
          }}
        >
          Conectarse con clave privada
        </button>
      </div>
    </div>
  );
};

export default LoginProvider;
