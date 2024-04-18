import useSwr from 'swr'
import fetcher from "@/lib/fetcher";
import { base, version } from '@/lib/config-api';

const useChapter = (courseId? : String, moduleId?: String, chapterId?: String) => {
  const { data, error, isLoading } =  useSwr(courseId && moduleId && chapterId ? `${base}/${version}/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}` : null, fetcher, {
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