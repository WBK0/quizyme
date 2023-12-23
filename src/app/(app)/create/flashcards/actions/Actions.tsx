import { useContext, useEffect, useState } from "react"
import Buttons from "./Buttons";
import Modal from "./Modal";
import { DataContext } from "@/providers/create-flashcards/DataProvider";

const Actions = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [modal, setModal] = useState<'publish' | 'delete' | null>(null);
  const [ length, setLength ] = useState(0);

  const { formValues, lastEditted } = useContext(DataContext);

  useEffect(() => {
    const flashcardsLength = formValues.filter((value) => { 
      return value.concept !== "" && value.definition !== "";
    }).length;

    setLength(flashcardsLength);
  }, [lastEditted])

  const handleShowButtons = () => {
    setShowButtons(!showButtons);
  }

  return (
    <div>
      <div className="relative">
        <div className="xl:hidden justify-end flex">
          <button className="flex font-bold items-center mb-6" onClick={handleShowButtons}>
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
        <div>
           <div className="xl:hidden flex gap-3 flex-col">
              {
                showButtons
                ? <Buttons setModal={setModal} />
                : null
              } 
            </div>
            <div className="hidden xl:flex xl:flex-col gap-4">
              <Buttons setModal={setModal} />
            </div>  
        </div>      
      </div>
      {
        modal 
        ? <Modal 
            handleCloseModal={() => setModal(null)}
            modal={modal}
            length={length}
          />
        : null
      }
    </div>
  )
}
export default Actions