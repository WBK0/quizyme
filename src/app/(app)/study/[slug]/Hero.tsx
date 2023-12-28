import Image from 'next/image';

type HeroProps = {
  image: string;
}

const Hero = ({ image } : HeroProps) => {
  return (
    <div
      className="aspect-video max-w-2xl mx-auto rounded-2xl shadow-medium shadow-lightblue" 
    >
      <Image 
        src={image} 
        alt="hero image" 
        width={672}
        height={378}
        className="aspect-video rounded-2xl"
      />
    </div>
  )
}
export default Hero;