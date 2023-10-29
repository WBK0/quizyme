import CardExtended from "@/components/CardExtended";
import Searchbar from "@/components/Searchbar";

type StudiedModalProps = {
  handleCloseModal: () => void;
  variant: 'quized' | 'learned';
}

const data = [
  {
    image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
    to: "/",
    type: "quiz",
    topic: "Cosmos",
    authorId: "1"
  },
  {
    image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
    to: "/",
    type: "quiz",
    topic: "Cosmos",
    authorId: "1"
  },
  {
    image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
    to: "/",
    type: "quiz",
    topic: "Cosmos",
    authorId: "1"
  },
  {
    image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
    to: "/",
    type: "quiz",
    topic: "Cosmos",
    authorId: "1"
  },
  {
    image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
    to: "/",
    type: "quiz",
    topic: "Cosmos",
    authorId: "1"
  },
  {
    image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
    to: "/",
    type: "quiz",
    topic: "Cosmos",
    authorId: "1"
  }
]

const StudiedModal = ({ handleCloseModal, variant} : StudiedModalProps) => {
  const colors = ['purple', 'yellow', 'green', 'lightblue']

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
          <div className="overflow-y-auto w-full mb-6 mt-6 pr-3 scroll-sm">
            <div className="max-w-3xl mx-auto">  
              {
                data.map((user, index) => (
                  <CardExtended 
                    key={index}
                    image={user.image}
                    to={user.to}
                    color={colors[index % 4]}
                    type={user.type}
                    topic={user.topic}
                    authorId={user.authorId}
                  />
                ))
              }   
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default StudiedModal;