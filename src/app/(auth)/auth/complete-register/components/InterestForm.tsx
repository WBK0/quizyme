import Searchbar from "@/components/Searchbar";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import submitCompleteRegisterForm from "../submitForm";
import { useRouter } from 'next/navigation';
import { CompleteRegisterContext } from "../CompleteRegisterProvider";
import EasySpinner from "@/components/Loading/EasySpinner";

const interests = ['✈️ Traveling', '🏎️ Racing', '⚽ Sports', '📘 Study', '🛠️ Crafts', '🖥️ IT', '🎨 Art', '🎵 Music', '📚 Reading', '🎮 Gaming', '🍳 Cooking', '🌿 Gardening', '🏄‍♂️ Surfing', '🚵‍♂️ Cycling', '🎭 Theater', '🏋️‍♂️ Fitness', '🧘‍♀️ Yoga', '🎬 Movies', '🎤 Singing', '🐶 Pet care', '🎯 Archery', '🎻 Playing an instrument', '📷 Photography', '🍷 Wine tasting'];

const InterestForm = () => {
  const [loading, setLoading] = useState(false);
  const { formValues, setStep, step } = useContext(CompleteRegisterContext);
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const router = useRouter()

  const handleSubmit = async (e : React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    let tempValues = {...formValues, interests: selectedInterests};
    const submittedForm = await submitCompleteRegisterForm(tempValues);
    if(submittedForm){
      router.push('/auth/complete-register/callback');
    }
    setLoading(false);
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
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white hover:scale-105 duration-300"
        >
          {
            loading ?
              <EasySpinner />
            : "Finish"
          }
        </button>
        <button
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white mt-2 hover:scale-105 duration-300"
          onClick={() => setStep(step - 1)}
        >
          Previous step
        </button>
      </div>
    </form>
  )
}

export default InterestForm;