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

  const changeParams = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(param, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return {changeParams, getParams}
}

export default useUrlParams;