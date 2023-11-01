"use client";
import UserProfileCard from "@/components/UserProfileCard";
import SelectVariants from "./SelectVariants";
import useUrlParams from "@/hooks/useUrlParams";
import Invitations from "./Invitations";
import Searchbar from "@/components/Searchbar";

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
        params.option === 'invitations' && (
          <Invitations type={params.type} />
        )
      }
    </div>
  )
}
export default UserSpace;