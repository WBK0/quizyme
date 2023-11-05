import CardExtended from "@/components/CardExtended";

const data = {
  quizzes: [
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski",
      quantity: 18,
      scored: 4534,
      passed: 15
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski",
      quantity: 18,
      scored: 4534,
      passed: 15
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski",
      quantity: 18,
      scored: 4534,
      passed: 15
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski",
      quantity: 18,
      scored: 4534,
      passed: 15
    }
  ],
  flashcards: [
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski",
      quantity: 18,
      status: 'Learned'
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski",
      quantity: 18,
      status: 'Learning'
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski",
      quantity: 18,
      status: 'Learning'
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski",
      quantity: 18,
      status: 'Learning'
    }
  ]
}

const Results = ({ type } : { type: 'quizzes' | 'flashcards'}) => {
  const colors = ['purple', 'yellow', 'green', 'lightblue']

  return (
    <div className="max-w-4xl mx-auto">
      {
        data[type].map((card, index) => (
          <CardExtended 
            key={index}
            image={card.image}
            to={card.to}
            color={colors[index % 4]}
            type={card.type}
            topic={card.topic}
            authorId={card.authorId}
            quantity={card.quantity}
            passed={(card as any).passed}
            scored={(card as any).scored}
            status={(card as any).status}
          />
        ))
      }   
      <h2 className="mt-24 text-center font-black text-xl">Sorry, we couldn't find any more {type} matching your search results </h2>
    </div>
  )
}
export default Results;