import Creator from "./Creator";
import About from "./About";
import Hero from "./Hero";
import Stats from "./Stats";
import userPhoto1 from '@/public/userPhoto1.png';
import QuizCode from "./QuizCode";
import Recommendations from "./Recommendations";
import ActionButtons from "./ActionButtons";

const data = {
  type: 'quiz',
  title: 'Motorcycles',
  description: 'W przeciwieństwie do rozpowszechnionych opinii, Lorem Ipsum nie jest tylko przypadkowym tekstem. Ma ono korzenie w klasycznej łacińskiej literaturze z 45 roku przed Chrystusem, czyli ponad 2000 lat temu! Richard McClintock, wykładowca łaciny na uniwersytecie Hampden-Sydney w Virginii.',
  user: {
    image: userPhoto1,
    fullname: 'Bartłomiej Ostojski',
    username: 'OstojskiB'
  },
  hashtags: ['#motorcycles', '#quiz', '#cars'],
  code: 'fmds98'

}

const Study = () => {
  return (
    <div className=" mx-auto px-3">
      <Hero />
      <Stats />
      <h1 className="font-bold text-center mt-12 text-xl">Guest the questions about <span className="font-black">{data.title}!</span></h1>
      <Creator user={data.user} />
      <About
        description={data.description}
        type={data.type}
        hashtags={data.hashtags}
      />
      <QuizCode
        code={data.code}
      />
      <Recommendations />
      <ActionButtons />
    </div>
  )
}
export default Study;