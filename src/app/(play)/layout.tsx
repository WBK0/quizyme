import type { Metadata } from 'next';
import '@/styles/globals.css';
import UserProvider from '@/providers/UserProvider';
import ToastProvider from '@/providers/ToastProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'QuizyMe',
  description: `"QuizyMe" is an innovative platform designed to facilitate the creation and completion of quizzes and educational flashcards. Tailored for both educational and recreational purposes, users can craft personalized quizzes to suit their learning objectives. With the added feature of exporting flashcards, users can effortlessly share their educational materials with others. "QuizyMe" boasts a user-friendly interface, ensuring a seamless experience for both quiz creation and completion. Dive into a world of interactive learning and entertainment with "QuizyMe".`,
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
