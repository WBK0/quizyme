type DescriptionProps = {
  description: string;
  type: string;
  hashtags: string[];
  updatedAt: string;
}

const About = ({ description, type, hashtags, updatedAt } : DescriptionProps) => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - new Date(updatedAt).getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <div className="mt-24 max-w-4xl mx-auto">
      <h2 className="font-black text-xl">Description</h2>
      <p className="font-semibold text-md mt-5">{description || `No description has been added to ${type === 'quiz' ? 'these flashcards' : 'the quiz'}.`}</p>
      <p className="mt-8 text-gray-300 font-bold">
        {hashtags.map((value) => (
          <span key={value}>#{value.trimRight().replaceAll(" ", "_")} </span>
        ))}
      </p>
      <div className="px-6 py-1 text-white rounded-full font-bold mt-8 bg-lightblue w-fit">
        {daysAgo === 0 ? 'Today' : daysAgo < 30 ? `${daysAgo} days ago` : daysAgo < 365 ? `${Math.floor(daysAgo / 30)} ${Math.floor(daysAgo / 30) === 1 ? 'month' : 'months'} ago` : `${Math.floor(daysAgo / 365)} years ago`}
      </div>
    </div>
  )
}
export default About;