import Searchbar from "@/components/Searchbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { FormData } from './page';
import submitCompleteRegisterForm from "./submitForm";

const interests = ['✈️ Traveling', '🏎️ Racing', '⚽ Sports', '📘 Study', '🛠️ Crafts', '🖥️ IT', '✈️ Traveling1', '🏎️ Racing1', '⚽ Sports1', '📘 Study1', '🛠️ Crafts1', '🖥️ IT1', '✈️ Traveling2', '🏎️ Racing2', '⚽ Sports2', '📘 Study2', '🛠️ Crafts2', '🖥️ IT2', '✈️ Traveling3', '🏎️ Racing3', '⚽ Sports3', '📘 Study3', '🛠️ Crafts3', '🖥️ IT3', '✈️ Traveling4', '🏎️ Racing4', '⚽ Sports4', '📘 Study4', '🛠️ Crafts4', '🖥️ IT4', '✈️ Traveling5', '🏎️ Racing5', '⚽ Sports5', '📘 Study5', '🛠️ Crafts5', '🖥️ IT5'];

const InterestForm = ({ nextStep, previousStep, values } : { nextStep: (data: {}) => void, previousStep: () => void, values: FormData}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    values = {...values, interests: selectedInterests};
    submitCompleteRegisterForm(values);
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
      <div className="flex flex-wrap gap-3 justify-center">
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
      <div className="relative">
        <div className="w-full">
          <Searchbar />
        </div>
        <div className="flex flex-wrap gap-3 mt-6 justify-center overflow-y-scroll h-56 scroll-sm">
          {interests.map((value) => (
            <div key={value} className="px-3 sm:px-6 py-1 text-black rounded-full font-bold bg-gray-100 w-fit cursor-pointer hover:bg-lightblue"
              onClick={() => {handleAddInterest(value)}}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white"
        >
          Finish
        </button>
        <button
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white mt-2"
          onClick={previousStep}
        >
          Previous step
        </button>
      </div>
    </form>
  )
}

export default InterestForm;