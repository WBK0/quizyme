"use client";
import { useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import caution from '@/public/caution.png';

type TagsProps = {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  error?: string;
}

const Tags = ({ register, setValue, error } : TagsProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  }

  const handleAddTag = () => {
    if(tags.length >= 5){
      toast.error('You can only add up to 5 tags');
      return;
    } 

    if(tagInput.length > 16){
      toast.error('Tag must be at most 16 characters');
      return;
    }

    if (tagInput.trim() !== "" && tags.findIndex(element => element.toLowerCase() === tagInput.toLowerCase()) === -1) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  useEffect(() => {
    setValue('tags', tags);
  }, [tags]);

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag: string, index: number) => (
          <div
            key={index}
            className="px-4 py-1 rounded-xl text-sm bg-blue w-fit text-white font-bold cursor-pointer hover:bg-red duration-300"
            onClick={() => handleRemoveTag(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="relative w-full  mt-4">
          <input
            type="text"
            placeholder="Keyword"
            name="tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="w-full rounded-l-xl px-4 py-2 outline-none font-bold text-lg bg-gray-100 text-black"
          />
          <div className="group">
            {error && 
              <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
              <Image src={caution} width={24} height={24} alt="error" />
              </i>
            }
            <span className="pointer-events-none absolute bottom-1/2 mb-4 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
              {error}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="rounded-r-xl px-12 py-2 outline-none font-bold text-lg bg-black text-white mt-4"
          onClick={handleAddTag}
        >
          ADD
        </button>
        
      </div>
      <input 
        type="hidden"
        {...register('tags')}
      />
    </div>
  );
};

export default Tags;
