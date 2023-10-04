//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import React, { useRef } from "react";
import Button from "../buttons/Button";
import { useModalContext } from "@/contexts/ModalContext";

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
                  ["t", "category"],
                  ["e", communityId],
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

export default CreateCategory;
