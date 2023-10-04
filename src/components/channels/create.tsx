//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import React, { useRef } from "react";
import { randomString } from "../category/create";
import Button from "../buttons/Button";
import { useModalContext } from "@/contexts/ModalContext";

const CreateChannel = ({
  communityId,
  categoryId,
}: {
  communityId: string;
  categoryId: string;
}) => {
  const { closeModal } = useModalContext();
  const { publish } = usePublishEvent();
  const nameRef = useRef();

  if (!communityId) return <span>Cargando...</span>;

  return (
    <>
      <div className="modal-body">
        <div className="input-group">
          <label htmlFor="name">Nombre</label>
          <input
            name="name"
            ref={nameRef}
            type="text"
            placeholder="Escriba un nombre"
          />
        </div>
      </div>

      <footer>
        <Button
          type="submit"
          onClick={async () => {
            const name = nameRef.current.value;

            if (name) {
              const event = await publish({
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

              if (event.success) closeModal();
            }
          }}
          btnText="Crear"
        />
      </footer>
    </>
  );
};

export default CreateChannel;
