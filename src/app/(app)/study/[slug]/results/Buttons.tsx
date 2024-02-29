"use client";
import { useRouter } from "next/navigation";

const Buttons = ({ slug } : { slug: string }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-4 mt-12 flex-wrap">
      <button
        type="button"
        className="bg-black py-2.5 w-48 rounded-full text-white font-bold shadow-small shadow-blue duration-300 hover:scale-105"
        onClick={() => router.back()}
      >
        Back
      </button>
      <button
        type="button"
        className="bg-black py-2.5 w-48 rounded-full text-white font-bold shadow-small shadow-yellow duration-300 hover:scale-105"
        onClick={() => router.push(`/study/${slug}`)}
      >
        Study page
      </button>
    </div>
  )
}

export default Buttons;