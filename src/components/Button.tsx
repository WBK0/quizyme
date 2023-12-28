const Button = ({ children, variant, disablePadding, onClick } : { children : React.ReactNode, variant?: string, disablePadding?: boolean, onClick?: () => void }) => {
  return (
    <button 
      className={`border-2 
        ${variant == 'light' 
          ? 'bg-white text-black border-black hover:text-white hover:bg-black' 
          : 'border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black'} 
          ${disablePadding ? 'sm:px-0' : 'sm:px-24 sm:w-fit'}
        duration-300 py-4 w-11/12 rounded-full font-bold `}
        onClick={onClick}
      >
      {children}
    </button>
  )
}
export default Button;