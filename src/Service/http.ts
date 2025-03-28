import axios from "axios";
import {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import {
  BASE_URL,
  SYSTEM_ERROR_MESSAGE,
  STORAGE_TOKEN_KEY,
} from "@common/contant";
import { replaceTmpUrlByParams } from "@utils/url";

const handleRequestConfigUrl = (config: InternalAxiosRequestConfig) => {
  try {
    const tokenKey = JSON.parse(
      localStorage.getItem(STORAGE_TOKEN_KEY) || "{}"
    );
    const practice_id = tokenKey.practiceId;
    const access_code = tokenKey.accessCode;
    config.url = replaceTmpUrlByParams(config.url || "", {
      practice_id,
      access_code,
    });
  } catch (e) {
    console.log(e);
  }
};

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
    handleRequestConfigUrl(config);
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
    else {
      // @ts-ignore
      const errorCode = data.errorCode;
      // @ts-ignore
      const errorMessage = data.errorMessage || SYSTEM_ERROR_MESSAGE;
      throw new Error(errorMessage, { cause: { errorCode, errorMessage } });
    }
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

async function patch<T>(url: string, options?: AxiosRequestConfig) {
  return request<T>({
    ...options,
    url,
    method: "PATCH",
  });
}

export { serviceAxios, request, get, post, patch };
