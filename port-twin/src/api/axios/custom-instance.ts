import type { AxiosError, AxiosRequestConfig } from 'axios';

import axiosInstance from './axios';

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return axiosInstance({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
    },
  }).then(({ data }) => data);
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
