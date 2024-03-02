"use server"
import { revalidatePath } from "next/cache"

const updatePage = () => {
  revalidatePath("/(app)/study/[slug]", 'page');
}

export default updatePage;