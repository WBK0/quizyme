"use client";

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
      
    </div>
  )
}

export default Playground;