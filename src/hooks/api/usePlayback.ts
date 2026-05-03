import { useQuery } from "@tanstack/react-query";
import customAxios from "@/lib/api/customAxios";
import requests from "@/lib/api/request";
import { PlaybackResponse } from "@/types/playback";

export const usePlayback = (
  contentType: "movie" | "tv",
  contentId: string,
  enabled: boolean = true,
) => {
  return useQuery<PlaybackResponse["data"]>({
    queryKey: ["playback", contentType, contentId],
    queryFn: async () => {
      const response = await customAxios.get<PlaybackResponse>(
        requests.fetchPlayback(contentType, contentId),
      );
      return response.data.data;
    },
    enabled: enabled && !!contentId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
