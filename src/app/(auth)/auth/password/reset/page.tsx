import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Email from "./Email";

const PasswordReset = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Email
        sessionEmail={session?.user?.email}
      />
    </div>
  )
}

export default PasswordReset;