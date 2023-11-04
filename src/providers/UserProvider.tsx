'use client';
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode;
  session?: Session;
}

const UserProvider = ({ children, session } : ProviderProps) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default UserProvider;