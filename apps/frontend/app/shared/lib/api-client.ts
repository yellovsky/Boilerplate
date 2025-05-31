import axios, { type AxiosInstance, type AxiosRequestConfig, isAxiosError } from 'axios';
import { useState } from 'react';

import { type FailedResponse, failedResponseSchema } from '@repo/api-models';

import { getGlobal } from './get-global';

const unknownFailedResponse: FailedResponse = {
  error: {
    code: 'unknown_error',
    httpCode: 500,
    message: 'Unknown error',
    timestamp: new Date().toISOString(),
  },
  status: 'error',
} as const;

export interface ApiClient {
  axios: AxiosInstance;

  get<T = unknown>(url: string, config?: AxiosRequestConfig<unknown>): Promise<T>;
  delete<T = unknown>(url: string, config?: AxiosRequestConfig<unknown>): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>): Promise<T>;
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>): Promise<T>;
}

class ApiClientImpl implements ApiClient {
  axios: AxiosInstance;

  constructor(readonly apiHost: string) {
    this.axios = axios.create({ baseURL: `${apiHost}/api` });
  }

  async get<T = unknown>(url: string, config?: AxiosRequestConfig<unknown>): Promise<T> {
    try {
      const axiosResponse = await this.axios.get<T>(url, config);
      return axiosResponse.data;
    } catch (error) {
      const parsed = isAxiosError(error) ? failedResponseSchema.safeParse(error.response?.data) : undefined;

      const failedResponse: FailedResponse = parsed?.data || unknownFailedResponse;
      throw failedResponse;
    }
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>): Promise<T> {
    try {
      const axiosResponse = await this.axios.post<T>(url, data, config);
      return axiosResponse.data;
    } catch (error) {
      const parsed = isAxiosError(error) ? failedResponseSchema.safeParse(error.response?.data) : undefined;

      const failedResponse: FailedResponse = parsed?.data || unknownFailedResponse;
      throw failedResponse;
    }
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>): Promise<T> {
    try {
      const axiosResponse = await this.axios.put<T>(url, data, config);
      return axiosResponse.data;
    } catch (error) {
      const parsed = isAxiosError(error) ? failedResponseSchema.safeParse(error.response?.data) : undefined;

      const failedResponse: FailedResponse = parsed?.data || unknownFailedResponse;
      throw failedResponse;
    }
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig<unknown>): Promise<T> {
    try {
      const axiosResponse = await this.axios.delete<T>(url, config);
      return axiosResponse.data;
    } catch (error) {
      const parsed = isAxiosError(error) ? failedResponseSchema.safeParse(error.response?.data) : undefined;

      const failedResponse: FailedResponse = parsed?.data || unknownFailedResponse;
      throw failedResponse;
    }
  }
}

let cached: ApiClient | undefined;

export const getApiClient = (): ApiClient => {
  const apiHost = getGlobal('REMIX_PUBLIC_API_HOST');
  if (typeof window === 'undefined') return new ApiClientImpl(apiHost);
  if (!cached) cached = new ApiClientImpl(apiHost);
  return cached;
};

export const useApiClient = () => useState(() => getApiClient())[0];
