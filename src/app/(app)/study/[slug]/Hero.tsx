type HeroProps = {
  image: string;
}

const Hero = ({ image } : HeroProps) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat aspect-video max-w-2xl mx-auto rounded-2xl " 
      style={{backgroundImage: `url(${image})`, boxShadow: `5px 5px 0px 1px var(--lightblue)`}}>
    </div>
  )
}
export default Hero;