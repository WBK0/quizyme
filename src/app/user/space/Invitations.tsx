import CardExtended from "@/components/CardExtended";

const data = {
  quizzes: [
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski"
    }
  ],
  flashcards: [
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1",
      invitedBy: "Adam Kowalski"
    }
  ]
}

const Invitations = ({ type } : {type: 'quizzes' | 'flashcards'}) => {
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
            showDelete={true}
            invitedBy={card.invitedBy}
          />
        ))
      }   
    </div>
  )
}
export default Invitations;