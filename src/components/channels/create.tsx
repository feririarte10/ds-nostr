//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import React, { useRef } from "react";
import { randomString } from "../category/create";

const CreateChannel = ({
  communityId,
  categoryId,
}: {
  communityId: string;
  categoryId: string;
}) => {
  const { publish } = usePublishEvent();
  const nameRef = useRef();

  if (!communityId) return <span>Cargando...</span>;

  return (
    <div>
      <h1>Crear un canal</h1>
      <label htmlFor="name">Nombre</label>
      <input name="name" ref={nameRef} type="text" />

      <button
        type="submit"
        onClick={async () => {
          const name = nameRef.current.value;

          if (name) {
            const event = publish({
              kind: 33016,
              content: JSON.stringify({
                name,
              }),
              tags: [
                ["d", randomString(16)],
                ["t", "text-channel"],
                ["e", communityId],
                [
                  "e",
                  "2633fd315dbcea77f75b3c9b77268be76b825243586faad260b67322e58e487f",
                ],
              ],
            });

            if (event.success) nameRef.current.value = "";
          }
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default CreateChannel;
