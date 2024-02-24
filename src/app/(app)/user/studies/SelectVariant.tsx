"use client";
import SelectButton from "@/components/SelectButton";
import useUrlParams from "@/hooks/useUrlParams";
import { useEffect } from "react";

const SelectVariant = () => {
  const { getParams, changeParams } = useUrlParams();
  const params = getParams();

  useEffect(() => {
    if (!params.type || params.type === 'invitations') {
      changeParams({
        type: 'quizzes',
        option: 'invitations'
      })
    }
  }, [params.type])
  
  return (
    <div className="mt-8">
      <SelectButton 
        options={['quizzes', 'flashcards']}
        paramsName="type"
      />
    </div>
  )
}

export default SelectVariant;