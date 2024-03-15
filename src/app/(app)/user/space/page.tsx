import UserProfileCard from "@/components/UserProfileCard";
import Content from "./Content";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/components/401/401";

const UserSpace = async () => {
  const session = await getServerSession(authOptions);

  if(!session){
    return <Unauthorized />;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${session.user.username}`, {
    next: {
      revalidate: 15
    }
  });

  const json = await response.json();

  return (
    <div>
      <div className="px-3">
        <UserProfileCard
          name={json.data.name}
          username={json.data.username}
          image={json.data.image}
        />
      </div>
      <Content />
    </div>
  )
}

export default UserSpace;