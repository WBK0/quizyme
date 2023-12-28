import Creator from "./Creator";
import About from "./About";
import Hero from "./Hero";
import Stats from "./Stats";
import QuizCode from "./QuizCode";
import Recommendations from "@/components/Recommendations";
import ActionButtons from "./ActionButtons";
import { redirect } from "next/navigation";

const Study = async ({ params } : { params : { slug: string }}) => {
  const { slug } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${slug}`, {
    cache: 'no-cache',
  });

  if(!response.ok){
    redirect('/study/404');
  }

  const json = await response.json();
  const data = json.data;

  return (
    <div className="mx-auto px-3">
      <Hero 
        image={data.image}
      />
      <Stats 
        stats={data.stats}
      />
      <h1 className="font-bold text-center mt-12 text-xl">Guest the questions about <span className="font-black">{data.topic}{data.topic.includes("!") ? '' : '!'}</span></h1>
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