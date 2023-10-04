//@ts-nocheck
import { useModalContext } from "@/contexts/ModalContext";
import usePublishEvent from "@/hooks/usePublishEvent";
import { uniqueId } from "lodash";
import { useRef, useState } from "react";
import Button from "../buttons/Button";
import Image from "next/image";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = (error) => reject(error);
  });
}

const CreateCommunity = () => {
  const { closeModal } = useModalContext();
  const { publish } = usePublishEvent();
  const nameRef = useRef();
  const descRef = useRef();
  const [base64, setBase64] = useState("");

  return (
    <>
      <div className="modal-body">
        <div className="input-group">
          <label for="name">Nombre</label>
          <input name="name" ref={nameRef} type="text" />

          <label for="desc">Descripción</label>
          <input name="desc" ref={descRef} type="text" />

          <label for="image">Logotipo</label>
          <input
            type="file"
            onChange={async (event) => {
              const file: File | null = event.target.files
                ? event.target.files[0]
                : null;

              const imageURL: string = await getBase64(file);
              console.log(file);
              setBase64(`data:image/png;base64,${imageURL}`);
            }}
          />

          {base64.length > 0 && (
            <Image src={base64} alt="image" width={250} height={250} />
          )}
        </div>
      </div>

      <footer>
        <Button
          type="submit"
          onClick={async () => {
            const name = nameRef.current.value;
            const desc = descRef.current.value;

            if (name && desc && base64.length) {
              const event = await publish({
                kind: 33015,
                content: JSON.stringify({
                  name,
                  desc,
                  image: base64,
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

export default CreateCommunity;
