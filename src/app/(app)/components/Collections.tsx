import Button from "@/components/Button";
import CollectionCard from "@/components/CollectionCard";
import Link from "next/link";

const Collections = () => {
  return (
    <div className="mt-28 px-3">
      <h2 className="font-bold text-3xl w-full mb-8">TOP COLLECTIONS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CollectionCard
          image="https://files.niezalezna.tech/images/upload/2023/09/04/n_deb51ce136208eca36b80cc2bf382128f7ba3739da8d6bb25f91502c039944ad_c.jpg?r=1,1"
          to="/"
          color="purple"
        >
          School
        </CollectionCard>
        <CollectionCard
          image="https://cdn.pixabay.com/photo/2021/06/04/06/54/racket-6308994_640.jpg"
          to="/"
          color="yellow"
        >
          Sports
        </CollectionCard>
        <CollectionCard
          image="https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_640.png"
          to="/"
          color="green"
        >
          IT
        </CollectionCard>
        <CollectionCard
          image="https://cdn.pixabay.com/photo/2016/11/09/15/27/dna-1811955_640.jpg"
          to="/gd"
          color="lightblue"
        >
          Chemistry
        </CollectionCard>
      </div>
      <Link href="/" className="flex justify-center w-full mt-12">
        <Button>
          SHOW ALL
        </Button>
      </Link>
    </div>
  )
}
export default Collections;