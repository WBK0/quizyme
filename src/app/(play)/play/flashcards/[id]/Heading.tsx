const Heading = () => {
  return (
    <div className="flex flex-col px-3">
      <h2 className="font-bold text-lg">Biologia - rozkład komórek definicje</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8 gap-4 xl:gap-6">
        <button
          className="bg-black text-white shadow-small shadow-green rounded-2xl w-full py-2 font-bold duration-300 hover:scale-105 hover:shadow-transparent"
        >
          Flashcards
        </button>
        <button
          className="bg-black text-white shadow-small shadow-green w-full rounded-2xl py-2 font-bold duration-300 hover:scale-105 hover:shadow-transparent"
        >
          Test
        </button>
        <button
          className="bg-black text-white shadow-small shadow-green rounded-2xl py-2 font-bold duration-300 hover:scale-105 hover:shadow-transparent"
        >
          Learn only liked
        </button>
        <button
          className="bg-black text-white shadow-small shadow-green rounded-2xl py-2 font-bold duration-300 hover:scale-105 hover:shadow-transparent"
        >
          Learn only unliked
        </button>
      </div>
    </div>
  )
}

export default Heading;