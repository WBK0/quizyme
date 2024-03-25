import Content from "./Content";

type Collection = {
  id: string;
  name: string;
  image: string;
}[];

const Collections = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/collections/list`);

  const json = await response.json();

  const data : Collection = json.collection;

  return (
    <div className="px-3">
      <Content 
        data={data}
      />
    </div>
  );
};

export default Collections;