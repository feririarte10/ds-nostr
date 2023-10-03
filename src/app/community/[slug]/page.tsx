"use client";
import CreateCategory from "@/components/category/create";
import CreateChannel from "@/components/channels/create";
import ChannelFrame from "@/components/channels/frame";
import ChannelsList from "@/components/channels/list";
import { useNostrify } from "@/contexts/Nostrify";
import useCommunity from "@/hooks/useCommunity";
import "@/styles/community.css";
import _ from "lodash";

const Community = ({ params }: { params: { slug: string } }) => {
  const { userPubkey } = useNostrify();
  const { communityInfo, categoriesInfo, selectedChannel, setSelectedChannel } =
    useCommunity(params.slug);

  if (!communityInfo.event) return <span>Cargando...</span>;

  return (
    <div>
      <aside className="sidebar">
        <h1>{communityInfo.name}</h1>

        <ChannelsList
          categoriesInfo={categoriesInfo}
          setSelectedChannel={setSelectedChannel}
        />

        {communityInfo.event?.pubkey === userPubkey && (
          <>
            <CreateCategory communityId={communityInfo.event.id} />
            <CreateChannel
              communityId={communityInfo.event.id}
              categoryId="1"
            />
          </>
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
