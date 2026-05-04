export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface AppError {
  message: string;
  code: string;
  context?: Record<string, unknown>;
  timestamp: string;
}
