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

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${slug}`, {
    cache: 'no-cache',
  });
  
  const json = await response.json();
  const data = json.data;

  if(!response.ok){
    return <NotFound />
  }

  const url = data.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-') + '-' + data.id;

  if(url !== decodeURIComponent(slug)) {
    return <NotFound />
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
          <Creator 
            user={data.user} 
            studyId={data.id}
            type={data.type}
          />
          <About
            description={data.description}
            type={data.type}
            hashtags={data.tags}
            updatedAt={data.updatedAt}
          />
          <QuizCode
            code={data.code}
          />
          <Recommendations 
            type={data.type}
            skip={data.topic}
          />
          <ActionButtons 
            type={data.type}
            id={data.id}
          />
        </div>
        :
          <NotFound />
      }
    </>
    
  )
}
export default Study;