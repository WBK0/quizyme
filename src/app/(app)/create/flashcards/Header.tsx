import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import { useContext } from "react";

const Header = ({ method } : { method: 'create' | 'update'}) => {
  const { fields } = useContext(UseFormContext);
  
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center font-black uppercase text-3xl">{method === 'create' ? 'Add' : 'Update'} flashcards</h1>
      <p className="text-center font-semibold">You have currently created {fields.length} flashcards in this set</p>
    </div>
  )
}
export default Header;