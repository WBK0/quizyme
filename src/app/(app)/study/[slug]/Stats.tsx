interface StatsProps {
  stats: {
    learned?: number;
    played?: number;
    favorited: number;
    shared: number;
    questions?: number;
    flashcards?: number;
  };
  type: 'quiz' | 'flashcards';
}

const Stats = ({ stats, type } : StatsProps) => {
  return (
    <div className="max-w-2xl mx-auto flex justify-center gap-3 flex-wrap sm:gap-10 mt-8">
      <div>
        <h3 className="text-center text-gray-300 font-semibold text-sm">{type === 'quiz' ? 'Played' : 'Learned'}</h3>
        <p className="text-center font-bold">{type === 'quiz' ? stats.played : stats.learned}</p>
      </div>
      <div>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Favorited</h3>
        <p className="text-center font-bold">{stats.favorited}</p>
      </div>
      <div>
        <h3 className="text-center text-gray-300 font-semibold text-sm">Shared</h3>
        <p className="text-center font-bold">{stats.shared}</p>
      </div>
      <div>
        <h3 className="text-center text-gray-300 font-semibold text-sm capitalize">{type === 'quiz' ? 'Questions' : 'Flashcards'}</h3>
        <p className="text-center font-bold">{type === 'quiz' ? stats.questions : stats.flashcards}</p>
      </div>
    </div>
  )
}
export default Stats;