import useLocalStorage from '@/hooks/useLocalStorage';
import caution from '@/public/caution.png';
import Image from 'next/image';
import { onSubmit } from './submitForm';
import { DataContext } from '@/providers/create-quiz/DataProvider';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type ConfirmModalProps = {
  handleCloseModal: () => void;
  questions: number;
  warning?: string;
  type: 'publish' | 'delete' | 'update' | 'update-delete' | null;
  id?: string;
}

const ConfirmModal = ({ handleCloseModal, questions, warning, type, id } : ConfirmModalProps) => {
  const [value, setValue, removeLocalStorage] = useLocalStorage(type === 'publish' || type === 'delete' ? 'create-form' : 'update-form', {});

  const { setFormValues } = useContext(DataContext);

  const router = useRouter();

  const deleteQuiz = () => {
    if(type === 'update-delete'){
      toast.promise(
        async () => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/quizzes/delete/${id}`, {
            method: 'DELETE'
          })
  
          const json = await response.json();
    
          if(!response.ok){
            throw new Error(json.message)
          }

          router.push('/user/studies?type=quizzes');
        }, {
          pending: 'Deleting...',
          success: `Successfully deleted quiz`,
          error: { render: ({ data }: { data?: { message: string } }) => data?.message || `An error occurred while deleting quiz` },
        }
      )
    } else {
      removeLocalStorage();
      router.push('/create');
    }
  }

  return (
    <div className="fixed bg-black/50 z-30 w-full h-screen top-0 left-0">
      <div className="flex items-center h-full justify-center">
        <div className="bg-white w-full max-w-lg h-fit min-h-[300px] relative rounded-2xl pb-2 sm:px-6 px-3 flex justify-between flex-col">
          <div className="">
            <h2 className="text-center mt-8 font-bold text-2xl">
              {type === 'publish' ? 'Are you sure you want to publish this quiz?' : 
              type === 'update' ? 'Are you sure you want to update this quiz?' :
              'Are you sure you want to delete this quiz?'}</h2>
            <p className="text-center mt-4 font-semibold text-lg">Your quiz contains {questions} questions</p>
            {warning ? (
              <div className='flex flex-col items-center mt-4'>
                <Image src={caution} width={32} height={32} alt='Caution image' />
                <p className="text-center text-red font-bold">
                  {warning}
                </p>
              </div>
            )
            : null
            }
            {
              type === 'update' ?
              <p className="text-center mt-2 font-black mb-4 text-red">All players will lost their progress if you update this study.</p>
              : null
            }
          </div>
          <div className="flex mb-5 flex-wrap gap-4">
            <button 
              className={`mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-${type === 'publish' || type === 'update' ? 'blue' : 'red'} hover:scale-105 duration-300`}
              type='button'
              onClick={() => {
                type === 'publish' || type === 'update' ?
                  onSubmit({formValues: value, removeLocalStorage, setFormValues, router, method: type === 'publish' ? 'create' : 'update', id: value.id})
                : deleteQuiz();
              }}
            >
              {type === 'publish' ? 'Publish' : type === 'update' ? 'Update' : 'Delete'}
            </button>
            <button 
              className={`mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-${type === 'publish' || type === 'update' ? 'red' : 'blue'} hover:scale-105 duration-300`}
              onClick={handleCloseModal}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal;