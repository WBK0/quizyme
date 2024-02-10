import Heading from "./Heading";
import Playground from "./Playground";

type FullscreenProps = {
  flashcardsSet: {
    topic: string;
    user: {
      id: string;
      image: string;
      name: string;
      username: string;
    }
  }
}

const Fullscreen = ({ flashcardsSet } : FullscreenProps) => {
  return (
    <div>
      <Heading />
      <Playground topic={flashcardsSet.topic}/>
    </div>
  )
}

export default Fullscreen;