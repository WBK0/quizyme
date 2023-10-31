"use client";
import useUrlParams from "@/hooks/useUrlParams";
import SelectVariant from "./SelectVariant";
import Stats from "./Stats";
import About from "./About";
import Recommendations from "@/components/Recommendations";
import Studies from "./Studies";
import { useEffect, useState } from "react";
import FollowingModal from "./FollowingModal";
import StudiedModal from "./StudiedModal";
import UserProfileCard from "@/components/UserProfileCard";

const data = {
  firstname: 'Bartłomiej',
  lastname: 'Ostojski',
  username: 'OstojskiB',
  stats: {
    quizzed: 123,
    learned: 123,
    followers: 123,
    following: 123,
  },
  description: 'Ogólnie znana teza głosi, iż użytkownika może rozpraszać zrozumiała zawartość strony, kiedy ten chce zobaczyć sam jej wygląd. Jedną z mocnych stron używania Lorem Ipsum jest to, że ma wiele różnych „kombinacji” zdań, słów i akapitów, w przeciwieństwie do zwykłego: „tekst, tekst, tekst”, sprawiającego, że wygląda to „zbyt czytelnie” po polsku. Wielu webmasterów i designerów używa Lorem Ipsum jako domyślnego modelu tekstu i wpisanie w internetowej wyszukiwarce ‘lorem ipsum’ spowoduje znalezienie bardzo wielu stron, które wciąż są w budowie. Wiele wersji tekstu ewoluowało i zmieniało się przez lata, czasem przez przypadek, czasem specjalnie (humorystyczne wstawki itd).',
  interests: ['✈️ Traveling', '🏎️ Racing', '⚽ Sports', '📘 Study', '🛠️ Crafts', '🖥️ IT'],
  quizzes: [
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "quiz",
      topic: "Cosmos",
      authorId: "1"
    },
  ],
  flashcards: [
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1"
    },
    {
      image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg",
      to: "/",
      type: "flashcards",
      topic: "Cosmos",
      authorId: "1"
    },
  ]
}

const page = () => {
  const [showModal, setShowModal] = useState<number>(0);

  const handleCloseModal = () => {
    setShowModal(0);
  }

  const { getParams, changeParam } = useUrlParams();
  const params = getParams();

  useEffect(() => {
    if (!params.type) {
      changeParam('type', 'about me');
    }
  }, [params.type])

  const closeModalOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeModalOnEscape);

    return () => {
      document.removeEventListener('keydown', closeModalOnEscape);
    }
  }, [])

  return (
    <div className="mx-auto px-3">
      <UserProfileCard 
        fullname={data.firstname + " " + data.lastname}
        username={data.username}
      />
      <Stats 
        stats={data.stats}
        setShowModal={setShowModal}
      />
      <SelectVariant />
      {
        (() => {
          switch(params.type) {
            case 'about me':
              return <About 
                firstname={data.firstname} 
                description={data.description} 
                interests={data.interests}
              />;
            case 'quizzes':
              return <Studies
                type={params.type}
                content={data.quizzes}
              />;
            case 'flashcards':
              return <Studies
                type={params.type}
                content={data.flashcards}
              />;
            default:
              return (
                <h1 className="font-extrabold text-center text-2xl mt-24">
                  An unknown error occurred
                </h1>
              );
          }
        })()
      }
      <Recommendations />
      {
        (() => {
          switch(showModal) {
            case 1:
              return (
                <StudiedModal 
                  handleCloseModal={handleCloseModal}
                  variant="quized"
                />
              )
            case 2:
              return (
                <StudiedModal 
                  handleCloseModal={handleCloseModal}
                  variant="learned"
                />
              )
            case 3:
              return(
                <FollowingModal 
                  handleCloseModal={handleCloseModal}
                  variant="followers"
                  
                />
              )
            case 4:
              return (
                <FollowingModal 
                  handleCloseModal={handleCloseModal}
                  variant="following"
                />
              )
            default:
              return null;
          }
        })()
      }
    </div>
  )
}
export default page;