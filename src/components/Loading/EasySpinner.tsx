const EasySpinner = ({ size = 4, color = 'current' }) => {
  return (
    <div
      className={`inline-block h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-${color} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
  )
}

export default EasySpinner;