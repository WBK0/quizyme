const Stats = () => {
  return (
    <div className="max-w-2xl mx-auto flex justify-center gap-3 flex-wrap sm:gap-10 mt-8">
      <div>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Played</h3>
        <p className="text-center font-bold">342</p>
      </div>
      <div>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Favorited</h3>
        <p className="text-center font-bold">342</p>
      </div>
      <div>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Shared</h3>
        <p className="text-center font-bold">342</p>
      </div>
      <div>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Questions</h3>
        <p className="text-center font-bold">342</p>
      </div>
    </div>
  )
}
export default Stats;