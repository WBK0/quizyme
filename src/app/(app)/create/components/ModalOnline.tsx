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

  let timeoutId : NodeJS.Timeout;

  const onChangeInput = (e : string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  
    timeoutId = setTimeout(() => {
      getResults(e);
      console.log(e);
    }, 1200);
  };

  const handleClick = async (url: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CDN_URL}/upload-from-url`, {
      method: 'POST',
      body: JSON.stringify({
        'imageUrl': url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const json = await response.json();

    setValue({
      ...value,
      mainImage: json.url
    })

  }

  const getResults = async (query ?: string) => {
    const response = await fetch('/api/pixabay', {
      method: 'POST',
      body: JSON.stringify({
        query: query ? query : ''
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
          <Searchbar 
            onChange={onChangeInput}
          />
        </div>
      </div> 
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-10 w-full overflow-y-auto scroll-sm pt-2"
      >
        {results.length > 1 ? results.map((result) => (
          <div
            className="aspect-video hover:scale-105 duration-300 cursor-pointer relative w-full sm:w-[275px] md:w-[285px]"
            key={result.webformatURL}
          >
            <Image 
              src={result.webformatURL} 
              fill={true}
              sizes="100%"
              alt="result" 
              className="rounded-xl"
              onClick={() => handleClick(result.webformatURL)}
            />
          </div>
        ))
        :
          <Spinner />
        }
      </div>
    </>
  )
}
export default ModalOnline;