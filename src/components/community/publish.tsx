//@ts-nocheck
import usePublishEvent from '@/hooks/usePublishEvent';
import { uniqueId } from 'lodash';
import { useRef } from 'react';

const PublishCommunity = () => {
  const { publish } = usePublishEvent();
  const nameRef = useRef();
  const descRef = useRef();

  return (
    <div>
      <h1>Crear una comunidad</h1>
      <label for='name'>Nombre</label>
      <input name='name' ref={nameRef} type='text' />

      <label for='desc'>Descripción</label>
      <input name='desc' ref={descRef} type='text' />
      <button
        type='submit'
        onClick={() => {
          const name = nameRef.current.value;
          const desc = descRef.current.value;

          if (name && desc)
            publish({
              kind: 33015,
              content: JSON.stringify({
                name,
                desc,
              }),
              tags: [['d', uniqueId()]],
            });
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default PublishCommunity;
