const Actions = () => {
  return (
    <div>
      <div className="relative">
        <div className="absolute right-0 flex flex-col gap-3">
          <button
            type="button"
            className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-48"
          >
            Public
          </button>
          <button
            type="button"
            className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-blue hover:scale-105 duration-300 w-48"
          >
            Update Details
          </button>
          <button
            type="button"
            className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300 w-48"
          >
            Delete 
          </button>
        </div>        
      </div>
    </div>
  )
}
export default Actions