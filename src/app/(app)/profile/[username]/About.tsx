type AboutProps = {
  firstname: string;
  description: string;
  interests: string[];
}

const About = ({ firstname, description, interests } : AboutProps) => {
  return (
    <div className="mt-24 max-w-3xl mx-auto">
      <h1 className="font-black text-3xl">
        About {firstname}
      </h1>
      <p className="mt-8 font-semibold">
        {description}
      </p>
      <h2 className="font-extrabold mt-14 text-2xl">
        Interests
      </h2>
      <div className="flex flex-wrap gap-3 mt-6">
        {interests.length > 0 && interests.map((value) => (
          <div key={value} className="px-3 sm:px-6 py-1 text-black rounded-full font-bold bg-gray-100 w-fit hover:bg-gray-200">
            {value}
          </div>
        ))}
      </div>
    </div>
  )
}
export default About;