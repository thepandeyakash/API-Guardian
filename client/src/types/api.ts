export type ApiSuccessResponse<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  stack?: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
