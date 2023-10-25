import CollectionCard from "@/components/CollectionCard";
import Searchbar from "@/components/Searchbar";

const data = [
  {
    image: 'https://cdn.pixabay.com/photo/2023/10/06/07/14/plant-8297610_1280.jpg',
    title: 'Autumn',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/10/01/19/47/ducks-8288033_640.jpg',
    title: 'Ducks',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/07/23/08/46/flower-8144644_640.jpg',
    title: 'Flowers',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/10/14/23/27/airplane-8315886_640.jpg',
    title: 'Planes',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/09/21/17/05/european-shorthair-8267220_640.jpg',
    title: 'Cats',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/09/16/22/05/japan-8257601_640.jpg',
    title: 'Waterfalls',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/09/23/11/26/bird-8270719_640.jpg',
    title: 'Birds',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/09/15/05/38/motorboat-8254157_640.jpg',
    title: 'Water sports',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/09/25/19/52/bear-8275920_640.jpg',
    title: 'Bears',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/09/16/15/38/drink-8257030_640.jpg',
    title: 'Wine',
  }
]

const Collections = () => {
  let grid = 0;

  // Colors for each card
  const colors = ['purple', 'yellow', 'green', 'lightblue'];

  // Calculate grid for each card
  const calculateGrid = () => {
    grid++;
    if (grid === 13) {
      grid = 1;
    }
    return grid;
  };

  return (
    <div className="px-3">
      <div className="flex flex-col items-center max-w-3xl mx-auto px-3">
        <h1 className="font-bold text-4xl mb-14">COLLECTIONS</h1>
        <Searchbar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-16">
        {data.map((collection, index) => {
          const currentGrid = calculateGrid();

          let gridClass = '';

          // Set grid for each card
          switch (currentGrid) {
            case 5:
              gridClass = 'col-span-1 sm:col-span-2 sm:row-span-2';
              break;
            case 7:
              gridClass = 'col-span-1 sm:col-span-2 sm:row-span-2 xl:col-span-1 xl:row-span-1';
              break;
            case 11:
              gridClass = 'col-span-1 sm:col-span-2 sm:row-span-2 xl:col-span-1 xl:row-span-1';
              break;
            case 12:
              gridClass = 'col-span-1 xl:col-span-2 xl:row-span-2';
              break;
            default:
            gridClass = 'col-span-1';
            break;
          }

          return (
            <div
              key={index}
              className={`w-full hover:z-10 ${gridClass}`}
            >
              <CollectionCard image={collection.image} to="/search?cat=test" color={colors[index % 4]}>
                {collection.title}
              </CollectionCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;