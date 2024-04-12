import Image from 'next/image';
import logo from '@/public/logo.svg';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { redirect } from 'next/navigation';
import Form from './Form';
import ResendCode from './ResendCode';

const ConfirmEmail = async () => {  
  const session = await getServerSession(authOptions);

  if(session?.user?.isComplete || !session){
    redirect('/')
  }

  if(session.user.emailVerified){
    redirect('/auth/complete-register')
  }

  return (
    <div>
      <div className="max-w-lg mx-auto flex min-h-screen flex-col justify-center px-3 gap-4 py-16">
        <Image src={logo} width={150} height={150} alt="logo"
          className="mx-auto mb-4"
        />
        <p
          className='text-center font-bold max-w-sm mx-auto text-zinc-700'
        >
          We have sent you an email to confirm your account. Please check your email and click on the link or enter the code to confirm your account.
        </p>
        <Form />
        <ResendCode email={session.user.email} />
      </div>
    </div>
  )
}

export default ConfirmEmail;