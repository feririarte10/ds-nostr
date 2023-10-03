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
                  "316d45982d55f92d86ab073f56003d3e9e919ca8d3e65b0f11a3491b900a7d16",
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
