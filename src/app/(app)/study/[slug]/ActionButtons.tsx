type ActionButtonsProps = {
  type: string;
}

const ActionButtons = ({ type } : ActionButtonsProps) => {
  return (
    <div className="fixed bottom-3 inset-x-0 flex items-center justify-center gap-2 sm:gap-4 px-2 max-w-md mx-auto">
      <button className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-md shadow-small shadow-lightblue hover:shadow-none">
        GO {type === 'quiz' ? 'QUIZ' : 'LEARN'}
      </button>
      <button 
        className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-xs shadow-small shadow-yellow hover:shadow-none"
      >
        ADD TO WISHLIST
      </button>
    </div>
  )
}
export default ActionButtons;