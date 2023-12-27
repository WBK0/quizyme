import Creator from "./Creator";
import About from "./About";
import Hero from "./Hero";
import Stats from "./Stats";
import userPhoto1 from '@/public/userPhoto1.png';
import QuizCode from "./QuizCode";
import Recommendations from "@/components/Recommendations";
import ActionButtons from "./ActionButtons";

const Study = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API}/study/test-658c31346d4753fc02c9321c`, {
    cache: 'no-cache',
  });
  const json = await result.json();
  const data = json.data;

  return (
    <div className=" mx-auto px-3">
      <Hero 
        image={data.image}
      />
      <Stats 
        stats={data.stats}
      />
      <h1 className="font-bold text-center mt-12 text-xl">Guest the questions about <span className="font-black">{data.topic}!</span></h1>
      <Creator user={data.user} />
      <About
        description={data.description}
        type={data.type}
        hashtags={data.tags}
        createdAt={data.createdAt}
      />
      <QuizCode
        code={data.code.code}
      />
      <Recommendations />
      <ActionButtons 
        type={data.type}
      />
    </div>
  )
}
export default Study;