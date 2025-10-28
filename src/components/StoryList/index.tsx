import { useAtomValue, useSetAtom } from "jotai";
import type { Story } from "../../atoms/types";
import { StoryCircle } from "../StoryCircle";
import { addToStoryData, removeLastFromStoryData, storiesList } from "../../atoms/stories";
import { useEffect } from "react";

function generateStory(): Story {
  return {
    id: Math.floor(Math.random() * 10 * 10 * 50),
    data: String.fromCharCode(Number(`${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`))
  }
}

export function StoryList() {

  const listOfStories = useAtomValue(storiesList);
  const addStory = useSetAtom(addToStoryData);
  const removeStory = useSetAtom(removeLastFromStoryData);
  
  function handleAddStory():void {
    addStory(generateStory());
  }

  function handleDeleteStory(id:number):void {
    removeStory(id);
  }

  useEffect(() => console.log(listOfStories), [listOfStories]);

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
          <StoryCircle first={true} data={""} onClick={handleAddStory} />
          {
           Object.values(listOfStories.nodes).map((story) => <StoryCircle key={story.id} data={story.data} onClick={() => handleDeleteStory(story.id)}/>)
          }
        </div>
      </section>

    </article>
  )
}