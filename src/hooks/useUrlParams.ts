import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const getParams = () => {
    const params = new URLSearchParams(searchParams);
    const paramsObj: Record<string, string> = {};
    for (const [key, value] of Array.from(params.entries())) {
      paramsObj[key] = value;
    }
    return paramsObj;
  }

  const changeParam = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(param, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  const changeParams = (paramsObj: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(paramsObj)) {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const deleteParams = (param: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(param);
    router.push(`${pathname}?${params.toString()}`);
  }

  return { changeParam, getParams, deleteParams, changeParams }
}

export default useUrlParams;