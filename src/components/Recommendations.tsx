import Card from "@/components/Card";

const Recommendations = async ({ type } : { type : string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/recommendations/${type}`, {
    cache: 'no-cache',
  });

  const recommendations = await response.json();

  const colors = ['purple', 'green', 'yellow']

  return (
    <div className="mt-36 max-w-6xl mx-auto">
      <h3 className="mb-6 font-black text-xl">Recommendations</h3>
      <div className="flex flex-col md:flex-row gap-8">
        {
          recommendations.data.map((recommendation : any, index : number) => (
            <Card 
              key={recommendation.id}
              image={recommendation.image}
              to={`/study/${recommendation.topic.replaceAll(' ', '-')}-${recommendation.id}`}
              color={colors[index]}
              type={type}
              topic={recommendation.topic}
              authorImage={recommendation.user.image}
              authorName={recommendation.user.name}
              quantity={type === 'quiz' ? recommendation.questions.length : recommendation.flashcards.length}
            />
          ))
        }
      </div>
    </div>
  )
}
export default Recommendations;