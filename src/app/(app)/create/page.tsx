import SelectButton from "@/components/SelectButton";
import camera from '@/public/camera.svg';
import Image from "next/image";
import Form from "./components/Form";

const CreatePage = () => {
  return (
    <div className="px-3 max-w-3xl mx-auto">
      <SelectButton
        options={['quiz', 'flashcards']}
        paramsName="type"
      />
      <div className="w-full aspect-video mt-16 rounded-2xl bg-gradient-to-r from-green-gradient to-yellow-gradient p-1.5 cursor-pointer group">
        <div className="w-full h-full bg-gradient-to-r from-[#F4FBF5] to-[#FCFAF1] rounded-xl aspect-video flex flex-col justify-center items-center">
          <Image src={camera} alt="camera" width={50} className="group-hover:scale-125 duration-300"/>
          <h3
            className="text-center text-black font-black text-md mt-4 group-hover:scale-125 group-hover:mt-7 duration-300"
          >
            ADD COVER IMAGE
          </h3>
        </div>
      </div>
      <Form />
    </div>
  )
}
export default CreatePage;