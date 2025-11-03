export type Story = {
  id: number;
  data: string;
  next: number | null;
  previous: number | null;
}

export type StoryNodes = {
  [key: string]: Story
}


export type StoryList = {
  head: number;
  nodes: StoryNodes;
}