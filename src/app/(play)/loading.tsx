import Spinner from "@/components/Loading/Spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen absolute top-0 w-full left-0">
      <Spinner />
    </div>
  )
}

export default Loading;