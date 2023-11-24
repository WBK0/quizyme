import Image from "next/image";
import caution from '@/public/caution.png';
import { UseFormRegister } from "react-hook-form";

type TextInputProps = {
  register: UseFormRegister<any>;
  name: string;
  error?: string;
}

const TextInput = ({ register, name, error} : TextInputProps) => {
  return (
    <div className="relative ">
      <input
        type="text"
        placeholder="Topic"
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-gray-100 text-black"
        {...register(name)}
      />
      <div className="group">
        {error && 
          <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
            <Image src={caution} width={24} height={24} alt="error" />
          </i>
        }
        <span className="pointer-events-none absolute -top-7 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
          {error}
        </span>
      </div>
    </div>
  )
}
export default TextInput;