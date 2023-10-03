//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import React, { useRef } from "react";
import { randomString } from "../category/create";
import Button from "../buttons/Button";

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Nombre</label>
      <input name="name" ref={nameRef} type="text" style={{ margin: "1rem" }} />

      <Button
        type="submit"
        onClick={async () => {
          const name = nameRef.current.value;

          console.log(name);
          console.log(categoryId);

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
                ["e", categoryId],
              ],
            });
            console.log(event);

            if (event.success) nameRef.current.value = "";
          }
        }}
        btnText="Crear"
      />
    </div>
  );
};

export default CreateChannel;
