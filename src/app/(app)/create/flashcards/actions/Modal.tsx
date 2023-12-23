type ModalProps = {
  modal: 'publish' | 'delete' | null;
  handleCloseModal: () => void;
  length: number;
}

const Modal = ({ modal, handleCloseModal, length } : ModalProps) => {
  return (
    <div className="fixed bg-black/50 z-30 w-full h-screen top-0 left-0">
      <div className="flex items-center h-full justify-center">
        <div className="bg-white w-full max-w-lg h-fit min-h-[300px] relative rounded-2xl pb-2 sm:px-6 px-3 flex justify-between flex-col">
          <div>
            <h2 className="font-bold text-2xl text-center mt-8">Are you sure you want to {modal} this flashcards set?</h2>
            <h6 className="text-center font-semibold text-lg mt-5">Your set of flashcards contains {length} concepts</h6>
          </div>
          <div className="flex py-5 gap-4">
            <button 
              className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-blue hover:scale-105 duration-300 capitalize"
            >
              {modal}
            </button>
            <button 
              type="button"
              className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300"
              onClick={handleCloseModal}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal;