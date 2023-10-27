import Card from "@/components/Card";

const Recommendations = () => {
  return (
    <div className="mt-36 max-w-6xl mx-auto">
      <h3 className="mb-6 font-black text-xl">Recommendations</h3>
      <div className="flex flex-col md:flex-row gap-8">
        <Card 
            image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
            to="/"
            color="purple"
            type="quiz"
            topic="Cosmos"
            authorId="1"
          />
          <Card 
            image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
            to="/"
            color="green"
            type="quiz"
            topic="Cosmos"
            authorId="1"
          />
          <Card 
            image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
            to="/"
            color="yellow"
            type="quiz"
            topic="Cosmos"
            authorId="1"
          />
        </div>
    </div>
  )
}
export default Recommendations;