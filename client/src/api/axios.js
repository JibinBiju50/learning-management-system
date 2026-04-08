import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

//instance for axios to reuse everywhere
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

// Intercept 401 responses and attempt to refresh the access token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and we haven't already retried, try refreshing the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post(`${API_URL}/api/auth/refresh`, {}, { withCredentials: true });
                // Retry the original request with the new access token cookie
                return api(originalRequest);
            } catch {
                // Refresh also failed — user needs to log in again
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api;