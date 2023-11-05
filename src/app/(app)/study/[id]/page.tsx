import Creator from "./Creator";
import About from "./About";
import Hero from "./Hero";
import Stats from "./Stats";
import userPhoto1 from '@/public/userPhoto1.png';
import QuizCode from "./QuizCode";
import Recommendations from "../../../components/Recommendations";
import ActionButtons from "./ActionButtons";

const data = {
  type: 'quiz',
  image:' https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg',
  title: 'Motorcycles',
  stats: {
    played: 123,
    favorited: 123,
    shared: 123,
    questions: 123,
  },
  description: 'W przeciwieństwie do rozpowszechnionych opinii, Lorem Ipsum nie jest tylko przypadkowym tekstem. Ma ono korzenie w klasycznej łacińskiej literaturze z 45 roku przed Chrystusem, czyli ponad 2000 lat temu! Richard McClintock, wykładowca łaciny na uniwersytecie Hampden-Sydney w Virginii.',
  user: {
    image: userPhoto1,
    fullname: 'Bartłomiej Ostojski',
    username: 'OstojskiB'
  },
  hashtags: ['#motorcycles', '#quiz', '#cars'],
  code: 'fmds98',
  createdAt: '2023-09-25T12:00:00.000Z',
}

const Study = () => {
  return (
    <div className=" mx-auto px-3">
      <Hero 
        image={data.image}
      />
      <Stats 
        stats={data.stats}
      />
      <h1 className="font-bold text-center mt-12 text-xl">Guest the questions about <span className="font-black">{data.title}!</span></h1>
      <Creator user={data.user} />
      <About
        description={data.description}
        type={data.type}
        hashtags={data.hashtags}
        createdAt={data.createdAt}
      />
      <QuizCode
        code={data.code}
      />
      <Recommendations />
      <ActionButtons 
        type={data.type}
      />
    </div>
  )
}
export default Study;