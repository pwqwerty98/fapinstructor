import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import captureError from "@/utils/captureError";

// TODO: This is in need of a desperate rewrite.
async function authRequestInterceptor(config: AxiosRequestConfig) {
  /**
   * Wait until the auth has finished loading before making any requests
   */

  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use((response) => {
  return response.data;
});
