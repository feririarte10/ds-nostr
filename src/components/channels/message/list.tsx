import Image from "next/image";
import React from "react";
import { nip19 } from "nostr-tools";
import useChannelMessages from "@/hooks/useChannelMessages";

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
  const { messages } = useChannelMessages({ channelId });

  return (
    <div className="messages">
      {messages.length > 0 ? (
        <>
          {messages.map((eventMessage, index) => {
            const parsedContent = JSON.parse(eventMessage.content);

            return (
              <div key={`${eventMessage.id}-${index}`} className="message">
                <Image src="/avatar.jpg" alt="Avatar" width={40} height={40} />
                <div className="message-info">
                  <span className="message-author">
                    {formatAddress(nip19.npubEncode(eventMessage.pubkey), 12)}
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
