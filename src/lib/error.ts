import type { AxiosError } from 'axios';

export type ErrorStatus =
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'UNAUTHENTICATED'
  | 'UNAUTHORIZED'
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

  if (!err.response?.status) return error;

  const { status, data } = err.response;

  if (data.message) error.message = err.response.data.message;

  switch (status) {
    case 400:
      error.status = 'BAD_REQUEST';
      break;
    case 401:
      error.status = 'UNAUTHORIZED';
      break;
    case 404:
      error.status = 'NOT_FOUND';
      break;
    case 500:
      error.status = 'SERVER_ERROR';
      break;
    default:
      break;
  }

  return error;
}
