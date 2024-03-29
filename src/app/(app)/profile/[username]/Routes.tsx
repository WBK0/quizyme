"use client";
import FollowingModal from "./FollowingModal";
import StudiedModal from "./StudiedModal";
import UserProfileCard from "@/components/UserProfileCard";
import SelectVariant from "./SelectVariant";
import Stats from "./Stats";
import About from "./About";
import Studies from "./Studies";
import { useEffect, useState } from "react";
import useUrlParams from "@/hooks/useUrlParams";
import FollowButton from "./FollowButton";
import Spinner from "@/components/Loading/Spinner";

const Routes = ({ data } : { data: any }) => {
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
    <>
      <UserProfileCard 
        name={data.name}
        username={data.username}
        image={data.image}
      />
      <FollowButton
        userId={data.id}
      />
      <Stats 
        data={data}
        setShowModal={setShowModal}
      />
      <SelectVariant />
      {
        (() => {
          switch(params.type) {
            case 'about me':
              return <About 
                firstname={data.name} 
                description={data.bio} 
                interests={data.interests}
              />;
            case 'quizzes':
              return <Studies
                type="quiz"
                content={data.quizzes}
                authorName={data.name}
                authorImage={data.image}
              />;
            case 'flashcards':
              return <Studies
                type="flashcards"
                content={data.flashcards}
                authorName={data.name}
                authorImage={data.image}
              />;
            default:
              return (
                <div className="flex justify-center pt-24">
                  <Spinner />
                </div>
              );
          }
        })()
      }
      {
        (() => {
          switch(showModal) {
            case 1:
              return (
                <StudiedModal 
                  handleCloseModal={handleCloseModal}
                  variant="quized"
                  username={data.username}
                />
              )
            case 2:
              return (
                <StudiedModal 
                  handleCloseModal={handleCloseModal}
                  variant="learned"
                  username={data.username}
                />
              )
            case 3:
              return(
                <FollowingModal 
                  handleCloseModal={handleCloseModal}
                  variant="followers"
                  userId={data.id}
                />
              )
            case 4:
              return (
                <FollowingModal 
                  handleCloseModal={handleCloseModal}
                  variant="following"
                  userId={data.id}
                />
              )
            default:
              return null;
          }
        })()
      }
    </>
  )
}

export default Routes;