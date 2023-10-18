import Image from "next/image";
import friendsHero from '@/public/friends-hero.svg';
import brainStorm from '@/public/brainstorm-hero.svg';
import Button from "@/components/Button";

const Hero = () => {
  return (
    <div className="flex justify-between px-24">
      <div className="w-[550px] h-[550px] bg-purple rounded-xl flex px-24 py-10 flex-wrap items-center flex-col justify-center">
        <h2 className="text-white text-4xl font-bold text-center my-auto">Play and learn with your friends now!</h2>
        <Image src={friendsHero} alt="Friends hero" className="my-auto" height={230} />
        <Button>FIND FRIENDS</Button>
      </div>
      <div className="w-[550px] h-[550px] bg-green rounded-xl flex px-24 py-10 flex-wrap items-center flex-col justify-center">
        <h2 className="text-white text-4xl font-bold text-center my-auto">Daily quiz <br />Learn new things!</h2>
        <Image src={brainStorm} alt="Friends hero" className="my-auto" height={230} />
        <Button>GO QUIZ ME</Button>
      </div>
    </div>
  )
}
export default Hero;