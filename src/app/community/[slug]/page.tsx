"use client";
import { useNostrify } from "@/contexts/Nostrify";
import React, { useEffect, useState } from "react";
import { NDKEvent, NostrEvent } from "@nostr-dev-kit/ndk";
import CreateChannel from "@/components/channels/create";
import { useSubscription } from "@/hooks/useSubscription";
import ChannelFrame from "@/components/channels/frame";
import "@/styles/community.css";

interface CommunityProps {
  name: string;
  desc: string;
  event: NostrEvent;
}

const Community = ({ params }: { params: { slug: string } }) => {
  const { ndk, userPubkey } = useNostrify();
  const [communityInfo, setCommunityInfo] = useState<CommunityProps>({
    name: "",
    desc: "",
    event: null,
  });

  const [selectedChannel, setSelectedChannel] = useState<string>("");

  const { events: channels } = useSubscription({
    filters: [
      {
        kinds: [40],
        authors: [communityInfo.event?.pubkey],
        "#e": [communityInfo.event?.id],
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
      <aside className="sidebar">
        <h2>{communityInfo.name}</h2>

        <div>
          <h3>Canales de texto: </h3>
          {channels.length > 0 ? (
            <ul>
              {channels.map((eventChannel, index) => {
                const parsedContent = JSON.parse(eventChannel.content);

                return (
                  <li key={index} className="channel active">
                    <button
                      style={{ marginBottom: "5px" }}
                      onClick={() => setSelectedChannel(eventChannel.id)}
                    >
                      # {parsedContent.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span>No hay canales de texto</span>
          )}
        </div>

        {communityInfo.event?.pubkey === userPubkey && (
          <CreateChannel communityId={communityInfo.event.id} />
        )}
      </aside>

      {selectedChannel.length > 0 ? (
        <ChannelFrame channelId={selectedChannel} />
      ) : (
        <div className="content">
          <span>No has seleccionado ningún canal de texto</span>
        </div>
      )}
    </div>
  );
};

export default Community;
