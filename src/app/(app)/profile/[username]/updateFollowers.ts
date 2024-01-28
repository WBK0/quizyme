"use server"
import { revalidatePath } from "next/cache";

const updateFollowers = () => {
  revalidatePath('/(app)/profile/[username]', 'page')
}

export default updateFollowers;