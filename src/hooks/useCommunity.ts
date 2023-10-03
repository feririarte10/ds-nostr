import { NostrEvent, NDKEvent, NDKTag } from "@nostr-dev-kit/ndk";
import { useSubscription } from "./useSubscription";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useNostrify } from "@/contexts/Nostrify";
import { debounce } from "lodash";

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

const getMultipleTags = (tags: NDKTag[], keyTag: string) => {
  const values: string[] = [];

  const tagsValue: NDKTag[] = tags.filter((tag) => tag[0] === keyTag);
  tagsValue.forEach((tag) => values.push(tag[1]));

  return values;
};

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
    async function generate(categories: NDKEvent[], channels: NDKEvent[]) {
      const tmpCategoriesList: CategoriesInformation[] = [];

      categories.forEach(async (categoryEvent: NDKEvent) => {
        const filteredChannels = channels.filter((channel) => {
          const channelEvents = getMultipleTags(channel.tags, "e");
          console.log(channelEvents);
          return channelEvents.includes(categoryEvent.id);
        });

        tmpCategoriesList.push({
          category: categoryEvent,
          channels: filteredChannels,
        });
      });

      // const sortedTransactions: Transaction[] = userTransactions.sort(
      //   (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      // );

      // setTransactions(sortedTransactions);
      setCategoriesInfo(tmpCategoriesList);
    }

    return debounce(generate, 300);
  }, []);

  const { events: categories } = useSubscription({
    filters: [
      {
        kinds: [33016],
        authors: [communityInfo.event?.pubkey],
        "#e": [communityInfo.event?.id],
        "#t": ["category"],
      },
    ],
    options: {
      closeOnEose: false,
    },
    enabled: Boolean(communityInfo.event?.pubkey),
  });

  const { events: channels } = useSubscription({
    filters: [
      {
        kinds: [33016],
        authors: [communityInfo.event?.pubkey],
        "#e": [communityInfo.event?.id],
        "#t": ["text-channel"],
      },
    ],
    options: {
      closeOnEose: false,
    },
    enabled: Boolean(communityInfo.event?.pubkey),
  });

  console.log(channels);

  useEffect(() => {
    if (categories.length > 0) debouncedGenerateCatList(categories, channels);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, channels]);

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
