import Button from "@/components/Button";
import CollectionCard from "@/components/CollectionCard";
import Link from "next/link";

type Data = {
  image: string;
  name: string;
}[];

const Collections = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/collections/list/top`);

  const json = await response.json();
  const data: Data = json.collection;

  const colors = ['purple', 'yellow', 'green', 'lightblue'];

  return (
    <div className="mt-28 px-3">
      <h2 className="font-bold text-3xl w-full mb-8">TOP COLLECTIONS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          data.map((collection, index) => (
            <CollectionCard
              key={index}
              image={collection.image}
              to={`/search?category=${collection.name}`}
              color={colors[index % 4]}
            >
              {collection.name}
            </CollectionCard>
          ))
        }
      </div>
      <Link href="/collections" className="flex justify-center w-full mt-12">
        <Button>
          SHOW ALL
        </Button>
      </Link>
    </div>
  )
}
export default Collections;