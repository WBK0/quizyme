import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import Searchbar from "@/components/Searchbar";
import { useEffect, useState } from "react";

type StudiedModalProps = {
  handleCloseModal: () => void;
  variant: 'quized' | 'learned';
  username: string;
}

type UserData = {
  id: string,
  topic: string,
  tags: string[],
  image: string,
  description: string,
  numberOfQuestions: number,
  createdAt: Date,
  correctAnswers: number,
  points: string,
  createdBy: {
    id: string,
    username: string,
    image: string,
    name: string
  }
}[] | null;

const StudiedModal = ({ handleCloseModal, variant, username} : StudiedModalProps) => {
  const colors = ['purple', 'yellow', 'green', 'lightblue']
  const [data, setData] = useState<UserData>(null);

  const getData = async () => {
    const url = variant === 'quized' ? `${process.env.NEXT_PUBLIC_API}/user/${username}/quized` : `${process.env.NEXT_PUBLIC_API}/user/${username}/learned`;

    const response = await fetch(url, {
      method: 'GET'
    });

    const json = await response.json();

    setData(json.data);
  }

  useEffect(() => {
    getData();
  }, [])

  return(
  <div className="fixed bg-black/50 z-30 w-full h-screen top-0 left-0">
    <div className="flex items-center h-full justify-center">
      <div className="bg-white w-full max-w-5xl h-full max-h-[700px] relative rounded-2xl">
        <button className="absolute right-3 top-3 text-2xl font-black" onClick={handleCloseModal}>X</button>
        <div className="flex flex-col pt-10 items-center h-full px-3">
          <h2 className="font-bold text-center text-2xl uppercase">{variant}</h2>
          <div className="mt-8 max-w-2xl w-full">
            <Searchbar />
          </div>
          {
            data ?
              <div className="overflow-y-auto w-full mb-6 pr-3 scroll-sm">
                <div className="max-w-3xl mx-auto flex flex-col gap-6 pt-6">  
                  {
                    data.length > 0 ?
                      data.map((value, index) => (
                        <CardExtended 
                          key={value.id}
                          image={value.image}
                          to={`${process.env.NEXT_PUBLIC_URL}/study/${value.topic.replaceAll(' ', '-')}-${value.id}`}
                          color={colors[index % 4]}
                          type={variant}
                          topic={value.topic}
                          scored={Number(value.points)}
                          passed={value.correctAnswers}
                          authorName={value.createdBy.name}
                          authorImage={value.createdBy.image}
                          quantity={value.numberOfQuestions}
                        />
                      ))
                      : <h2 className="text-center font-bold text-xl mt-4">
                          This user has not complete any {variant === 'quized' ? 'quiz' : 'flashcards'} yet.
                        </h2>     
                  }   
                </div>
              </div>
            : <div className="flex justify-center items-center w-full h-full pb-12">
                <Spinner />
              </div>
          }
          
        </div>
      </div>
    </div>
  </div>
  )
}
export default StudiedModal;