import useSwr from 'swr'
import fetcher from "@/lib/fetcher";
import { base, version } from '@/lib/config-api';

const useModule = (id? : String, moduleId: String) => {
  const { data, error, isLoading } =  useSwr(id && moduleId ? `${base}/${version}/courses/${id}/modules/${moduleId}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    data,
    error,
    isLoading
  }
};

export default useModule;