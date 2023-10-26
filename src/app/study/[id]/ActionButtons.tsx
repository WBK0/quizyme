import Button from "@/components/Button";

const ActionButtons = () => {
  return (
    <div className="fixed bottom-2 inset-x-0 flex items-center justify-center gap-2 sm:gap-4 px-2 max-w-md mx-auto">
      <button className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-md">
        GO QUIZ
      </button>
      <button 
        className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-xs"
      >
        ADD TO WISHLIST
      </button>
    </div>
  )
}
export default ActionButtons;