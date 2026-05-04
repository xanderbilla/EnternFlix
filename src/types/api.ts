export interface ApiResponse<T> {
  success: boolean;
  status: number;
  code: string;
  message: string;
  data: T;
  path: string;
  request_id: string;
  timestamp: string;
}

export interface EntityRef {
  id: string;
  name: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  endpoint: string;
  context?: Record<string, unknown>;
  timestamp: string;
}
