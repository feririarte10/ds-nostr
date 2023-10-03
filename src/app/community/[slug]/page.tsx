"use client";
import CreateCategory from "@/components/category/create";
import CreateChannel from "@/components/channels/create";
import ChannelFrame from "@/components/channels/frame";
import { useNostrify } from "@/contexts/Nostrify";
import useCommunity from "@/hooks/useCommunity";
import "@/styles/community.css";
import _ from "lodash";

const Community = ({ params }: { params: { slug: string } }) => {
  const { userPubkey } = useNostrify();
  const { communityInfo, categoriesInfo, selectedChannel, setSelectedChannel } =
    useCommunity(params.slug);

  if (!communityInfo.event) return <span>Cargando...</span>;

  console.log(categoriesInfo);

  return (
    <div>
      <aside className="sidebar">
        <h1>{communityInfo.name}</h1>

        <div>
          {/* <h3>Canales de texto: </h3> */}
          {_.size(categoriesInfo) > 0 ? (
            <ul>
              {_.map(categoriesInfo, (infoCategory, index) => {
                const parsedContent = JSON.parse(infoCategory.category.content);

                return (
                  <>
                    <h3>{parsedContent.name}</h3>
                    {infoCategory.channels.length > 0 ? (
                      infoCategory.channels.map((channel) => {
                        const channelContent = JSON.parse(channel.content);

                        return (
                          <li key={index} className="channel active">
                            <button
                              style={{ marginBottom: "5px" }}
                              onClick={() => setSelectedChannel(channel.id)}
                            >
                              # {channelContent.name}
                            </button>
                          </li>
                        );
                      })
                    ) : (
                      <span>No hay canales de texto</span>
                    )}
                  </>
                );
              })}
            </ul>
          ) : (
            <span>No hay nada para ver</span>
          )}
        </div>

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
