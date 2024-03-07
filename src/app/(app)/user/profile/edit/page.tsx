import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/components/401/401";
import { getServerSession } from "next-auth";
import ProfilePicture from "./ProfilePicture";
import DataProvider from "@/providers/edit-profile/DataProvider";

const ProfileEdit = async() => {
  const session = await getServerSession(authOptions);

  if(!session){
    return <Unauthorized />;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${session.user.username}`);

  const json = await response.json();

  return (
    <div>
      <DataProvider userData={json.data}>
        <ProfilePicture /> 
      </DataProvider>
           
    </div>
  )
}
export default ProfileEdit;