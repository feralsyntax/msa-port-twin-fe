import axios from 'axios';
import type { AxiosError } from 'axios';

/** Matches OpenAPI APIErrorDetail / APIErrorResponse */
export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
}

export interface ParsedApiError {
  status?: number;
  code?: string;
  message: string;
  details?: unknown;
  isNetworkError: boolean;
  isTimeout: boolean;
}

type ApiErrorBody = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
  detail?: string | Array<{ msg?: string; message?: string }>;
  message?: string;
};

export function parseApiError(error: unknown): ParsedApiError {
  if (!axios.isAxiosError(error)) {
    return {
      message: error instanceof Error ? error.message : 'Something went wrong.',
      isNetworkError: false,
      isTimeout: false,
    };
  }

  const axiosError = error as AxiosError<ApiErrorBody>;
  const status = axiosError.response?.status;
  const data = axiosError.response?.data;

  const isTimeout =
    axiosError.code === 'ECONNABORTED' || axiosError.message.toLowerCase().includes('timeout');

  const isNetworkError = !axiosError.response && axiosError.request != null;

  // Prefer schema shape: { error: { code, message, details } }
  if (data?.error?.message) {
    return {
      status,
      code: data.error.code,
      message: data.error.message,
      details: data.error.details,
      isNetworkError: false,
      isTimeout: false,
    };
  }

  // Common DRF fallbacks
  if (typeof data?.detail === 'string') {
    return {
      status,
      message: data.detail,
      isNetworkError: false,
      isTimeout: false,
    };
  }

  if (Array.isArray(data?.detail) && data.detail.length > 0) {
    const first = data.detail[0];
    return {
      status,
      message: first.msg ?? first.message ?? 'Request failed.',
      isNetworkError: false,
      isTimeout: false,
    };
  }

  if (typeof data?.message === 'string') {
    return {
      status,
      message: data.message,
      isNetworkError: false,
      isTimeout: false,
    };
  }

  if (isTimeout) {
    return {
      status,
      message: 'Request timed out. Check that the API is reachable.',
      isNetworkError: false,
      isTimeout: true,
    };
  }

  if (isNetworkError) {
    return {
      status,
      message: 'Cannot reach the API. Confirm the backend is running.',
      isNetworkError: true,
      isTimeout: false,
    };
  }

  if (status === 404) {
    return {
      status,
      message: 'Resource not found.',
      isNetworkError: false,
      isTimeout: false,
    };
  }

  if (status && status >= 500) {
    return {
      status,
      message: 'Server error. Try again in a moment.',
      isNetworkError: false,
      isTimeout: false,
    };
  }

  return {
    status,
    message: axiosError.message || 'Request failed.',
    isNetworkError: false,
    isTimeout: false,
  };
}
/** Field name → first server message (for react-hook-form setError) */
export type FieldErrorMap = Partial<Record<string, string>>

function firstMessage(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value
  if (Array.isArray(value)) {
    for (const item of value) {
      const msg = firstMessage(item)
      if (msg) return msg
    }
  }
  if (value && typeof value === 'object' && 'message' in value) {
    return firstMessage((value as { message: unknown }).message)
  }
  return undefined
}

/**
 * Pull per-field messages from common API shapes:
 * - { error: { details: { field: ["msg"] } } }  (schema APIErrorResponse)
 * - { name: ["msg"], parameters: { simulation_hours: ["msg"] } }  (DRF)
 * - { error: { details: { fields: { ... } } } }
 *
 * Nested objects are flattened to react-hook-form paths (e.g. parameters.simulation_hours).
 */
export function getFieldErrors(error: unknown): FieldErrorMap {
  if (!axios.isAxiosError(error)) return {}

  const data = error.response?.data as Record<string, unknown> | undefined
  if (!data || typeof data !== 'object') return {}

  const out: FieldErrorMap = {}

  const assignFrom = (source: Record<string, unknown>, prefix = '') => {
    for (const [key, value] of Object.entries(source)) {
      if (
        key === 'error' ||
        key === 'detail' ||
        key === 'message' ||
        key === 'non_field_errors'
      ) {
        continue
      }

      const path = prefix ? `${prefix}.${key}` : key
      const msg = firstMessage(value)

      if (msg) {
        out[path] = msg
        continue
      }

      // Nested field errors: { parameters: { simulation_hours: ["…"] } }
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        assignFrom(value as Record<string, unknown>, path)
      }
    }
  }

  const envelope = data.error
  if (envelope && typeof envelope === 'object') {
    const details = (envelope as { details?: unknown }).details
    if (details && typeof details === 'object' && !Array.isArray(details)) {
      const d = details as Record<string, unknown>
      if (d.fields && typeof d.fields === 'object' && !Array.isArray(d.fields)) {
        assignFrom(d.fields as Record<string, unknown>)
      } else {
        assignFrom(d)
      }
    }
  }

  assignFrom(data)

  const nonField =
    firstMessage(data.non_field_errors) ??
    firstMessage(
      envelope && typeof envelope === 'object'
        ? (envelope as { details?: { non_field_errors?: unknown } }).details
            ?.non_field_errors
        : undefined,
    )
  if (nonField) out.non_field_errors = nonField

  return out
}

export function hasFieldErrors(fields: FieldErrorMap): boolean {
  return Object.keys(fields).some((k) => k !== 'non_field_errors')
}