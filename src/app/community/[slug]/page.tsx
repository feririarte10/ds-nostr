"use client";
import { useNostrify } from "@/contexts/Nostrify";
import React, { useEffect, useState } from "react";
import { NDKEvent, NostrEvent } from "@nostr-dev-kit/ndk";
import CreateChannel from "@/components/channels/create";
import { useSubscription } from "@/hooks/useSubscription";
import Link from "next/link";

interface CommunityProps {
  name: string;
  desc: string;
  event: NostrEvent;
}

const Community = ({ params }: { params: { slug: string } }) => {
  const { ndk } = useNostrify();
  const [communityInfo, setCommunityInfo] = useState<CommunityProps>({
    name: "",
    desc: "",
    event: null,
  });

  const { events: channels } = useSubscription({
    filters: [
      {
        kinds: [40],
        authors: [communityInfo.event?.pubkey],
      },
    ],
    options: {
      closeOnEose: false,
    },
    enabled: Boolean(communityInfo.event?.pubkey),
  });

  useEffect(() => {
    if (!params.slug) return;

    if (ndk)
      ndk.fetchEvent({ ids: [params.slug] }).then(async (event: NDKEvent) => {
        if (event) {
          const nEvent: NostrEvent = await event.toNostrEvent();
          const commInfo = JSON.parse(nEvent.content);
          setCommunityInfo({ ...commInfo, event: nEvent });
        }
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ndk]);

  if (!communityInfo.event) return <span>Cargando...</span>;

  return (
    <div>
      <div>
        <h2>Nombre de la comunidad:</h2>
        <span>{communityInfo.name}</span>
      </div>

      <div>
        <h2>Descripción:</h2>
        <span>{communityInfo.desc}</span>
      </div>

      {channels.length > 0 ? (
        <>
          <h2>Canales encontrados: </h2>
          {channels.map((eventChannel, index) => {
            const parsedContent = JSON.parse(eventChannel.content);

            return (
              <div key={index}>
                <Link href={`/channel/${eventChannel.id}`}>
                  {parsedContent.name}
                </Link>
              </div>
            );
          })}
        </>
      ) : (
        <span>No hay canales de texto</span>
      )}

      <CreateChannel />
    </div>
  );
};

export default Community;
