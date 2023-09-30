//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import React, { useRef } from "react";

const CreateChannel = () => {
  const { publish } = usePublishEvent();
  const nameRef = useRef();
  const descRef = useRef();

  return (
    <div>
      <h1>Crear un canal</h1>
      <label htmlFor="name">Nombre</label>
      <input name="name" ref={nameRef} type="text" />

      <label htmlFor="desc">Descripción</label>
      <input name="desc" ref={descRef} type="text" />

      <button
        type="submit"
        onClick={async () => {
          const name = nameRef.current.value;
          const desc = descRef.current.value;

          if (name && desc) {
            const event = await publish({
              kind: 40,
              content: JSON.stringify({
                name,
                desc,
              }),
            });
            console.log(event);
          }
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default CreateChannel;
