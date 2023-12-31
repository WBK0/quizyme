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
              to={`/study/${recommendation.topic}-${recommendation.id}`}
              color={colors[index]}
              type={type}
              topic={recommendation.topic}
              authorId={recommendation.user.id}
              quantity={type === 'quiz' ? recommendation.questions.length : recommendation.flashcards.length}
            />
          ))
        }
        {/* <Card 
            image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
            to="/"
            color="purple"
            type="quiz"
            topic="Cosmos"
            authorId="1"
            quantity={18}
          />
          <Card 
            image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
            to="/"
            color="green"
            type="quiz"
            topic="Cosmos"
            authorId="1"
            quantity={18}
          />
          <Card 
            image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
            to="/"
            color="yellow"
            type="quiz"
            topic="Cosmos"
            authorId="1"
            quantity={18}
          /> */}
        </div>
    </div>
  )
}
export default Recommendations;