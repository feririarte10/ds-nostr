import Button from '@/components/buttons/Button';
import { X } from '@/components/Icons/Icons';
import { ModalLoader } from '@/components/Loader/Loader';
import { ReactNode, memo, useRef } from 'react';
import HelpButton from '../buttons/HelpButton';

export type ModalProps = {
  title: string;
  description: string;
  onClick?: (e: any) => void;
  closeModal: (e: any) => void;
  loading: boolean;
  isOpen: boolean;
  acceptButton: boolean;
  cancelButton: boolean;
  closeButton: boolean;
  icon?: ReactNode;
  children?: ReactNode;
};

const Modal = ({
  icon,
  title,
  description,
  closeModal,
  cancelButton,
  acceptButton,
  closeButton,
  onClick,
  loading,
  isOpen,
  children,
}: ModalProps) => {
  const nodeRef: any = useRef<HTMLDivElement>();

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      closeModal(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal' onClick={handleOverlayClick}>
      <div className='modal-content' ref={nodeRef}>
        <header className='modal-header'>
          <span>
            {icon}
            {title}
          </span>

          {closeButton && (
            <button onClick={closeModal}>
              <X />
            </button>
          )}
        </header>

        {loading ? (
          <ModalLoader />
        ) : (
          <>
            {description && <p>{description}</p>}

            {children}

            {acceptButton && (
              <Button
                onClick={onClick ? onClick : () => null}
                btnText={'Confirmar'}
                isModal={true}
                isDisabled={false}
                loading={false}
              />
            )}
          </>
        )}

        {cancelButton && <HelpButton btnText={'Cancelar'} onClick={closeModal} />}
      </div>
    </div>
  );
};

export default memo(Modal);
