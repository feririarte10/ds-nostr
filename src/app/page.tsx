"use client";
import CreateCommunity from "@/components/community/create";
import SelfComunnity from "@/components/community/selfcomunnity";
import Modal from "@/components/modals/Modal";
import { useModalContext } from "@/contexts/ModalContext";
import { useNostrify } from "@/contexts/Nostrify";

export default function Home() {
  const { modalInfo, setModalProps, closeModal } = useModalContext();
  const { userPubkey } = useNostrify();

  const createCommunityModal = () => {
    setModalProps({
      title: "Crear comunidad",
      description: "",
      acceptButton: false,
      closeButton: true,
      cancelButton: false,
      closeModal,
      isOpen: true,
      loading: false,
      children: <CreateCommunity />,
    });
  };

  return (
    <main>
      <p>Tu clave publica: {userPubkey}</p>

      <SelfComunnity pubkey={userPubkey} />

      <button className="btn btn-primary" onClick={createCommunityModal}>
        Crear nueva comunidad
      </button>

      <Modal modalInfo={modalInfo} />
    </main>
  );
}
