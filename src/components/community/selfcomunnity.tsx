import { useSubscription } from '@/hooks/useSubscription';
import Link from 'next/link';
import React from 'react';

const SelfComunnity = ({ pubkey }: { pubkey: string }) => {
  const { events: userCommunityList } = useSubscription({
    filters: [
      {
        kinds: [33015],
        authors: [pubkey],
      },
    ],
    options: {
      closeOnEose: false,
    },
    enabled: Boolean(pubkey.length),
  });
  return (
    <div>
      <h2>Tus comunidades:</h2>

      {userCommunityList.length > 0 ? (
        userCommunityList.map((communityEvent, index) => {
          const communityContent = JSON.parse(communityEvent.content);
          return (
            <div key={`community-${index}`}>
              <Link href={`/community/${communityEvent.id}`}>{communityContent.name}</Link>
            </div>
          );
        })
      ) : (
        <span>Aún no has creado ninguna comunidad</span>
      )}
    </div>
  );
};

export default SelfComunnity;
