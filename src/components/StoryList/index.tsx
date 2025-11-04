import type { Story } from "../../atoms/types";
import { StoriesRender } from "../StoriesRender";
import { AddStory } from "../AddStory";
import { useAtomValue } from "jotai";
import { listHeadAtom } from "../../atoms/stories";


export function generateStory(): Story {
  return {
    id: Math.floor(Math.random() * 10 * 10 * 50),
    data: "",
    previous: null,
    next: null
  }
}

export function StoryList() {

  const headId = useAtomValue(listHeadAtom);

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
          <AddStory/>
          {headId && <StoriesRender />}
        </div>
      </section>

    </article>
  )
}