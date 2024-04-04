import { useEffect, useState } from "react";
import Image from "next/image";
import Searchbar from "@/components/Searchbar";
import Spinner from "@/components/Loading/Spinner";

type Result = {
  webformatURL: string;
  largeImageURL: string;
}[]

type ModalOnlineProps = {
  setImage?: (value: string) => void;
}

const ModalOnline = ({ setImage } : ModalOnlineProps) => {
  const [results, setResults] = useState<Result>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isImageMax, setIsImageMax] = useState(false);
  const [loading, setLoading] = useState(true);

  let timeoutId : NodeJS.Timeout;

  const onChangeInput = (e : string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  
    timeoutId = setTimeout(() => {
      setLoading(true);
      setQuery(e);
      setPage(1);
      setResults([]);
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

    setImage && setImage(json.url)
  }

  const fetchData = async () => {
    setIsImageMax(false);
    const response = await fetch('/api/pixabay', {
      method: 'POST',
      body: JSON.stringify({
        query: query ? query : '',
        page: page ? page : 1,
      }),
    });
    let json = await response.json();

    const newResults = results.concat(json.hits);

    if(json.hits.length < 21){
      setIsImageMax(true);
    }

    setResults(newResults)
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [query, page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      if(page * 21 == results.length){
        setPage(page + 1);
      }
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="max-w-xl mx-auto mt-6">
          <Searchbar 
            onChange={onChangeInput}
          />
        </div>
      </div> 
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-10 w-full overflow-y-auto scroll-sm pt-2 pr-1" onScroll={handleScroll}
      >
        {!loading ? results.map((result) => (
          <div
            className="aspect-video hover:scale-105 duration-300 cursor-pointer relative w-full sm:w-[275px] md:w-[285px]"
            key={result?.webformatURL}
          >
            <Image 
              src={result?.webformatURL} 
              fill={true}
              sizes="100%"
              alt="result" 
              className="rounded-xl"
              onClick={() => handleClick(result.largeImageURL)}
            />
          </div>
        ))
        :
          <Spinner />
        }
        <p className="w-full text-center text-xl font-bold pb-6">
          {!loading && results.length === 0 ? 'No results' : isImageMax ? 'No more results' : null}
        </p>
      </div>
    </>
  )
}
export default ModalOnline;