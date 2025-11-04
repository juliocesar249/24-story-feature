import { StoryCircle } from "../StoryCircle";
import { listHeadAtom, storyAtomFamily } from "../../atoms/stories";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import type { Story } from "../../atoms/types";

export function AddStory() {

  const addNode = useAtomCallback(useCallback((get, set, story: Story) => {
    const currentHeadId = get(listHeadAtom);
    const newStory = story;
    if (currentHeadId !== null) {
      const oldHeadData = get(storyAtomFamily(currentHeadId));
      if (oldHeadData) set(storyAtomFamily(oldHeadData.id), { ...oldHeadData, previous: newStory.id });
      newStory.next = currentHeadId;
    }
    set(storyAtomFamily(newStory.id), newStory);
    set(listHeadAtom, newStory.id);
  }, []));

  return <StoryCircle first data="" addStory={addNode}/>
}