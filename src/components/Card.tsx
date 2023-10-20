import Link from "next/link";
import userPhoto from '@/public/userPhoto.svg';
import Image from "next/image";

type CardProps = {
  to: string;
  image: string;
  color: string;
  type: string;
  topic: string;
  authorId: string;
}

{/* Temporarily, the data is fixed */}

const Card = ({to, image, color, type, topic, authorId} : CardProps) => {
  return (
    <Link href={to}>
      <div className="flex justify-center w-full hover:scale-105 duration-300 ">
        <div className={`w-full aspect-video bg-no-repeat bg-center bg-cover rounded-xl rounded-tr-2xl relative`} style={{backgroundImage: `url(${image})`, boxShadow: `5px 5px 0px 1px var(--${color}) `}}>
          <div className="absolute left-4 bottom-4 text-white font-black flex flex-wrap items-center gap-2">
            <Image src={userPhoto} width={32} height={32} alt="User photo"/>
            <p>Bartłomiej</p>
          </div>
          <div className="absolute right-0 top-0 px-6 rounded-tr-xl rounded-bl-2xl text-white text-md font-bold py-0.5" style={{backgroundColor: `var(--${color})`}}>
            18 {type == 'quiz' ? 'QUESTIONS' : 'FLASHCARDS'}
          </div>
        </div>
      </div>
      <p className="my-6 text-lg font-bold">
        Guest the questions about <span className="font-black">{topic}!</span>
      </p>
    </Link>
  )
}
export default Card;