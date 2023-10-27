import CardExtended from "@/components/CardExtended";

type StudiesProps = {
  type: string;
  content: {
    image: string;
    to: string;
    type: string;
    topic: string;
    authorId: string;
  }[];
}

const Studies = ({ type, content } : StudiesProps) => {
  const colors = ['purple', 'green', 'yellow', 'lightblue'];

  return (
    <div className="mt-24 max-w-3xl mx-auto">
      {
        content.length > 0 ? (
          <>
            <h1 className="font-black text-3xl">{content.length} {type === 'quizzes' ? 'QUIZZES' : 'FLASHCARDS'}</h1>
            <div>
              {content.map((value, index) => (
                <CardExtended 
                  key={value.to}
                  image={value.image}
                  to={value.to}
                  color={colors[index % 4]}
                  type={value.type}
                  topic={value.topic}
                  authorId={value.authorId}
                />
              ))}
            </div>
          </>
        )
        : (
          <h1 className="font-extrabold text-center text-2xl">
            This user doesn't have any {type}
          </h1>
        )
      }
    </div>
  )
}
export default Studies