"use client";
import Searchbar from "@/components/Searchbar";
import { DataContext } from "@/providers/edit-profile/DataProvider";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const interestsToSelect = ['✈️ Traveling', '🏎️ Racing', '⚽ Sports', '📘 Study', '🛠️ Crafts', '🖥️ IT', '🎨 Art', '🎵 Music', '📚 Reading', '🎮 Gaming', '🍳 Cooking', '🌿 Gardening', '🏄‍♂️ Surfing', '🚵‍♂️ Cycling', '🎭 Theater', '🏋️‍♂️ Fitness', '🧘‍♀️ Yoga', '🎬 Movies', '🎤 Singing', '🐶 Pet care', '🎯 Archery', '🎻 Playing an instrument', '📷 Photography', '🍷 Wine tasting'];

const ProfileInterests = () => {
  const { interests, dispatch } = useContext(DataContext);
  const [search, setSearch] = useState('');

  const handleRemoveInterest = (value: string) => {
    dispatch({
      type: "UPDATE_INTERESTS",
      payload: interests.filter((interest) => interest !== value)
    })
    interestsToSelect.push(value);
  }

  const handleAddInterest = (value: string) => {
    if(interests.length >= 12){
      toast.error("You can select up to 12 interests");
      return;
    }
    dispatch({
      type: "UPDATE_INTERESTS",
      payload: [...interests, value]
    })
    interestsToSelect.splice(interestsToSelect.indexOf(value), 1);
  }

  return (
    <div className="">
      <h2 className="font-black text-3xl">
        User interests
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {interests.map((value) => (
            <div  
              key={value} 
              className="px-3 sm:px-6 py-1 text-black rounded-full font-bold bg-gray-100 w-fit cursor-pointer hover:bg-red"
              onClick={() => handleRemoveInterest(value)}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="w-full pt-6">
            <Searchbar 
              value={search}
              onChange={setSearch}
            />
          </div>
          <div className="flex flex-wrap gap-3 mt-6 justify-center overflow-y-scroll max-h-56 scroll-sm">
            {interestsToSelect.filter((value) => value.toLowerCase().includes(search.toLowerCase())).map((value) => (
              <div key={value} className="px-3 sm:px-6 py-1 text-black rounded-full font-bold bg-gray-100 w-fit cursor-pointer hover:bg-lightblue h-fit"
                onClick={() => {handleAddInterest(value)}}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInterests;