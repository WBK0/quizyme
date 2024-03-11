import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/components/401/401";
import { getServerSession } from "next-auth";
import ProfilePicture from "./ProfilePicture";
import DataProvider from "@/providers/edit-profile/DataProvider";
import ProfileNames from "./ProfileNames";
import ProfileBio from "./ProfileBio";
import ProfileInterests from "./ProfileInterests";
import Buttons from "./Buttons";

const ProfileEdit = async() => {
  const session = await getServerSession(authOptions);

  if(!session){
    return <Unauthorized />;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${session.user.username}`);

  const json = await response.json();

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-12 px-3">
      <DataProvider userData={json.data}>
        <ProfilePicture /> 
        <ProfileNames sessionUsername={session.user.username}/>
        <ProfileBio />
        <ProfileInterests />
        <Buttons />
      </DataProvider>
    </div>
  )
}
export default ProfileEdit;