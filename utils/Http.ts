import axios, { type AxiosRequestHeaders } from "axios";
import { apiBaseURL , apiKey } from "@configs/urls";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  baseURL?: string;
  url?: string;
  method?: Method;
  headers?: AxiosRequestHeaders;
  params?: Dictionary;
  data?: Dictionary;
}

export default class Http {
  static async get<T>(options: FetchOptions | string) {
    const config = typeof options === "string" ? { url: options } : options;

    return this.request<T>({ method: "GET", ...config });
  }

  static async post<T>(options: FetchOptions) {
    return this.request<T>({ method: "POST", ...(options || {}) });
  }

  static async patch<T>(options: FetchOptions) {
    return this.request<T>({ method: "PATCH", ...(options || {}) });
  }

  static async delete<T>(options: FetchOptions) {
    return this.request<T>({ method: "DELETE", ...(options || {}) });
  }

  static async request<T>(options: FetchOptions) {
    const {
      baseURL = apiBaseURL,
      url,
      method = "GET",
      headers,
      params,
    } = options;

    const _headers = {
      Accept: "application/json",
      "x-access-token": apiKey ,
      ...headers,
    };

    const response = await axios.request<T>({
      method,
      url,
      baseURL,
      params,
      ...(_headers ? { headers: _headers } : {}),
    });
    
    console.log(response);
    return response.data;
  }
}