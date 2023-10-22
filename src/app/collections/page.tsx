import Searchbar from "@/components/Searchbar";
import Image from "next/image";

const data = [
  {
    image: 'https://cdn.pixabay.com/photo/2023/10/06/07/14/plant-8297610_1280.jpg',
    title: 'title',
  },
  {
    image: '',
    title: 'title',
  },
  {
    image: '',
    title: 'title',
  },
  {
    image: '',
    title: 'title',
  },
  {
    image: '',
    title: 'title',
  },
  {
    image: '',
    title: 'title',
  },
  {
    image: '',
    title: 'title',
  },
  {
    image: '',
    title: 'title',
  },
  {
    image: '',
    title: 'title',
  },
  {
    image: '',
    title: 'title',
  }
]

const Collections = () => {
  let grid = 0;

  return (
    <div className="">
      <div className="flex flex-col items-center max-w-3xl mx-auto px-3">
        <h1 className="font-bold text-4xl">COLLECTIONS</h1>
        <Searchbar />
      </div>
      
      <div className="grid grid-cols-3 gap-4 w-full mt-16">
        {
          data.map((collection, index) => {
            grid++;
            if(grid == 11){
              grid = 1
            }
            return(
            <div className={`bg-gray-500 w-full bg-cover bg-no-repeat	bg-center
              ${grid < 4 ? 'col-span-1 h-80' : ''}
              ${grid == 4 ? 'col-span-2 h-80' : ''}
              ${grid == 5 ? 'col-span-1 h-80' : ''}
              ${grid == 6 ? 'col-span-1 h-80' : ''}
              ${grid == 7 ? 'col-span-2 row-span-2' : ''}
              ${grid == 8 ? 'col-span-1 h-80' : ''}
              ${grid == 9 ? 'col-span-1 h-80' : ''}
              ${grid == 10 ? 'col-span-2 h-80' : ''}
            `}
              style={{
                backgroundImage: `url(${collection.image})`,
              }}
            >
            </div>
          )})
        }
      </div>
    </div>
  )
}
export default Collections;