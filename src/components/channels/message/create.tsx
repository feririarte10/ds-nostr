//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import React, { useRef } from "react";

const CreateMessage = ({ channelId }) => {
  const { publish } = usePublishEvent();
  const textRef = useRef();

  if (!channelId) return <span>Cargando...</span>;

  return (
    <div>
      <h1>Enviar un mensaje</h1>
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
          }
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default CreateMessage;
