//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import React, { useRef } from "react";

const CreateMessage = ({ channelId }) => {
  const { publish } = usePublishEvent();
  const textRef = useRef();

  if (!channelId) return <span>Cargando...</span>;

  return (
    <div className="message-input">
      <input name="text" ref={textRef} type="text" />

      <button
        type="submit"
        onClick={async () => {
          const text = textRef.current.value;

          if (text) {
            const event = await publish({
              kind: 42,
              content: JSON.stringify(text),
              tags: [["e", channelId, "wss://relay.damus.io/", "root"]],
            });

            if (event.success) textRef.current.value = "";
          }
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default CreateMessage;
