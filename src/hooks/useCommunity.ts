import { NostrEvent, NDKEvent } from "@nostr-dev-kit/ndk";
import { useSubscription } from "./useSubscription";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useNostrify } from "@/contexts/Nostrify";
import { debounce } from "lodash";
import {
  filterEventsBySubkind,
  getMultipleTags,
} from "@/utils/NDKEventHandlers";

interface Community {
  name: string;
  desc: string;
  event: NostrEvent;
}

type CategoriesInformation = {
  category: NostrEvent;
  channels: NostrEvent[];
};

interface UseCommunityReturn {
  communityInfo: Community;
  categoriesInfo: CategoriesInformation[];
  selectedChannel: string;
  setSelectedChannel: Dispatch<SetStateAction<string>>;
}

export const useCommunity = (communityId: string): UseCommunityReturn => {
  const { ndk } = useNostrify();
  const [communityInfo, setCommunityInfo] = useState<Community>({
    name: "",
    desc: "",
    event: null,
  });

  const [categoriesInfo, setCategoriesInfo] = useState<CategoriesInformation[]>(
    []
  );

  const [selectedChannel, setSelectedChannel] = useState<string>("");

  const debouncedGenerateCatList = useMemo(() => {
    async function generate(events: NDKEvent[]) {
      const categories: NDKEvent[] = filterEventsBySubkind(events, "category");
      const channels: NDKEvent[] = filterEventsBySubkind(
        events,
        "text-channel"
      );

      const tmpCategoriesList: CategoriesInformation[] = [];

      categories.forEach(async (categoryEvent: NDKEvent) => {
        const filteredChannels = channels.filter((channel) => {
          const channelEvents = getMultipleTags(channel.tags, "e");

          return channelEvents.includes(categoryEvent.id);
        });

        tmpCategoriesList.push({
          category: categoryEvent,
          channels: filteredChannels,
        });
      });

      setCategoriesInfo(tmpCategoriesList);
    }

    return debounce(generate, 300);
  }, []);

  const { events } = useSubscription({
    filters: [
      {
        kinds: [33016],
        authors: [communityInfo.event?.pubkey],
        "#e": [communityInfo.event?.id],
        "#t": ["text-channel", "category"],
      },
    ],
    options: {
      closeOnEose: false,
    },
    enabled: Boolean(communityInfo.event?.pubkey),
  });

  useEffect(() => {
    if (events.length > 0) debouncedGenerateCatList(events);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  useEffect(() => {
    if (!communityId) return;

    if (ndk)
      ndk.fetchEvent({ ids: [communityId] }).then(async (event: NDKEvent) => {
        if (event) {
          const nEvent: NostrEvent = await event.toNostrEvent();
          const commInfo = JSON.parse(nEvent.content);
          setCommunityInfo({ ...commInfo, event: nEvent });
        }
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ndk]);

  return { communityInfo, categoriesInfo, selectedChannel, setSelectedChannel };
};

export default useCommunity;
