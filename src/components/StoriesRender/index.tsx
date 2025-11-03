import { useAtomValue } from "jotai";
import { StoryCircle } from "../StoryCircle";
import { listHeadAtom, storyAtomFamily } from "../../atoms/stories";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import type { Story } from "../../atoms/types";

type StoriesRenderProps = {
  storyId?: number
}

export function StoriesRender({ storyId = undefined }: StoriesRenderProps) {

  const id = storyId || useAtomValue(listHeadAtom);

  const story = useAtomValue(storyAtomFamily(id!));

  const deleteStory = useAtomCallback(useCallback((get, set, id: number) => {
    const story = get(storyAtomFamily(id)) as Story;

    if (story.previous) {
      const previousAtom = storyAtomFamily(story.previous)
      set(previousAtom, { ...get(previousAtom) as Story, next: story.next })
    }

    if (story.next) {
      const nextAtom = storyAtomFamily(story.next);
      set(nextAtom, { ...get(nextAtom) as Story, previous: story.previous });
    }

    if(get(listHeadAtom) === story.id) {
      set(listHeadAtom, story.next);
    }

    storyAtomFamily.remove(id);
  }, []));

  if (story) {
    return <>
      <StoryCircle key={story.id} data={story.data} onClick={() => deleteStory(story.id)} />
      {story.next && <StoriesRender storyId={story.next} />}
    </>
  }
}