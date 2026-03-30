/**
 * Validation result type for data validation operations
 * @template T - The type of data being validated
 */
export interface ValidationResult<T> {
  /** Whether the validation passed */
  isValid: boolean;
  /** The validated data (only present if isValid is true) */
  data?: T;
  /** Array of validation errors (empty if isValid is true) */
  errors: ValidationError[];
}

/**
 * Validation error details
 */
export interface ValidationError {
  /** The field that failed validation */
  field: string;
  /** Human-readable error message */
  message: string;
  /** Machine-readable error code */
  code: string;
}

/**
 * Base application error type
 */
export interface AppError {
  /** Error message */
  message: string;
  /** Machine-readable error code */
  code: string;
  /** Additional error context */
  context?: Record<string, unknown>;
  /** Timestamp when error occurred */
  timestamp: string;
}
