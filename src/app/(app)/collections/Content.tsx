"use client";
import CollectionCard from "@/components/CollectionCard";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";

type ContentProps = {
  data: {
    id: string;
    image: string;
    name: string;
  }[];
};

const Content = ({ data } : ContentProps) => {
  const [search, setSearch] = useState('');

  let grid = 0;

  const colors = ['purple', 'yellow', 'green', 'lightblue'];

  // Calculate grid for each card
  const calculateGrid = () => {
    grid++;
    if (grid === 18) {
      grid = 1;
    }
    return grid;
  };

  return (
    <>
      <div className="flex flex-col items-center max-w-3xl mx-auto px-3">
        <h1 className="font-bold text-4xl mb-14">COLLECTIONS</h1>
        <Searchbar 
          value={search}
          onChange={(value) => setSearch(value)}
        />
      </div>

        {
          data.filter((collection) => collection.name.toLowerCase().includes(search.toLowerCase())).length > 0 ?
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-16">
            {data.filter((collection) => collection.name.toLowerCase().includes(search.toLowerCase())).map((collection, index) => {
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
                  <CollectionCard image={collection.image} to={`/search?category=${collection.name}`} color={colors[index % 4]}>
                    {collection.name}
                  </CollectionCard>
                </div>
              );
            })}
          </div>
          : (
            <div className="w-full flex justify-center items-center">
              <p className="text-2xl font-bold pt-8">No collections found</p>
            </div>
          )
        }
    </>
  )
}

export default Content;