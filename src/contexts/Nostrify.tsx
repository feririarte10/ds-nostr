"use client";
import NostrExtensionProvider from "@/types/nostr";
import NDK, {
  NDKNip07Signer,
  NDKPrivateKeySigner,
  NDKUser,
} from "@nostr-dev-kit/ndk";
import type { WebLNProvider as WebLNExtensionProvider } from "@webbtc/webln-types";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { nip06, nip19 } from "nostr-tools";

declare global {
  interface Window {
    nostr: NostrExtensionProvider;
  }
}

type LightningProvidersType = {
  webln: WebLNExtensionProvider | undefined;
  nostr: NostrExtensionProvider | undefined;
};

export interface INostrContext {
  providers: LightningProvidersType;
  ndk: NDK;
  createNostrAccount: () => void;
  connectWithExtension: () => void;
  connectWithKey: (privateKey: string) => Promise<boolean>;
  connectWithHexKey: (hexKey: string) => Promise<boolean>;
  requestPublicKey: () => Promise<string>;
  userPubkey: string;
}

const nostrContext: React.Context<any> = createContext(null);

const useNOSTR = (explicitRelayUrls: string[]): INostrContext => {
  const [ndk, setNDK] = useState<NDK>(null);

  const [providers, setProviders] = useState<LightningProvidersType>({
    webln: undefined,
    nostr: undefined,
  });

  const [userPubkey, setUserPubkey] = useState<string>("");

  const loadProviders = React.useCallback(async () => {
    setProviders({
      webln: window.webln,
      nostr: window.nostr,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeNDK = async (
    signer: NDKNip07Signer | NDKPrivateKeySigner
  ) => {
    try {
      const ndkProvider = new NDK({
        explicitRelayUrls,
        signer,
      });

      setNDK(ndkProvider);

      ndkProvider.connect();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const createNostrAccount = () => {
    const privateKey = nip06.privateKeyFromSeedWords(nip06.generateSeedWords());
    connectWithHexKey(privateKey);
  };

  const connectWithKey = async (privateKey: string) => {
    if (privateKey.substring(0, 4) !== "nsec")
      return connectWithKey(privateKey);

    const { type, data } = nip19.decode(privateKey);
    if (type !== "nsec") return null;

    return connectWithHexKey(data);
  };

  const connectWithHexKey = async (hexKey: string): Promise<boolean> => {
    try {
      const privateKeySigner = new NDKPrivateKeySigner(hexKey);
      const ndkInitialized: boolean = await initializeNDK(privateKeySigner);

      const user: NDKUser = await privateKeySigner.user();
      if (user && user._hexpubkey) setUserPubkey(user._hexpubkey);

      localStorage.setItem("private_key", hexKey);
      return ndkInitialized;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const connectWithExtension = async () => {
    if (!providers.webln)
      return alert("No tienes una extensión que te permita conectarte");
    await providers.webln.enable();

    const pubKey = await requestPublicKey();
    if (pubKey) setUserPubkey(pubKey);
  };

  const requestPublicKey = async () => {
    if (!providers.nostr) return null;

    try {
      await providers.nostr.enable();
      const _pubKey = await providers.nostr.getPublicKey();
      return _pubKey;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    loadProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    providers,
    ndk,
    createNostrAccount,
    connectWithExtension,
    connectWithKey,
    connectWithHexKey,
    userPubkey,
    requestPublicKey,
  };
};

export function NostrifyProvider({
  children,
  explicitRelayUrls,
}: {
  children: ReactNode;
  explicitRelayUrls: string[];
}) {
  const nostrProvider: any = useNOSTR(explicitRelayUrls);

  return (
    <nostrContext.Provider value={nostrProvider}>
      {children}
    </nostrContext.Provider>
  );
}

export const useNostrify = () => {
  const context: INostrContext = useContext(nostrContext);

  if (!context) {
    throw new Error("useNostrify debe ser utilizado dentro de nostrProvider");
  }

  return context;
};
