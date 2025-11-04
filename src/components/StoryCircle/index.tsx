import type React from "react";
import type { Story } from "../../atoms/types";
import { useEffect, useState } from "react";
import { generateStory } from "../StoryList";

type StoryCircleProps = {
  first?: boolean;
  data: string;
  addStory?: (story: Story) => void;
  removeStory?: (id:number) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function StoryCircle({ first = false, data, addStory, removeStory, ...props }: StoryCircleProps) {
  const [imageURL, setImageURL] = useState<string>("");

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    
    if(file && file.length > 0) {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          setImageURL(reader.result as string);
        }
        reader.readAsDataURL(file.item(0) as Blob)
      } catch(e) {
        console.error(e);
      }

    }
  }

  useEffect(() => {
    if(imageURL) addStory!({...generateStory(), data: imageURL})
  }, [imageURL]);
  
  return (
    <div
      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${first && "border-gray-400 bg-amber-300"}`}
      {...props}
    >
      {!first && <img src={data}/>}
      {first && (
        <form>
          <label htmlFor="addImage" className="text-gray-400 font-bold">+</label>
          <input accept="image/*" type="file" id="addImage" hidden onChange={handleAddImage} />
        </form>
      )}
    </div>
  )
}