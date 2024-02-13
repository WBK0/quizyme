"use client";
import { useContext } from "react";
import Heading from "./Heading";
import Playground from "./Playground";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import EndScreen from "./end/EndScreen";

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
  const { isEnded } = useContext(GameContext);
  return (
    <div>
      <Heading />
      {
        isEnded
        ? <EndScreen />
        : <Playground topic={flashcardsSet.topic}/>
      }
    </div>
  )
}

export default Fullscreen;