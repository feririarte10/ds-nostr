import { useSubscription } from "@/hooks/useSubscription";
import Image from "next/image";
import React, { useEffect } from "react";

const formatAddress = (address: string, size: number = 22): string => {
  if (address) {
    const formattedAddress: string = `${address.substring(
      0,
      size
    )}...${address.substring(address.length - 4, address.length)}`;

    return formattedAddress;
  }

  return address;
};

const MessagesList = ({ channelId }: { channelId: string }) => {
  const { restartSubscription, events: messages } = useSubscription({
    filters: [
      {
        kinds: [42],
        "#e": [channelId],
      },
    ],
    options: {
      closeOnEose: false,
    },
    enabled: Boolean(channelId),
  });

  useEffect(() => {
    restartSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const sortedMessages = messages.sort((a, b) => a.created_at - b.created_at);

  return (
    <div className="messages">
      {sortedMessages.length > 0 ? (
        <>
          {sortedMessages.map((eventMessage, index) => {
            const parsedContent = JSON.parse(eventMessage.content);

            return (
              <div key={`${eventMessage.id}-${index}`} className="message">
                <Image src="/avatar.jpg" alt="Avatar" width={40} height={40} />
                <div className="message-info">
                  <span className="message-author">
                    {formatAddress(eventMessage.pubkey, 8)}
                  </span>
                  <span className="message-date">
                    {new Date(
                      eventMessage.created_at * 1000
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      eventMessage.created_at * 1000
                    ).toLocaleTimeString()}
                  </span>
                  <p>{parsedContent}</p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <span>No hay mensajes en este canal</span>
      )}
    </div>
  );
};

export default MessagesList;
