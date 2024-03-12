import Link from "next/link";

const Content = () => {
  return (
    <>
      <div className="gap-8 justify-center flex-2 font-bold text-base hidden md:flex">
        <Link href="/" className="hover:text-gray-600">
          HOME
        </Link>
        <Link href="/" className="hover:text-gray-600">
          CREATE
        </Link>
        <Link href="/" className="hover:text-gray-600">
          PLAY
        </Link>
        <Link href="/" className="hover:text-gray-600">
          LEARN
        </Link>
      </div>
    </>
  )
}
export default Content;