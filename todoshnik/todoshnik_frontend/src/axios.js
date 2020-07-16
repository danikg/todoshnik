import axios from "axios";

import { getCookie } from "./utils";

export const axiosInstance = axios.create({
    baseURL: "/api/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
    },
});

export function setTokens(data) {
    if (data.access) {
        localStorage.setItem("access_token", data.access);
    }

    if (data.refresh) {
        localStorage.setItem("refresh_token", data.refresh);
    }
}

export function getUserData() {
    try {
        const raw_token = localStorage.getItem("access_token");
        const token = raw_token.split(/\./)[1];
        return JSON.parse(window.atob(token));
    } catch (errorMsg) {
        return {};
    }
}

axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("access_token");

    if (request.url !== "/sign_up/") {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

axiosInstance.interceptors.response.use(
    (originalResponse) => originalResponse,
    (error) => {
        const originalRequest = error.config;

        try {
            if (
                error.response.status === 401 &&
                error.response.statusText === "Unauthorized" &&
                error.response.config.url !== "/token/" &&
                error.response.config.url !== "token/refresh/" &&
                error.response.config.url !== "/sign_up/"
            ) {
                return axiosInstance
                    .post("token/refresh/", {
                        refresh: localStorage.getItem("refresh_token"),
                    })
                    .then((response) => {
                        setTokens(response.data);
                        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch(() => {
                        window.location.href = "/login/";
                    });
            }
        } catch (errorMsg) {
            window.location.href = "/login/";
        }
    }
);

export default { axiosInstance, setTokens, getUserData };
