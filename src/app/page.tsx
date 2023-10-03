"use client";
import PublishCommunity from "@/components/community/publish";
import SelfComunnity from "@/components/community/selfcomunnity";
import { useNostrify } from "@/contexts/Nostrify";

export default function Home() {
  const { userPubkey } = useNostrify();

  return (
    <main>
      <p>Tu clave publica: {userPubkey}</p>

      <SelfComunnity pubkey={userPubkey} />

      <PublishCommunity />
    </main>
  );
}
