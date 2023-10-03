import { NDKEvent, NDKTag } from "@nostr-dev-kit/ndk";

export const getTag = (tags: NDKTag[], keyTag: string) => {
  const tagValue = tags.find((tag) => tag[0] === keyTag);
  return tagValue ? tagValue[1] : "";
};

export const getMultipleTags = (tags: NDKTag[], keyTag: string) => {
  const values: string[] = [];

  const tagsValue: NDKTag[] = tags.filter((tag) => tag[0] === keyTag);
  tagsValue.forEach((tag) => values.push(tag[1]));

  return values;
};

export const filterEventsBySubkind = (events: NDKEvent[], subkind: string) => {
  return events.filter((event) => {
    const eventSubkind = getTag(event.tags, "t");
    return subkind === eventSubkind;
  });
};
