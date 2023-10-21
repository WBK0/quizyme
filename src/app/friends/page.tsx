import Searchbar from "@/components/Searchbar";
import UserCard from "@/components/UserCard";
import userPhoto1 from '@/public/userPhoto1.png';

const data = [
  {
    userPhoto: userPhoto1,
    firstname: "Bartłomiej",
    lastname: "Ostojski",
    username: "OstojskiB",
    isFollowing: true
  },
  {
    userPhoto: userPhoto1,
    firstname: "Bartłomiej",
    lastname: "Ostojski",
    username: "OstojskiB",
    isFollowing: true
  },
  {
    userPhoto: userPhoto1,
    firstname: "Bartłomiej",
    lastname: "Ostojski",
    username: "OstojskiB",
    isFollowing: false
  },
  {
    userPhoto: userPhoto1,
    firstname: "Bartłomiej",
    lastname: "Ostojski",
    username: "OstojskiB",
    isFollowing: false
  },
  {
    userPhoto: userPhoto1,
    firstname: "Bartłomiej",
    lastname: "Ostojski",
    username: "OstojskiB",
    isFollowing: true
  },
]

const Friends = () => {
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-3">
      <h1 className="font-bold text-4xl">FIND FRIENDS</h1>
      <Searchbar />
      <h2 className="font-black text-2xl w-full text-left mt-14 mb-2">You may know</h2>
      {
        data.map((user, index) => (
          <UserCard 
            key={index} 
            userPhoto={user.userPhoto} 
            firstname={user.firstname} 
            lastname={user.lastname} 
            username={user.username} 
            isFollowing={user.isFollowing} 
          />
        ))
      }
      <h6 className="uppercase font-black mt-24 text-center max-w-xl text-xl">
        We couldn't find any more accounts matching your search 
      </h6>      
    </div>
  )
}
export default Friends;