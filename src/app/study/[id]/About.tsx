type DescriptionProps = {
  description: string;
  type: string;
  hashtags: string[];
}

const About = ({ description, type, hashtags } : DescriptionProps) => {
  return (
    <div className="mt-24 max-w-4xl mx-auto">
      <h2 className="font-black text-xl">Description</h2>
      <p className="font-semibold text-md mt-5">{description || `No description has been added to ${type === 'quiz' ? 'these flashcards' : 'the quiz'}.`}</p>
      <p className="mt-8 text-gray-300 font-bold">
        {hashtags.map((value) => (
          <span key={value}>{value} </span>
        ))}
      </p>
      <div className="px-6 py-1 text-white rounded-full font-bold mt-8 bg-lightblue w-fit">
        3 Days ago
      </div>
    </div>
  )
}
export default About;