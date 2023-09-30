"use client";
import { useNostrify } from "@/contexts/Nostrify";
import React, { useEffect, useState } from "react";
import { NDKEvent, NostrEvent } from "@nostr-dev-kit/ndk";
import { useSubscription } from "@/hooks/useSubscription";
import CreateMessage from "@/components/channels/message/create";
import MessagesList from "./message/list";

interface ChannelProps {
  name: string;
  desc: string;
  event: NostrEvent;
}

const ChannelFrame = ({ channelId }: { channelId: string }) => {
  const { ndk } = useNostrify();
  const [channelInfo, setChannelInfo] = useState<ChannelProps>({
    name: "",
    desc: "",
    event: null,
  });

  useEffect(() => {
    if (!channelId) return;

    if (ndk)
      ndk.fetchEvent({ ids: [channelId] }).then(async (event: NDKEvent) => {
        if (event) {
          const nEvent: NostrEvent = await event.toNostrEvent();
          const commInfo = JSON.parse(nEvent.content);
          setChannelInfo({ ...commInfo, event: nEvent });
        }
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  if (!channelInfo.event) return <span>No has seleccionado ningún canal</span>;

  return (
    <div style={{ border: "1px solid", padding: "10px", margin: "1rem" }}>
      <div>
        <h2>Nombre del canal:</h2>
        <span>{channelInfo.name}</span>
      </div>

      <div>
        <h2>Descripción:</h2>
        <span>{channelInfo.desc}</span>
      </div>

      <MessagesList channelId={channelInfo.event?.id} />

      <CreateMessage channelId={channelInfo.event?.id} />
    </div>
  );
};

export default ChannelFrame;
