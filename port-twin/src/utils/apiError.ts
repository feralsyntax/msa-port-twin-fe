import axios from 'axios';
import type { AxiosError } from 'axios';

/** Matches OpenAPI APIErrorDetail / APIErrorResponse */
export interface ApiErrorDetail {
  code: string
  message: string
  details?: unknown
}

export interface ParsedApiError {
  status?: number
  code?: string
  message: string
  details?: unknown
  isNetworkError: boolean
  isTimeout: boolean
}

type ApiErrorBody = {
  error?: {
    code?: string
    message?: string
    details?: unknown
  }
  detail?: string | Array<{ msg?: string; message?: string }>
  message?: string
}

export function parseApiError(error: unknown): ParsedApiError {
  if (!axios.isAxiosError(error)) {
    return {
      message: error instanceof Error ? error.message : 'Something went wrong.',
      isNetworkError: false,
      isTimeout: false,
    }
  }

  const axiosError = error as AxiosError<ApiErrorBody>
  const status = axiosError.response?.status
  const data = axiosError.response?.data

  const isTimeout =
    axiosError.code === 'ECONNABORTED' ||
    axiosError.message.toLowerCase().includes('timeout')

  const isNetworkError = !axiosError.response && axiosError.request != null

  // Prefer schema shape: { error: { code, message, details } }
  if (data?.error?.message) {
    return {
      status,
      code: data.error.code,
      message: data.error.message,
      details: data.error.details,
      isNetworkError: false,
      isTimeout: false,
    }
  }

  // Common DRF fallbacks
  if (typeof data?.detail === 'string') {
    return {
      status,
      message: data.detail,
      isNetworkError: false,
      isTimeout: false,
    }
  }

  if (Array.isArray(data?.detail) && data.detail.length > 0) {
    const first = data.detail[0]
    return {
      status,
      message: first.msg ?? first.message ?? 'Request failed.',
      isNetworkError: false,
      isTimeout: false,
    }
  }

  if (typeof data?.message === 'string') {
    return {
      status,
      message: data.message,
      isNetworkError: false,
      isTimeout: false,
    }
  }

  if (isTimeout) {
    return {
      status,
      message: 'Request timed out. Check that the API is reachable.',
      isNetworkError: false,
      isTimeout: true,
    }
  }

  if (isNetworkError) {
    return {
      status,
      message: 'Cannot reach the API. Confirm the backend is running.',
      isNetworkError: true,
      isTimeout: false,
    }
  }

  if (status === 404) {
    return {
      status,
      message: 'Resource not found.',
      isNetworkError: false,
      isTimeout: false,
    }
  }

  if (status && status >= 500) {
    return {
      status,
      message: 'Server error. Try again in a moment.',
      isNetworkError: false,
      isTimeout: false,
    }
  }

  return {
    status,
    message: axiosError.message || 'Request failed.',
    isNetworkError: false,
    isTimeout: false,
  }
}