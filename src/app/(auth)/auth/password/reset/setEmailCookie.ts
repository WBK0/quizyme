'use server'
import { cookies } from 'next/headers'
 
const setEmailCookie = async (email: string) => {
  cookies().set('password-reset-email', email, {
    maxAge: 900
  })
}

export default setEmailCookie;