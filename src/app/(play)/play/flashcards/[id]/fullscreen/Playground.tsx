"use client";
import Card from "../mainPage/Playground/Card";
import CardChangeAnimation from "../mainPage/Playground/CardChangeAnimation";
import Panel from "./panel/Panel";

type PlaygroundProps = {  
  topic: string;
}

const Playground = ({ topic } : PlaygroundProps) => {
  return (
    <div className="flex flex-col items-center">
      <h1 
        className="font-bold text-xl my-12"
      >
        {topic}
      </h1>
      <div className="px-3 max-w-6xl w-full mx-auto ">
        <div className="relative">
          <CardChangeAnimation
            likeButton={true}
          />
          <Card 
            likeButton={true}
          />
          <Panel />
        </div>
      </div>
    </div>
  )
}

export default Playground;