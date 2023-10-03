//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import React, { useRef } from "react";
import { uniqueId } from "lodash";

export function randomString(length) {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  var str = "";
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

const CreateCategory = ({ communityId }: { communityId: string }) => {
  const { publish } = usePublishEvent();
  const nameRef = useRef();

  if (!communityId) return <span>Cargando...</span>;

  return (
    <div>
      <h1>Crear una categoria</h1>
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
                ["t", "category"],
                ["e", communityId],
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

export default CreateCategory;