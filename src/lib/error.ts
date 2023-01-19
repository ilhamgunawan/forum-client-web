import type { AxiosError } from 'axios';

export type ErrorStatus =
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'UNAUTHENTICATED'
  | 'SERVER_ERROR'
  | 'GENERAL_ERROR'
  | 'NETWORK_ERROR';

export interface Error {
  status: ErrorStatus
  message: string
}

export interface ErrorResponse {
  message: string
}

export const DEFAULT_ERR_MESSAGE = 'Someting when wrong, please try again.';
export const NETWORK_ERR_MESSAGE = 'Network error, please check your internet connection.';

export function makeErrorFromAxiosResponse(err: AxiosError<ErrorResponse>) {
  const error: Error = {
    status: 'GENERAL_ERROR',
    message: DEFAULT_ERR_MESSAGE,
  };

  if (err.response?.data?.message) {
    error.message = err.response.data.message;
  }

  switch (err.code) {
    case 'ERR_BAD_REQUEST':
      error.status = 'BAD_REQUEST';
      break;
    case 'ERR_NETWORK':
      error.status = 'NETWORK_ERROR';
      error.message = NETWORK_ERR_MESSAGE;
      break;
    default:
      break;
  }

  return error;
}
