import Image from "next/image";
import caution from '@/public/caution.png';
import eye from '@/public/eye.png';
import blind from '@/public/blind.png';
import { useState } from "react";

interface AuthInputProps {
  register: any;
  name: string;
  error?: string;
  placeholder: string;
  type: string;
  defaultValue?: string;
}

const AuthInput = ({ register, name, error, placeholder, type, defaultValue } : AuthInputProps) => {
  const [dynamicType, setDynamicType] = useState(type);

  const handleChangeType = () => {
    if(dynamicType === 'text'){
      setDynamicType('password');
    }else{
      setDynamicType('text');
    }
  }

  return (
    <div className="relative">
      <input 
        type={dynamicType}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name)}
        className={`w-full rounded-xl px-4 py-2 outline-none font-bold text-lg focus:ring-2 focus:ring-black ${error ? 'ring-2 ring-red' : ''}`}
      >
      </input>
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
      {
        type === 'password' &&
          <i className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${error ? 'right-9' : 'right-2'}`} onClick={handleChangeType}>
            <Image src={dynamicType === 'password' ? eye : blind} width={24} height={24} alt="error" />
          </i>
      }
    </div>
  )
}
export default AuthInput;