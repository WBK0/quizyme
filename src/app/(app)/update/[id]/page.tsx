import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import NotFound from "@/components/404/404";
import { getServerSession } from "next-auth";
import Content from "./Content";

const Update = async ({ params } : { params : { id: string }}) => {
  const { id } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${id}`, {
    cache: 'no-cache'
  });

  const json = await response.json();

  if(!response.ok){
    return(
      <NotFound
        message="Study to update not found"
        redirectTo="home"
        url="/"
      />
    )
  }

  const session = await getServerSession(authOptions);

  if(session?.user.id !== json.data.user.id){
    return(
      <NotFound
        message="You don't have permission to update this study"
        redirectTo="home"
        url="/"
        code={401}
      />
    ) 
  }

  return (
    <Content
      data={json.data}
      id={id}
    />
  )
}

export default Update;