import { useQuery } from "@tanstack/react-query";
import customAxios from "@/lib/api/customAxios";
import requests from "@/lib/api/request";
import { PlaybackResponse } from "@/types/playback";
import { queryKeys } from "@/lib/query/queryKeys";

export const usePlayback = (
  contentType: "movie" | "tv",
  contentId: string,
  enabled: boolean = true,
  seasonId?: string | null,
  episodeId?: string | null,
) => {
  return useQuery<PlaybackResponse["data"]>({
    queryKey: queryKeys.playback(contentType, contentId, seasonId, episodeId),
    queryFn: async () => {
      const response = await customAxios.get<PlaybackResponse>(
        requests.fetchPlayback(contentType, contentId, seasonId, episodeId),
        { _suppressNetworkErrorLog: true },
      );
      if (!response.data.data) {
        throw new Error("Playback data unavailable");
      }
      return response.data.data;
    },
    enabled: enabled && !!contentId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
