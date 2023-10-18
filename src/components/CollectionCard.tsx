import Link from "next/link";

type CollectionCardProps = {
  image: string;
  to: string;
  color: string;
  children: React.ReactNode;
}

const CollectionCard = ({ image, to, children, color } : CollectionCardProps) => {
  return (
    <Link href={to}>
      <div className="flex justify-center w-full hover:scale-105 duration-300">
        <div className={`w-full aspect-video bg-no-repeat bg-center bg-cover rounded-xl relative`} style={{backgroundImage: `url(${image})`, boxShadow: `5px 5px 1px 1px var(--${color}) `}}>
          <h6 className="absolute left-4 bottom-2 text-white font-black">
            {children}
          </h6>
        </div>
      </div>
    </Link>
  )
}
export default CollectionCard;