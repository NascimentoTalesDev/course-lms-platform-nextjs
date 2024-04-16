import useSwr from 'swr'
import fetcher from "@/lib/fetcher";
import { base, version } from '@/lib/config-api';

const useChapter = (courseId? : String, chapterId?: String) => {
  const { data, error, isLoading } =  useSwr(courseId && chapterId ? `${base}/${version}/courses/${courseId}/chapters/${chapterId}` : null, fetcher, {
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

export default useChapter;