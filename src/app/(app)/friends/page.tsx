import { getServerSession } from "next-auth";
import Content from "./Content";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Friends = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-3">
      <h1 className="font-bold text-4xl mb-14">FIND FRIENDS</h1>
      <Content
        session={session}
      />
    </div>
  )
}
export default Friends;