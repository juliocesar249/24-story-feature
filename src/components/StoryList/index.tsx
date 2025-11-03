import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { Activity, useCallback, useEffect } from "react";
import { listHeadAtom, storyAtomFamily } from "../../atoms/stories";
import type { Story } from "../../atoms/types";
import { StoryCircle } from "../StoryCircle";
import { StoriesRender } from "../StoriesRender";


export function generateStory(): Story {
  return {
    id: Math.floor(Math.random() * 10 * 10 * 50),
    data: Math.random().toString(36).substring(11),
    previous: null,
    next: null
  }
}

export function StoryList() {

  const headId = useAtomValue(listHeadAtom);

  const addNode = useAtomCallback(useCallback( (get, set) => {
      const currentHeadId = get(listHeadAtom);
      const newStory = generateStory();
      if (currentHeadId !== null) {
        const oldHeadData = get(storyAtomFamily(currentHeadId));
        if (oldHeadData) set(storyAtomFamily(oldHeadData.id), { ...oldHeadData, previous: newStory.id });
        newStory.next = currentHeadId;
      }
      set(storyAtomFamily(newStory.id), newStory);
      set(listHeadAtom, newStory.id);
    },[]));

  return (
    <article
      className="w-full pt-4 mr-1 ml-1 flex justify-center">

      <section className="
      p-1
      border-2
      rounded-[.3rem]
      border-blue-500
      overflow-x-auto
      flex
      flex-nowrap
      gap-2"
        style={{ width: "clamp(340px, 20%, 400px)" }}>
        <div className="flex gap-2">
          <StoryCircle first={true} data={""} onClick={addNode} />
          {headId && <StoriesRender />}
        </div>
      </section>

    </article>
  )
}