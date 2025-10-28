import { atom } from "jotai";
import type { Story, StoryList, StoryNodes } from "./types";

export const storiesData = atom<StoryNodes>({});

export const storiesList = atom<StoryList>(
  (get): StoryList => {
    const nodes = get(storiesData)
    const keys = Object.keys(nodes);
    const lastNode = keys[keys.length - 1];
    console.log(lastNode)
    return { head: Number(lastNode) || -1, nodes: get(storiesData) };
  }
);

export const addToStoryData = atom(null, (get, set, story: Story) => {
  const prev = get(storiesData);
  let keys = Object.keys(prev)
  let newNodeKey:string = (Number(keys[keys.length - 1]) + 1).toString();
  
  if(newNodeKey === "NaN") newNodeKey = "1";
  
  let newNode: {[key: string]: Story} = JSON.parse(`{"${newNodeKey}": {"id": ${story.id}, "data": "${story.data}"} }`);
  set(storiesData, {...prev, ...newNode});
})

export const removeLastFromStoryData = atom(null, (get, set, id: number) => {
  const prev = get(storiesData);
  const prevWithoutDeletedValue = Object.values(prev).filter(story => story.id !== id);

  if(prevWithoutDeletedValue.length === 0) {
    set(storiesData, {});
    return;
  };

  let newStateString = "";

  for(const key in prevWithoutDeletedValue) {
   newStateString += `"${key}": {"id":${prevWithoutDeletedValue[key].id}, "data": "${prevWithoutDeletedValue[key].data}"}`;
   if(prevWithoutDeletedValue[Number(key) + 1]) newStateString+= ","
  }

  newStateString = "{"+ newStateString +"}";

  const newState = JSON.parse(newStateString);
  set(storiesData, newState)
})