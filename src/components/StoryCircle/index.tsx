import type React from "react";

type StoryCircleProps = {
  first?: boolean;
  data: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function StoryCircle({ first = false, data, ...props }: StoryCircleProps) {
  return (
    <div
      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${first && "border-gray-400 bg-amber-300"}`}
      {...props}
    >
      {!first && <p>{data}</p>}
      {first && <span className="text-gray-400 font-bold">+</span>}
    </div>
  )
}