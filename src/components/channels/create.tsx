//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import React, { useRef } from "react";

const CreateChannel = ({ communityId }: { communityId: string }) => {
  const { publish } = usePublishEvent();
  const nameRef = useRef();
  // const descRef = useRef();

  if (!communityId) return <span>Cargando...</span>;

  return (
    <div>
      <h1>Crear un canal</h1>
      <label htmlFor="name">Nombre</label>
      <input name="name" ref={nameRef} type="text" />

      {/* <label htmlFor="desc">Descripción</label>
      <input name="desc" ref={descRef} type="text" /> */}

      <button
        type="submit"
        onClick={async () => {
          const name = nameRef.current.value;
          // const desc = descRef.current.value;

          if (name) {
            publish({
              kind: 40,
              content: JSON.stringify({
                name,
              }),
              tags: [["e", communityId]],
            });
          }
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default CreateChannel;
