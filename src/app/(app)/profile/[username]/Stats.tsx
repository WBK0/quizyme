import UserData from "./UserData.type";

interface StatsProps {
  data: UserData
  setShowModal: React.Dispatch<React.SetStateAction<number>>;
}

const Stats = ({ data, setShowModal } : StatsProps) => {
  return (
    <div className="max-w-2xl mx-auto flex justify-center gap-3 flex-wrap sm:gap-10 mt-8">
      <div className="cursor-pointer" onClick={() => setShowModal(1)}>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Quized</h3>
        <p className="text-center font-bold">{data.playedQuizzes}</p>
      </div>
      <div className="cursor-pointer" onClick={() => setShowModal(2)}>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Learned</h3>
        <p className="text-center font-bold">{data.playedFlashcards}</p>
      </div>
      <div className="cursor-pointer" onClick={() => setShowModal(3)}>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Followers</h3>
        <p className="text-center font-bold">{data.followers}</p>
      </div>
      <div className="cursor-pointer" onClick={() => setShowModal(4)}>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Following</h3>
        <p className="text-center font-bold">{data.following}</p>
      </div>
    </div>
  )
}
export default Stats;