"use client";
import SelectButton from "@/components/SelectButton";
import useUrlParams from "@/hooks/useUrlParams";
import { useEffect } from "react";

const SelectVariants = () => {
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
    <div>
      <div className="mt-8">
        <SelectButton 
          options={[
            'invitations', 'wishlist', 'my results'
          ]}
          paramsName="option"
        />
      </div>
      <div className="mt-4">
        <SelectButton 
          options={[
            'quizzes', 'flashcards'
          ]}
        />
      </div>
    </div>
  )
}
export default SelectVariants;