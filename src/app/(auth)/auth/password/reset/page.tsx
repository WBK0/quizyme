import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Email from "./Email";
import { redirect } from "next/navigation";

const PasswordReset = async () => {
  const session = await getServerSession(authOptions);

  if(session?.user){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/change-password/send-email`, {
        method: 'POST',
        body: JSON.stringify({
          email: session.user.email
        })
      })

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      redirect('/auth/password/change');
    } catch (error) {
      return (
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
        </div>
      )
    }
  }

  return (
    <div>
      {
        session ? (
          <>
            a
          </>
        ) : (
          <Email />
        )
      }
    </div>
  )
}

export default PasswordReset;