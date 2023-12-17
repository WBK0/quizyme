import { useContext, useState } from "react";
import { DataContext } from "@/providers/create-quiz/DataProvider";
import ConfirmModal from "./ConfirmModal";
import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import Buttons from "./Buttons";

const QuizActions = () => {
  const [showButtons, setShowButtons] = useState(false);
  const { formValues } = useContext(DataContext);
  const { watch } = useContext(UseFormContext);
  const [ modal, setModal ] = useState<'publish' | 'delete' | null>(null);

  const handleShowButtons = () => {
    setShowButtons(!showButtons);
  }

  const handleModal = (action : 'publish' | 'delete' | null) => { 
    setModal(action);
  }

  return (
    <div>
      <div className="xl:absolute relative flex flex-col gap-4 xl:top-0 left-1/2 transform -translate-x-1/2 xl:right-0 xl:translate-x-0 xl:left-auto xl:mt-0 w-full xl:w-fit">
        <div className="xl:hidden justify-end flex">
          <button className="flex font-bold items-center" onClick={handleShowButtons}>
            <p>
              Quiz options
            </p> 
            <svg
              width="32"
              height="32"
              viewBox="0 6 32 20"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-all ${showButtons ? 'rotate-0' : 'rotate-90'} duration-300`}
            >
              <path d="M6 10l10 10 10-10" />
            </svg>
          </button>
        </div>
        <div className="xl:hidden flex gap-3 flex-col">
          {
            showButtons
            ? <Buttons handleModal={handleModal} />
            : null
          } 
        </div>
        <div className="hidden xl:flex xl:flex-col gap-4">
          <Buttons handleModal={handleModal}/>
        </div>
        
      </div>
      {
        modal ? (
          <ConfirmModal 
            handleCloseModal={() => handleModal(null)}
            questions={formValues.length}
            warning={watch('question').length > 0 ? 'You have unsaved questions' : ''}
            type={modal}
          />
        )
        : null
      }
    </div>
  )
}

export default QuizActions;