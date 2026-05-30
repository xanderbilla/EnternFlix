import { toast } from "sonner";

interface ToastEntry {
  title: string;
  description?: string;
}

export const STATUS_TOAST_MAP: Record<number, ToastEntry> = {
  400: {
    title: "Bad Request",
    description: "Invalid input. Please check your request and try again.",
  },
  401: {
    title: "Unauthorized",
    description: "Sign in to continue.",
  },
  403: {
    title: "Access Denied",
    description: "You don't have permission to perform that action.",
  },
  404: {
    title: "Not Found",
    description: "The requested content could not be found.",
  },
  405: {
    title: "Method Not Allowed",
    description: "This action is not supported.",
  },
  409: {
    title: "Conflict",
    description: "A conflict occurred. The resource may already exist.",
  },
  422: {
    title: "Unprocessable Request",
    description:
      "The request could not be processed. Please verify your input.",
  },
  429: {
    title: "Too Many Requests",
    description: "Slow down a bit — please wait a moment and try again.",
  },
  500: {
    title: "Server Error",
    description: "Something went wrong on our end. Please try again.",
  },
  503: {
    title: "Service Unavailable",
    description: "The service is temporarily down. Please try again later.",
  },
};

const NETWORK_ERROR_TOAST: ToastEntry = {
  title: "Network Error",
  description: "Unable to reach the server. Please check your connection.",
};

export interface ApiErrorToastOptions {
  status?: number;
  suppress?: boolean;
}

export function showApiErrorToast({
  status,
  suppress = false,
}: ApiErrorToastOptions): void {
  if (suppress) return;

  const entry =
    status !== undefined
      ? (STATUS_TOAST_MAP[status] ?? {
          title: `Error ${status}`,
          description: "An unexpected error occurred.",
        })
      : NETWORK_ERROR_TOAST;

  if (status === undefined || status >= 500) {
    toast.error(entry.title, { description: entry.description });
  } else {
    toast.warning(entry.title, { description: entry.description });
  }
}
