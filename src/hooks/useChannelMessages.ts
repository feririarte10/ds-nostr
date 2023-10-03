import { useEffect } from "react";
import { useSubscription } from "./useSubscription";
import { NostrEvent } from "@nostr-dev-kit/ndk";

type ChannelMessagesReturn = {
  messages: NostrEvent[];
};

const useChannelMessages = ({
  channelId,
}: {
  channelId: string;
}): ChannelMessagesReturn => {
  const { restartSubscription, events } = useSubscription({
    filters: [
      {
        kinds: [33017],
        "#e": [channelId],
      },
    ],
    options: {
      closeOnEose: false,
    },
    enabled: Boolean(channelId),
  });

  useEffect(() => {
    restartSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const messages: NostrEvent[] = events.sort(
    (a, b) => a.created_at - b.created_at
  );

  return { messages };
};

export default useChannelMessages;
