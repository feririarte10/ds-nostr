import { CategoriesInformation, Community } from '@/hooks/useCommunity';
import React, { Dispatch, SetStateAction } from 'react';
import { NostrEvent } from '@nostr-dev-kit/ndk';
import _ from 'lodash';
import { useModalContext } from '@/contexts/ModalContext';
import CreateCategory from '../category/create';
import { useNostrify } from '@/contexts/Nostrify';
import { Plus } from '../Icons/Icons';
import CreateChannel from './create';

const ChannelsList = ({
  communityInfo,
  categoriesInfo,
  setSelectedChannel,
}: {
  communityInfo: Community;
  categoriesInfo: CategoriesInformation[];
  setSelectedChannel: Dispatch<SetStateAction<string>>;
}) => {
  const { userPubkey } = useNostrify();
  const { setModalProps, closeModal } = useModalContext();

  const createCategoryModal = () => {
    setModalProps({
      title: 'Crear categoría',
      description: '',
      acceptButton: false,
      closeButton: true,
      cancelButton: false,
      closeModal,
      isOpen: true,
      loading: false,
      children: <CreateCategory communityId={communityInfo.event?.id} />,
    });
  };

  const createChannelModal = (categoryId: string) => {
    setModalProps({
      title: 'Crear canal de texto',
      description: '',
      acceptButton: false,
      closeButton: true,
      cancelButton: false,
      closeModal,
      isOpen: true,
      loading: false,
      children: <CreateChannel communityId={communityInfo.event?.id} categoryId={categoryId} />,
    });
  };

  return (
    <div>
      {_.size(categoriesInfo) > 0 ? (
        <ul>
          {_.map(categoriesInfo, (infoCategory: CategoriesInformation) => {
            const parsedContent = JSON.parse(infoCategory.category.content);

            return (
              <>
                <div>
                  <h3>{parsedContent.name}</h3>

                  <button onClick={() => createChannelModal(infoCategory.category?.id)}>
                    {/* Agregar canal */}
                    <Plus />
                  </button>
                </div>

                {infoCategory.channels.length > 0 &&
                  infoCategory.channels.map((channel: NostrEvent) => {
                    const channelContent = JSON.parse(channel.content);

                    return (
                      <li key={channel.id} className='channel active'>
                        <button onClick={() => setSelectedChannel(channel.id)}># {channelContent.name}</button>
                      </li>
                    );
                  })}
              </>
            );
          })}
        </ul>
      ) : (
        <div className='welcome'>
          <div>
            <h3>Bienvenido a tu nuevo servidor.</h3>
            <p>Empiezza a crear nuevas comunidades virtuales.</p>
          </div>

          {communityInfo.event?.pubkey === userPubkey && (
            <button className='btn btn-primary' onClick={createCategoryModal}>
              Crear nueva categoria
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChannelsList;
