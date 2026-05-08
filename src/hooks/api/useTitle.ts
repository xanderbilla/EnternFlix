import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/queryKeys";
import { fetchTitleData } from "@/services/content/titleContent";

export type { MediaType, TitleData } from "@/services/content/titleContent";

export const useTitle = (id: string, enabled: boolean = true) =>
  useQuery({
    queryKey: queryKeys.title(id),
    queryFn: () => fetchTitleData(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
