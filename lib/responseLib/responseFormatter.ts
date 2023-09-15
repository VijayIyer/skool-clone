export interface SuccessResponse<T> {
  success: true;
  data: T | null;
  errorMessage?: never;
}

export interface ErrorResponse {
  success: false;
  data: null;
  errorMessage: string;
}

export type Response<T> = SuccessResponse<T> | ErrorResponse;

export function responseFormatter<T>(
  success: boolean,
  data: T | null,
  errorMessage?: string
): Response<T> {
  if (success) {
    return { success: true, data };
  } else {
    return { success: false, data: null, errorMessage: errorMessage || '' };
  }
}
