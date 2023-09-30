import { useSubscription } from "@/hooks/useSubscription";
import React, { useEffect } from "react";

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
    console.log("restart");
    restartSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return (
    <div>
      {messages.length > 0 ? (
        <>
          <h2>Mensajes encontrados: </h2>
          {messages.map((eventMessage, index) => {
            const parsedContent = JSON.parse(eventMessage.content);

            return (
              <div key={`${eventMessage.id}-${index}`}>
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
    </div>
  );
};

export default MessagesList;
