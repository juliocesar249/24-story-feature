export type Story = {
  id: number;
  data: string;
  next?: number;
  previous?: number;
}

export type StoryNodes = {
  [key: string]: Story
}


export type StoryList = {
  head: number;
  nodes: { [key: string]: Story };
}