"use client";
import { useNostrify } from "@/contexts/Nostrify";
import React, { useEffect, useState } from "react";
import { NDKEvent, NostrEvent } from "@nostr-dev-kit/ndk";
import CreateChannel from "@/components/channels/create";
import { useSubscription } from "@/hooks/useSubscription";
import Link from "next/link";
import CreateMessage from "@/components/channels/message/create";

interface ChannelProps {
  name: string;
  desc: string;
  event: NostrEvent;
}

const Community = ({ params }: { params: { slug: string } }) => {
  const { ndk } = useNostrify();
  const [channelInfo, setChannelInfo] = useState<ChannelProps>({
    name: "",
    desc: "",
    event: null,
  });

  const { events: messages } = useSubscription({
    filters: [
      {
        kinds: [42],
        "#e": [channelInfo.event?.id],
      },
    ],
    options: {
      closeOnEose: false,
    },
    enabled: Boolean(channelInfo.event?.id),
  });

  useEffect(() => {
    if (!params.slug) return;

    if (ndk)
      ndk.fetchEvent({ ids: [params.slug] }).then(async (event: NDKEvent) => {
        if (event) {
          const nEvent: NostrEvent = await event.toNostrEvent();
          const commInfo = JSON.parse(nEvent.content);
          setChannelInfo({ ...commInfo, event: nEvent });
        }
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ndk]);

  if (!channelInfo.event) return <span>Cargando...</span>;

  return (
    <div>
      <div>
        <h2>Nombre del canal:</h2>
        <span>{channelInfo.name}</span>
      </div>

      <div>
        <h2>Descripción:</h2>
        <span>{channelInfo.desc}</span>
      </div>

      {messages.length > 0 ? (
        <>
          <h2>Mensajes encontrados: </h2>
          {messages.map((eventMessage, index) => {
            const parsedContent = JSON.parse(eventMessage.content);

            return (
              <div key={index}>
                <span>Escrito por: {eventMessage.pubkey}</span>
                <br />
                Mensaje: {parsedContent}
              </div>
            );
          })}
        </>
      ) : (
        <span>No hay mensajes en este canal</span>
      )}

      <CreateMessage channelId={channelInfo.event?.id} />
    </div>
  );
};

export default Community;
