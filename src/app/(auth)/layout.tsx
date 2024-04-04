import '@/styles/globals.css';
import type { Metadata } from 'next'
import UserProvider from "@/providers/UserProvider";
import ToastProvider from '@/providers/ToastProvider';
import Buttons from './Buttons';

export const metadata: Metadata = {
  title: 'QuizyMe | Auth',
  description: `"QuizyMe" is an innovative platform designed to facilitate the creation and completion of quizzes and educational flashcards. Tailored for both educational and recreational purposes, users can craft personalized quizzes to suit their learning objectives. With the added feature of exporting flashcards, users can effortlessly share their educational materials with others. "QuizyMe" boasts a user-friendly interface, ensuring a seamless experience for both quiz creation and completion. Dive into a world of interactive learning and entertainment with "QuizyMe".`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="container mx-auto min-h-screen bg-gray-50">
        <Buttons />
        <UserProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  )
}