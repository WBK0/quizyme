const Heading = () => {
  return (
    <div className="bg-white w-full flex flex-wrap items-center md:gap-32 gap-4">
      <div className="flex-1 md:flex-none">
        <h6 className="font-bold text-lg w-fit">3/12</h6>
      </div>
      <div className="relative bg-gray-300 rounded-full h-2 flex-auto order-last md:order-none md:w-fit w-full">
        <div className="bg-blue w-2/3 h-2 rounded-full"></div>
      </div>
      <div className="flex-1 md:flex-none justify-end flex">
        <button className="bg-red text-white px-6 rounded-full py-1 font-bold w-fit">
          END QUIZ
        </button>
      </div>
    </div>
  )
}
export default Heading;