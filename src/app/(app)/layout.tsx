import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import UserProvider from '@/providers/UserProvider';
import ToastProvider from '@/providers/ToastProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: 'QuizyMe',
  description: `"QuizyMe" is an innovative platform designed to facilitate the creation and completion of quizzes and educational flashcards. Tailored for both educational and recreational purposes, users can craft personalized quizzes to suit their learning objectives. With the added feature of exporting flashcards, users can effortlessly share their educational materials with others. "QuizyMe" boasts a user-friendly interface, ensuring a seamless experience for both quiz creation and completion. Dive into a world of interactive learning and entertainment with "QuizyMe".`
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
      <GoogleAnalytics 
        gaId='G-9YME6V7GF8'
      />
      <UserProvider>
        <body className=''>
          {/* TEMPORARY SET BACKGROUND YELLOW - DELETE IN FUTURE */}
          <div className='bg-yellow shadow-purple'></div>
          <ToastProvider>
            <Navbar />
            <div className='container mx-auto pt-28 min-h-screen h-full'>
              {children}
            </div>
            <Footer />
          </ToastProvider>
        </body>
      </UserProvider>
    </html>
  )
}
