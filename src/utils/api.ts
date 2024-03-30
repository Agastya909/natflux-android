import axios, { AxiosError, AxiosHeaders } from "axios";
import { MMKV } from ".";

const axiosInstance = axios.create({
  baseURL: "http://10.0.2.2:4000",
  withCredentials: true,
  responseType: "json"
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const JWT = MMKV.getByKey("jwt");
      if (JWT) config.headers.Authorization = `Bearer ${JWT}`;
    } catch (error) {
      console.log("error in request interceptor", error);
    } finally {
      return config;
    }
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject({ isAxiosError: error.isAxiosError, data: error });
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject({
      isAxiosError: error.isAxiosError,
      data: error.response?.data,
      url: `${error.response?.config.baseURL}/${error.response?.config.url}`,
      status: error.response?.status
    });
  }
);

const Auth = {
  verifyJWT: () => axiosInstance.get("auth/user/verify-jwt"),
  signup: (body: { name: string; email: string; password: string }) => axiosInstance.post("auth/user/create", body),
  login: (body: { email: string; password: string }) => axiosInstance.post("auth/user/login", body),
  resetPassword: (body: { password: string; newPassword: string }) =>
    axiosInstance.post("auth/user/reset-password", body)
};

const Video = {
  getHomeFeed: () => axiosInstance.get("video/home"),
  getVideoDetails: (id: string) => axiosInstance.get(`video/${id}`),
  searchVideo: (body: { searchTerm: string; limit: number; offset: number }) =>
    axiosInstance.post("video/search", body),
  uploadVideo: (body: FormData) =>
    axiosInstance.post("/video/add", body, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: e => e.progress
    })
};

export default { Auth, Video };
