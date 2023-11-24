import useLocalStorage from '@/hooks/useLocalStorage';
import dropdownicon from '@/public/dropdownicon.svg'
import foldericon from '@/public/foldericon.svg'
import Image from 'next/image';
import { toast } from 'react-toastify';

type ModalLocalProps = {
  value: {
    mainImage: string;
  };
  setValue: (value: {}) => void;
}

const ModalLocal = ({ value, setValue } : ModalLocalProps) => {
  const handleChangeForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    toast.promise(
      async () => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])

        const response = await fetch(`${process.env.NEXT_PUBLIC_CDN_URL}/upload`, {
          method: 'POST',
          body: formData
        })
        const data = await response.json()
        setValue({
          ...value,
          mainImage: data.url
        })
      },
      {
        pending: 'Sending image...',
        success: 'Image uploaded successfully!',
        error: 'An error occurred while uploading the image'
      },
      {
        hideProgressBar: true,
      }
    )
    try {
    } catch (error) {
      console.log(error) 
    }    
  }

  return (
    <form className="flex flex-col w-full max-w-xl gap-12" onChange={handleChangeForm}>
      <label
        htmlFor="inputFile"
        className="w-full aspect-video mt-16"
      >
        <div className="w-full aspect-video rounded-2xl bg-gradient-to-r from-green-gradient to-yellow-gradient p-1.5 cursor-pointer group">
          <div className="w-full h-full bg-gradient-to-r from-[#F4FBF5] to-[#FCFAF1] rounded-xl aspect-video flex flex-col justify-center items-center">
            <Image src={dropdownicon} width={50} alt='dropdown icon' className="group-hover:scale-125 duration-300" />
            <h3
              className="text-center text-black font-black text-md mt-4 group-hover:scale-125 group-hover:mt-7 duration-300"
            >
              Drop your photo here
            </h3>
          </div>
        </div>
      </label>
      <label
        htmlFor='inputFile'
        className='bg-black text-white cursor-pointer rounded-full w-fit mx-auto px-10 py-3 font-bold flex gap-3 shadow-blue shadow-small hover:scale-105 duration-300'
      >
        <Image src={foldericon} width={20} alt='Folder icon' />
        <span>Browse</span>
      </label>
      <input 
        type="file"
        id="inputFile"
        className='hidden'
        accept='image/*'
      />
    </form>
  )
}

export default ModalLocal;