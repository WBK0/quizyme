import EasySpinner from "@/components/Loading/EasySpinner";

type LoaderTableProps = {
  loading: boolean;
  isAll: boolean;
  type: string;
}

const LoaderTable = ({ loading, isAll, type} : LoaderTableProps) => {
  return (
    <>
      {
        loading && !isAll ? (
          <div className="flex justify-center">
            <EasySpinner size={6} color="white"/>
          </div>
        ) : null
      }
      {
        isAll ? (
          <h6 className="font-bold text-white text-center py-3">
            We could not find any more {type} matching your search.
          </h6>
        )
        : null
      }
    </>
  )
}

export default LoaderTable;