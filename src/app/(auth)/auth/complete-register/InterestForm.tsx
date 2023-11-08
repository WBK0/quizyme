import Searchbar from "@/components/Searchbar";
import { useState } from "react";
import { toast } from "react-toastify";

const interests = ['✈️ Traveling', '🏎️ Racing', '⚽ Sports', '📘 Study', '🛠️ Crafts', '🖥️ IT', '✈️ Traveling1', '🏎️ Racing1', '⚽ Sports1', '📘 Study1', '🛠️ Crafts1', '🖥️ IT1', '✈️ Traveling2', '🏎️ Racing2', '⚽ Sports2', '📘 Study2', '🛠️ Crafts2', '🖥️ IT2'];

const InterestForm = ({ nextStep } : { nextStep: () => void}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleSubmit = () => {
    nextStep();
  }

  const handleAddInterest = (interest: string) => {
    if(selectedInterests.length >= 12){
      toast.error('You can select up to 12 interests');
      return;
    }
    interests.splice(interests.indexOf(interest), 1);
    setSelectedInterests([...selectedInterests, interest]);
  }

  const handleRemoveInterest = (interest: string) => {
    interests.push(interest);
    setSelectedInterests(selectedInterests.filter((value) => value !== interest));
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-3 mt-6 justify-center">
        {selectedInterests.map((value) => (
          <div 
            key={value} 
            className="px-3 sm:px-6 py-1 text-black rounded-full font-bold bg-gray-100 w-fit cursor-pointer hover:bg-red"
            onClick={() => handleRemoveInterest(value)}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="h-72 overflow-y-scroll relative">
        <div className="fixed w-full max-w-md">
          <Searchbar />
        </div>
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          {interests.map((value) => (
            <div key={value} className="px-3 sm:px-6 py-1 text-black rounded-full font-bold bg-gray-100 w-fit cursor-pointer hover:bg-lightblue"
              onClick={() => {handleAddInterest(value)}}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <button
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white max-w-sm mx-auto"
      >
        Next step
      </button>
    </form>
  )
}

export default InterestForm;