//@ts-nocheck
"use client";
import { useNostrify } from "@/contexts/Nostrify";
import React, { useRef } from "react";
import "@/styles/login.css";

const LoginProvider = ({ children }) => {
  const { connectWithExtension, connectWithHexKey, userPubkey } = useNostrify();
  const hexInputRef = useRef();

  if (userPubkey.length > 0) return children;

  return (
    <div className="container">
      <div className="loginBox">
        <h1>DS Nostr</h1>
        <button className="button" onClick={connectWithExtension}>
          Conectarse con extensión
        </button>

        <button className="button">Crear una cuenta</button>
        <input
          type="text"
          ref={hexInputRef}
          id="privateKeyInput"
          placeholder="Pegar clave privada"
        />
        <button
          className="button"
          onClick={async () => {
            const connected = await connectWithHexKey(
              hexInputRef.current.value
            );

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
