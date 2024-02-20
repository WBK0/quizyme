import { headers } from "next/headers";
import Content from "./Content";

const Friends = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
    method: 'GET',
    cache: 'no-cache',
    headers: headers()
  });

  const json = await response.json();

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-3">
      <h1 className="font-bold text-4xl mb-14">FIND FRIENDS</h1>
      <Content
        data={json.data}
      />
    </div>
  )
}
export default Friends;