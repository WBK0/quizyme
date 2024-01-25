import Recommendations from "@/components/Recommendations";
import Routes from "./Routes";
import UserData from "./UserData.type";

const page = async ({ params } : { params : { username: string }}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${params.username}`, {
    method: 'GET'
  });

  const json = await response.json();

  const data : UserData = json.data;

  return (
    <div className="mx-auto px-3">
      <Routes data={data} />
      <Recommendations
        type="quiz"
      />
    </div>
  )
}
export default page;