import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import Stats from "../Stats";
import Ranking from "./Ranking";
import Buttons from "./Buttons";

const Results = async ({ params }: { params: { slug: string }}) => {
  const { slug } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${slug}`, {
    cache: "no-cache",
  });

  const study = await response.json();
  
  return (
    <div>
      <div className="max-w-2xl flex flex-col items-center mx-auto">
        <Image src={study.data.image} alt='Study Image' width={672} height={378} className="w-full rounded-2xl shadow-medium shadow-lightblue aspect-video" />
        <Stats 
          stats={study.data.stats}
          type={study.data.type}
        />
        <h1 className="text-center font-bold text-xl mt-8">
          Ranking of <span className="font-black">{study.data.topic}</span> {study.data.type}!
        </h1>
      </div>
      <Ranking 
        slug={slug} 
        type={study.data.type} 
        questionLength={study.data.stats.questions || study.data.stats.flashcards}
      />
      <Buttons 
        slug={slug}
      />
    </div>
  )
}

export default Results;