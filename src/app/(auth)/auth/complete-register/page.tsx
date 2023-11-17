import Image from 'next/image';
import logo from '@/public/logo.svg';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import CompleteRegisterProvider from './CompleteRegisterProvider';
import Form from './Form';
import ProgressBar from './components/ProgressBar';

const CompleteRegister = async () => {
  const session = await getServerSession(authOptions);

  if(session?.user?.isComplete){
    redirect('/')
  }

  return (
    <CompleteRegisterProvider session={session}>
      <div className="max-w-lg mx-auto flex min-h-screen flex-col justify-center px-3 gap-4 relative py-16">
        <ProgressBar />
        <Image src={logo} width={150} height={150} alt="logo"
          className="mx-auto mb-4"
        />
        <Form />
      </div>
    </CompleteRegisterProvider>
  )
}

export default CompleteRegister;