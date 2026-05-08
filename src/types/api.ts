export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
  error: ApiErrorEnvelope | null;
  path?: string;
  requestId?: string;
  request_id?: string;
  timestamp: string;
}

export interface EntityRef {
  id: string;
  name?: string;
}

export interface PagedData<T> {
  items: T[];
  nextCursor?: string;
  count: number;
}

export interface PaginatedResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface ApiErrorEnvelope {
  type: string;
  code: string;
  title: string;
  detail: string;
  userMessage?: string;
  context?: unknown;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  endpoint: string;
  context?: Record<string, unknown>;
  timestamp: string;
}
