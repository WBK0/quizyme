"use client";
import Card from "../mainPage/Playground/Card";

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
      <div className="max-w-6xl w-full mx-auto px-3">
        <Card 
          likeButton={true}
        />
      </div>
    </div>
  )
}

export default Playground;