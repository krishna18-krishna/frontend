import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};
api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original?._retry &&
      !original?.url?.includes("/auth/")
    ) {
      original._retry = true;
      try {
        const refreshed = await api.post("/auth/refresh");
        setAccessToken(refreshed.data.data.accessToken);
        return api(original);
      } catch {
        setAccessToken(null);
      }
    }
    return Promise.reject(error);
  },
);
