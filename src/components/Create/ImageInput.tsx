import Image from "next/image";
import camera from '@/public/camera.svg';

type ImageInputProps = {
  isImageSet: boolean;
  mainImage: string;
  handleModal: () => void;
}

const ImageInput = ({isImageSet, mainImage, handleModal} : ImageInputProps) => {
  return (
    <>
    {
      isImageSet && mainImage ? 
        <div className="w-full h-full rounded-xl aspect-video flex flex-col justify-center items-center cursor-pointer mt-16 relative"
        onClick={handleModal}>
          <Image
            src={mainImage}
            fill={true}
            sizes="100%"
            alt="cover image"
            className="rounded-xl"
          />
        </div>
        : 
        <div className="w-full aspect-video mt-16 rounded-2xl bg-gradient-to-r from-green-gradient to-yellow-gradient p-1.5 cursor-pointer group" onClick={handleModal}>
          <div className="w-full h-full bg-gradient-to-r from-[#F4FBF5] to-[#FCFAF1] rounded-xl aspect-video flex flex-col justify-center items-center">
            <Image src={camera} alt="camera" width={50} className="group-hover:scale-125 duration-300"/>
            <h3
              className="text-center text-black font-black text-md mt-4 group-hover:scale-125 group-hover:mt-7 duration-300"
            >
              ADD COVER IMAGE
            </h3>
          </div>
        </div>
      } 
    </>
  )
}
export default ImageInput;