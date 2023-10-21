const Button = ({ children } : { children : React.ReactNode}) => {
  return (
    <button className="bg-black text-white py-4sm:px- 24 w-11/12 sm:w-fit rounded-full font-bold hover:text-gray-300">
      {children}
    </button>
  )
}
export default Button;