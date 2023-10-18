const Button = ({ children } : { children : React.ReactNode}) => {
  return (
    <button className="bg-black text-white py-4 px-24 rounded-full font-bold my-auto">
      {children}
    </button>
  )
}
export default Button;