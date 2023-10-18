const Button = ({ children } : { children : React.ReactNode}) => {
  return (
    <button className="bg-black text-white py-4 sm:px-24 w-11/12 sm:w-fit rounded-full font-bold">
      {children}
    </button>
  )
}
export default Button;