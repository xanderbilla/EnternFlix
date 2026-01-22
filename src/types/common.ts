export interface BaseResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type ViewMode = "list" | "grid";

export interface ErrorState {
  message: string;
  code?: string;
}
