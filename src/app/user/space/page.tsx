import UserProfileCard from "@/components/UserProfileCard";
import SelectVariants from "./SelectVariants";

const UserSpace = () => {
  return (
    <div>
      <UserProfileCard
        fullname="Bartłomiej Ostojski"
        username="OstojskiB"
      />
      <SelectVariants />
    </div>
  )
}
export default UserSpace;