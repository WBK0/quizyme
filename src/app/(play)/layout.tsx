import type { Metadata } from 'next';
import '@/styles/globals.css';
import UserProvider from '@/providers/UserProvider';
import ToastProvider from '@/providers/ToastProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'QuizyMe',
  description: 'Generated by create next app',
}

export default async function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);

  if(session && !session?.user.isComplete){
    redirect('/auth/complete-register')
  }

  return (
    <html lang="en">
      <UserProvider>
        <body>
          <div className='bg-yellow'></div>
          <ToastProvider>
            <div>
              {children}
            </div>
          </ToastProvider>
        </body>
      </UserProvider>
    </html>
  )
}
