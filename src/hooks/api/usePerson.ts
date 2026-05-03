import { useQuery } from "@tanstack/react-query";
import customAxios from "@/lib/api/customAxios";
import requests from "@/lib/api/request";
import { Person, PersonResponse } from "@/types/movie";
import type { MoviesResponse } from "@/types/movie";

export const usePerson = (id: string, enabled: boolean = true) => {
  return useQuery<Person, Error>({
    queryKey: ["person", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Person ID is required");
      }
      const response = await customAxios.get<PersonResponse>(
        requests.fetchPersonById(id),
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePersonMovies = (
  id: string,
  type: string = "all",
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["personMovies", id, type],
    queryFn: async () => {
      if (!id) {
        throw new Error("Person ID is required");
      }
      const response = await customAxios.get<MoviesResponse>(
        requests.fetchPersonMovies(id, type),
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
