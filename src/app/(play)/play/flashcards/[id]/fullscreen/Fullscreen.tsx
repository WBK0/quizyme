"use client";
import { useContext } from "react";
import Heading from "./heading/Heading";
import Playground from "./Playground";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import EndScreen from "./end/EndScreen";
import { Session } from "next-auth";

type FullscreenProps = {
  flashcardsSet: {
    topic: string;
    user: {
      id: string;
      image: string;
      name: string;
      username: string;
    }
  },
  session: Session | null;
}

const Fullscreen = ({ flashcardsSet, session } : FullscreenProps) => {
  const { isEnded } = useContext(GameContext);
  return (
    <div>
      <Heading session={session} />
      {
        isEnded
        ? <EndScreen />
        : <Playground topic={flashcardsSet.topic}/>
      }
    </div>
  )
}

export default Fullscreen;