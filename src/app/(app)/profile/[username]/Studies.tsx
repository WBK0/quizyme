import CardExtended from "@/components/CardExtended";
import UserData from "./UserData.type";

type StudiesProps = {
  type: string;
  content: UserData['quizzes'] | UserData['flashcards'];
  authorName: string;
  authorImage: string;
};

const Studies = ({ type, content, authorName, authorImage } : StudiesProps) => {
  const colors = ['purple', 'green', 'yellow', 'lightblue'];

  return (
    <div className="mt-24 max-w-3xl mx-auto">
      {
        content.length > 0 ? (
          <>
            <h1 className="font-black text-3xl">{content.length} {type === 'quiz' ? 'QUIZZES' : 'FLASHCARDS'}</h1>
            <div>
              {content.map((value, index) => (
                <CardExtended 
                  key={value.id}
                  image={value.image}
                  to={`${process.env.NEXT_PUBLIC_URL}/study/${value.topic.replaceAll(' ', '-')}-${value.id}`}
                  color={colors[index % 4]}
                  type={type}
                  topic={value.topic}
                  authorName={authorName}
                  authorImage={authorImage}
                  quantity={
                    type === 'quiz'
                      ? (value as UserData['quizzes'][number]).numberOfQuestions
                      : (value as UserData['flashcards'][number]).numberOfFlashcards
                  }
                />
              ))}
            </div>
          </>
        )
        : (
          <h1 className="font-extrabold text-center text-2xl">
            This user doesn't have any {type === 'quiz' ? 'quizzes' : 'flashcards'}
          </h1>
        )
      }
    </div>
  )
}
export default Studies;