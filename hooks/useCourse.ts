import useSwr from 'swr'
import fetcher from "@/lib/fetcher";
import { base, version } from '@/lib/config-api';

const useCourse = (id? : String) => {
  const { data, error, isLoading } =  useSwr(id ? `${base}/${version}/courses/${id}` : null, fetcher, {
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

export default useCourse;