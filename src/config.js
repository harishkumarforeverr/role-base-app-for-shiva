import Axios from "axios";
import BASE_URL from "./BaseUrl";
import { tokenKeyConstant } from "./utils";

export const CommonAxios = Axios.create({
  baseURL: BASE_URL,
});

CommonAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(tokenKeyConstant);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
CommonAxios.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error?.response?.status) {
      switch (error?.response?.status) {
        case 400:
          return error;
        case 401:
          return error;
        case 403:
          return error;

        case 404:
          return error;

        case 502:
          return error;
        default:
          return error;
      }
    }
  }
);
