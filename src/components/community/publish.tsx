//@ts-nocheck
import { useModalContext } from "@/contexts/ModalContext";
import usePublishEvent from "@/hooks/usePublishEvent";
import { uniqueId } from "lodash";
import { useRef } from "react";
import Button from "../buttons/Button";

const PublishCommunity = () => {
  const { closeModal } = useModalContext();
  const { publish } = usePublishEvent();
  const nameRef = useRef();
  const descRef = useRef();

  return (
    <>
      <div className="modal-body">
        <div className="input-group">
          <label for="name">Nombre</label>
          <input name="name" ref={nameRef} type="text" />

          <label for="desc">Descripción</label>
          <input name="desc" ref={descRef} type="text" />
        </div>
      </div>

      <footer>
        <Button
          type="submit"
          onClick={async () => {
            const name = nameRef.current.value;
            const desc = descRef.current.value;

            if (name && desc) {
              const event = await publish({
                kind: 33015,
                content: JSON.stringify({
                  name,
                  desc,
                }),
                tags: [["d", uniqueId()]],
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

export default PublishCommunity;
