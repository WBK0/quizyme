import Creator from "./Creator";
import About from "./About";
import Hero from "./Hero";
import Stats from "./Stats";
import QuizCode from "./QuizCode";
import Recommendations from "@/components/Recommendations";
import ActionButtons from "./ActionButtons";
import NotFound from "./404";

const Study = async ({ params } : { params : { slug: string }}) => {
  const { slug } = params;

  let data;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${slug}`, {
    cache: 'no-cache',
  });
  
  if(response.ok){
    const json = await response.json();
    data = json.data;
  }


  return (
    <>
    {
      response.ok 
      ?
        <div className="mx-auto px-3">
          <Hero 
            image={data.image}
          />
          <Stats 
            stats={data.stats}
            type={data.type}
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
          <Recommendations 
            type={data.type}
            skip={data.topic}
          />
          <ActionButtons 
            type={data.type}
          />
        </div>
        :
          <NotFound />
      }
    </>
    
  )
}
export default Study;