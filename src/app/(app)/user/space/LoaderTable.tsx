import Spinner from "@/components/Loading/Spinner";

type LoaderTableProps = {
  loading: boolean;
  isAll: boolean;
  type: string;
}

const LoaderTable = ({ isAll, loading, type } : LoaderTableProps) => {
  return (
    <>
      {
        !isAll && loading ?
          <div className="flex justify-center">
            <Spinner />
          </div>
        : isAll ? (
            <h6 className="font-bold text-black text-lg text-center py-3">
              We couldn't find any more {type} matching your search.
            </h6>
          ) 
          : null
      }
    </>
  )
}
export default LoaderTable;