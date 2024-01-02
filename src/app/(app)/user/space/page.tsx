"use client";
import UserProfileCard from "@/components/UserProfileCard";
import SelectVariants from "./SelectVariants";
import useUrlParams from "@/hooks/useUrlParams";
import Invitations from "./Invitations";
import Searchbar from "@/components/Searchbar";
import Wishlist from "./Wishlist";
import Results from "./Results";

const UserSpace = () => {
  const { getParams } = useUrlParams();

  const params = getParams() as { option: 'invitations' | 'wishlist' | 'my results'; type: 'quizzes' | 'flashcards' };

  return (
    <div className="px-3">
      <UserProfileCard
        fullname="Bartłomiej Ostojski"
        username="OstojskiB"
      />
      <SelectVariants />
      <div className="mt-20 max-w-2xl mx-auto">
        <Searchbar /> 
      </div>
      {
        (() => {
          switch (params.option) {
            case 'invitations':
              return(
                <Invitations type={params.type} />
              )
            case 'wishlist':
              return(
                <Wishlist type={params.type} />
              )
            case 'my results':
              return(
                <Results type={params.type} />
              )
            default:
              return null;
          }
        })()
      }
    </div>
  )
}
export default UserSpace;