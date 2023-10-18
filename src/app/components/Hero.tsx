import Image from "next/image";
import friendsHero from '@/public/friends-hero.svg';
import brainStorm from '@/public/brainstorm-hero.svg';
import Button from "@/components/Button";

const Hero = () => {
  return (
    <div className="flex justify-between flex-wrap md:px-24 px-3 gap-y-5 gap-x-12">
      <div className="w-full max-w-[520px] bg-purple rounded-xl py-10 mx-auto">
        <div className="flex max-w-sm mx-auto flex-wrap items-center flex-col justify-center">
          <h2 className="text-white sm:text-4xl text-3xl font-bold text-center my-auto pb-10">Play and learn with <br />your friends now!</h2>
          <Image src={friendsHero} alt="Friends hero" className="pb-10" height={230} />
          <Button>FIND FRIENDS</Button>
        </div>
      </div>
      <div className="w-full max-w-[520px] bg-green rounded-xl py-10 mx-auto">
        <div className="flex max-w-sm mx-auto flex-wrap items-center flex-col justify-center">
          <h2 className="text-white sm:text-4xl text-3xl font-bold text-center my-auto pb-10">Daily quiz <br />Learn new things!</h2>
          <Image src={brainStorm} alt="Friends hero" className="pb-10" height={230} />
          <Button>GO QUIZ ME</Button>
        </div>
      </div>
    </div>
  )
}
export default Hero;