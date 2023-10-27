interface StatsProps {
  stats: {
    quizzed: number;
    learned: number;
    followers: number;
    following: number;
  };
}

const Stats = ({ stats } : StatsProps) => {
  return (
    <div className="max-w-2xl mx-auto flex justify-center gap-3 flex-wrap sm:gap-10 mt-8">
      <div className="cursor-pointer">
        <h3 className="text-center text-gray-300 font-semibold text-sm">Quized</h3>
        <p className="text-center font-bold">{stats.quizzed}</p>
      </div>
      <div className="cursor-pointer">
        <h3 className="text-center text-gray-300 font-semibold text-sm">Learned</h3>
        <p className="text-center font-bold">{stats.learned}</p>
      </div>
      <div className="cursor-pointer">
        <h3 className="text-center text-gray-300 font-semibold text-sm">Followers</h3>
        <p className="text-center font-bold">{stats.followers}</p>
      </div>
      <div className="cursor-pointer">
        <h3 className="text-center text-gray-300 font-semibold text-sm">Following</h3>
        <p className="text-center font-bold">{stats.following}</p>
      </div>
    </div>
  )
}
export default Stats;