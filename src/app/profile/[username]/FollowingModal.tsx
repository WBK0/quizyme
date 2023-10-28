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
  {
    userPhoto: userPhoto1,
    firstname: "Bartłomiej",
    lastname: "Ostojski",
    username: "OstojskiB",
    isFollowing: true
  },
]

type FollowingModalProps = {
  handleCloseModal: () => void;
}

const FollowingModal = ({ handleCloseModal } : FollowingModalProps) => {
  return (
    <div className="fixed bg-black/50 z-30 w-full h-screen top-0 left-0">
      <div className="flex items-center h-full justify-center">
        <div className="bg-white w-full max-w-4xl h-full max-h-[600px] relative rounded-2xl">
          <button className="absolute right-3 top-3 text-2xl font-black" onClick={handleCloseModal}>X</button>
          <div className="flex flex-col pt-10 items-center h-full px-3">
            <h2 className="font-bold text-center text-2xl">FOLLOWING</h2>
            <div className="mt-8 max-w-2xl w-full">
              <Searchbar />
            </div>
            <div className="overflow-y-auto w-full mb-6 mt-6 pr-3 scroll-sm">
              <div className="max-w-2xl mx-auto">  
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FollowingModal;