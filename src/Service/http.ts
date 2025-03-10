import axios from "axios";
import {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { BASE_URL, SYSTEM_ERROR_MESSAGE } from "@common/contant";

const serviceAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 15 * 1000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  validateStatus() {
    return true;
  },
});

serviceAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

serviceAxios.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

async function request<T>(options: AxiosRequestConfig) {
  try {
    const response = await serviceAxios.request<T>(options);
    const { status, data } = response;
    if (status !== 200) throw new Error(SYSTEM_ERROR_MESSAGE);
    // @ts-ignore
    if (data.success) return Promise.resolve(data.data as T["data"]);
    // @ts-ignore
    else throw new Error(data.errorMessage || SYSTEM_ERROR_MESSAGE);
  } catch (error) {
    return Promise.reject(error || SYSTEM_ERROR_MESSAGE);
  }
}

async function get<T>(url: string, options?: AxiosRequestConfig) {
  return request<T>({
    ...options,
    url,
    method: "GET",
  });
}

async function post<T>(url: string, options?: AxiosRequestConfig) {
  return request<T>({
    ...options,
    url,
    method: "POST",
  });
}

export { serviceAxios, request, get, post };
