'use client';
import ChannelFrame from '@/components/channels/frame';
import ChannelsList from '@/components/channels/list';
import Modal from '@/components/modals/Modal';
import { useModalContext } from '@/contexts/ModalContext';
import useCommunity from '@/hooks/useCommunity';

const Community = ({ params }: { params: { slug: string } }) => {
  const { modalInfo } = useModalContext();

  const { communityInfo, categoriesInfo, selectedChannel, setSelectedChannel } = useCommunity(params.slug);

  if (!communityInfo.event) return <span>Cargando...</span>;

  return (
    <div className='viewport'>
      <aside className='sidebar'>
        <div className='community'>
          <h1>{communityInfo.name}</h1>
        </div>

        <ChannelsList
          communityInfo={communityInfo}
          categoriesInfo={categoriesInfo}
          setSelectedChannel={setSelectedChannel}
        />
      </aside>

      {selectedChannel.length > 0 ? (
        <ChannelFrame channelId={selectedChannel} />
      ) : (
        <div className='content'>
          <h1>No has seleccionado ningún canal de texto</h1>
        </div>
      )}

      <Modal
        title={modalInfo.title}
        description={modalInfo.description}
        isOpen={modalInfo.isOpen}
        loading={modalInfo.loading}
        acceptButton={modalInfo.acceptButton}
        cancelButton={modalInfo.cancelButton}
        closeButton={modalInfo.closeButton}
        closeModal={modalInfo.closeModal}
      >
        {modalInfo.children}
      </Modal>
    </div>
  );
};

export default Community;
