import { CategoriesInformation } from "@/hooks/useCommunity";
import React, { Dispatch, SetStateAction } from "react";
import { NostrEvent } from "@nostr-dev-kit/ndk";
import _ from "lodash";

const ChannelsList = ({
  categoriesInfo,
  setSelectedChannel,
}: {
  categoriesInfo: CategoriesInformation[];
  setSelectedChannel: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div>
      {_.size(categoriesInfo) > 0 ? (
        <ul>
          {_.map(categoriesInfo, (infoCategory: CategoriesInformation) => {
            const parsedContent = JSON.parse(infoCategory.category.content);

            return (
              <>
                <h3>{parsedContent.name}</h3>
                {infoCategory.channels.length > 0 ? (
                  infoCategory.channels.map((channel: NostrEvent) => {
                    const channelContent = JSON.parse(channel.content);

                    return (
                      <li key={channel.id} className="channel active">
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
  );
};

export default ChannelsList;
