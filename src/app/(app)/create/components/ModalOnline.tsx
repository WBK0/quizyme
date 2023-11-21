import { useEffect, useState } from "react";
import Image from "next/image";
import Searchbar from "@/components/Searchbar";
import Spinner from "@/components/Loading/Spinner";

type Result = {
  webformatURL: string;
}[]

type ModalOnlineProps = {
  value: {
    mainImage: string;
  };
  setValue: (value: {}) => void;
}

const ModalOnline = ({ value, setValue } : ModalOnlineProps) => {
  const [results, setResults] = useState<Result>([]);

  const getResults = async () => {
    const response = await fetch('/api/pixabay', {
      method: 'POST',
      body: JSON.stringify({
        query: ''
      })
    })
    const json = await response.json();
    setResults(json.hits);
  }

  useEffect(() => {
    getResults();
  }, [])

  return (
    <>
      <div className="w-full">
        <div className="max-w-xl mx-auto mt-6">
          <Searchbar />
        </div>
      </div> 
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-10 w-full overflow-y-auto scroll-sm pt-2"
      >
        {results.length > 1 ? results.map((result) => (
          <Image 
            key={result.webformatURL}
            src={result.webformatURL} 
            alt="result" 
            width={275} 
            height={275} 
            className="rounded-xl aspect-video hover:scale-105 duration-300 cursor-pointer"
          />
        ))
        :
          <Spinner />
        }
      </div>
    </>
  )
}
export default ModalOnline;