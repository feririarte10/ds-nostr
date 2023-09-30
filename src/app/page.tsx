"use client";
import PublishCommunity from "@/components/community/publish";
import SelfComunnity from "@/components/community/selfcomunnity";
import ConnectWithExtension from "@/components/connect/WithExtension";
import ConnectWithKey from "@/components/connect/WithKey";
import { useNostrify } from "@/contexts/Nostrify";

export default function Home() {
  const { providers, userPubkey } = useNostrify();

  return (
    <main>
      {!userPubkey ? (
        <>
          {providers.webln && <ConnectWithExtension />}
          <ConnectWithKey />
        </>
      ) : (
        <>
          <p>Tu clave publica: {userPubkey}</p>

          <SelfComunnity pubkey={userPubkey} />
          <PublishCommunity />
        </>
      )}
    </main>
  );
}
