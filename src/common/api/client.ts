import axios, { AxiosError } from "axios";

import captureError from "@/utils/captureError";
import { API_URL } from "@/config";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(async (config) => {
  /**
   * Wait until the auth has finished loading before making any requests
   */
  return config;
});

// Sentry has a quota, so we want to try and limit the number of events tracked
const ignoreStatusCodes = [400, 404];

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (!status || !ignoreStatusCodes.includes(status)) {
      captureError(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
