import Image from "next/image";

type ModalConfirmProps = {
  value: {
    mainImage: string;
  };
  setValue: (value: {}) => void;
}

const ModalConfirm = ({ value, setValue } : ModalConfirmProps) => {
  const handleDecline = async () => {
    try {
      const filename = value.mainImage.split('/').pop();
      const response = await fetch(`${process.env.NEXT_PUBLIC_CDN_URL}/delete/${filename}`, {
        method: 'DELETE'
      })

      if(response.ok){
        setValue({
          ...value,
          mainImage: ''
        })
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="max-w-2xl flex flex-col justify-center h-full">
      <Image src={value.mainImage} alt="image" width={1000} height={1000} className="rounded-xl aspect-video" />
      <div className="flex justify-center gap-6 mt-12">
        <button
          className="bg-black text-white shadow-small shadow-red px-12 py-2 rounded-full font-semibold hover:scale-105 duration-300"
          onClick={() => handleDecline()}
        >
          Decline
        </button>  
        <button
          className="bg-black text-white shadow-small shadow-green px-12 py-2 rounded-full font-semibold hover:scale-105 duration-300"
        >
          Accept
        </button> 
      </div>      
    </div>
  )
}
export default ModalConfirm;