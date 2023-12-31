import Link from "next/link";
import userPhoto from '@/public/userPhoto.svg';
import Image from "next/image";

type CardProps = {
  to: string;
  image: string;
  color: string;
  type: string;
  topic: string;
  authorName: string;
  authorImage: string;
  hideText?: boolean;
  quantity: number;
}

const Card = ({to, image, color, type, topic, authorName, authorImage, quantity, hideText} : CardProps) => {
  return (
    <Link href={to} className="flex-1">
      <div className={`flex justify-center w-full hover:scale-105 duration-300 max-w-2xl aspect-video shadow-small shadow-${color} rounded-2xl relative`}>
        <Image src={image} width={672} height={378} alt="Hero image" className="rounded-2xl"/>
        <div className="absolute left-4 bottom-4 text-white font-black flex flex-wrap items-center gap-2">
          <Image src={authorImage} width={32} height={32} alt="User photo" className="rounded-full"/>
          <p>{authorName.split(" ")[0]}</p>
        </div>
        <div className={`absolute right-0 top-0 px-6 rounded-tr-xl rounded-bl-2xl text-white text-md font-bold py-0.5 bg-${color}`}>
          {quantity} {type == 'quiz' ? 'QUESTIONS' : 'FLASHCARDS'}
        </div>
      </div>
      {
        hideText 
        ? null
        :
        <p className="sm:my-6 mt-3 mb-1 text-lg font-bold">
          {
            type == 'quiz' ? 'Guest the questions about ' : 'Learn from flashcards about '
          } 
          <span className="font-black">{topic}{topic.includes("!") ? '' : '!'}</span>
        </p>
      }
    </Link>
  )
}
export default Card;