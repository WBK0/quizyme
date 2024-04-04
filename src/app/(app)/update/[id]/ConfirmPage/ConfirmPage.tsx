import Image from "next/image";
import Buttons from "./Buttons";

type ConfirmPageProps = {
  data: {
    image: string;
    title: string;
    length: number;
    topic: string;
    type: 'quiz' | 'flashcards';
  }
  handleConfirm: () => void;
}

const ConfirmPage = ({ data, handleConfirm } : ConfirmPageProps) => {
  return (
    <div className="flex items-center flex-col w-full left-0 py-24 px-3">
      <div className="relative">
        <Image src={data.image} alt={data.title} width={672} height={378} className="aspect-video rounded-2xl shadow-medium shadow-lightblue"/>
        <div className='absolute right-0 top-0 px-6 rounded-tr-xl rounded-bl-2xl text-white text-md font-bold py-0.5 bg-lightblue'>
          {data.length} {data.type === 'quiz' ? 'Questions' : 'Flashcards'}
        </div>
      </div>
      <div className="max-w-2xl">
        <h1 className="font-black text-center mt-6 text-xl">{data.topic}{data.topic.includes("!") ? '' : '!'}</h1>
      </div>
      <p className="font-extrabold text-normal text-red py-2.5 text-center">All players will lost their progress if you update this study.</p>
      <Buttons setView={handleConfirm} />
    </div>
  )
}

export default ConfirmPage;