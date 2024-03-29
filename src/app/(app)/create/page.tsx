import { getServerSession } from "next-auth";
import Content from "./components/Content";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/components/401/401";

const CreatePage = async () => {
  const session = await getServerSession(authOptions);

  if(!session){
    return <Unauthorized />
  }

  return(
    <Content />
  )
}
export default CreatePage;