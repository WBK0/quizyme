import useLocalStorage from '@/hooks/useLocalStorage';
import caution from '@/public/caution.png';
import Image from 'next/image';
import { onSubmit } from './submitForm';
import { DataContext } from '@/providers/create-quiz/DataProvider';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

type ConfirmModalProps = {
  handleCloseModal: () => void;
  questions: number;
  warning?: string;
  type: 'publish' | 'delete' | null;
}

const ConfirmModal = ({ handleCloseModal, questions, warning, type } : ConfirmModalProps) => {
  const [value, setValue, removeLocalStorage] = useLocalStorage('create-form', {});

  const { setFormValues } = useContext(DataContext);

  const router = useRouter();

  const deleteQuiz = () => {
    removeLocalStorage();
    router.push('/create');
  }

  return (
    <div className="fixed bg-black/50 z-30 w-full h-screen top-0 left-0">
      <div className="flex items-center h-full justify-center">
        <div className="bg-white w-full max-w-lg h-fit min-h-[300px] relative rounded-2xl pb-2 px-3 flex justify-between flex-col">
          <div className="">
            <h2 className="text-center mt-8 font-bold text-2xl">{type === 'publish' ? 'Are you sure you want to publish this quiz?' : 'Are you sure you want to delete this quiz?'}</h2>
            <p className="text-center mt-4 font-semibold text-lg">Your quiz contains {questions} questions</p>
            {warning ? (
              <div className='flex flex-col items-center mt-8 mb-8'>
                <Image src={caution} width={32} height={32} alt='Caution image' />
                <p className="text-center text-red font-bold">
                  {warning}
                </p>
              </div>
            )
            : null
            }
          </div>
          <div className="flex mb-5 flex-wrap gap-4">
            <button 
              className={`mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-${type === 'publish' ? 'blue' : 'red'} hover:scale-105 duration-300`}
              type='button'
              onClick={() => {
                type === 'publish' ?
                  onSubmit({formValues: value, removeLocalStorage, setFormValues, router })
                : deleteQuiz();
              }}
            >
              {type === 'publish' ? 'Publish' : 'Delete'}
            </button>
            <button 
              className={`mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-${type === 'publish' ? 'red' : 'blue'} hover:scale-105 duration-300`}
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