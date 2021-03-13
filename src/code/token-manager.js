import {axiosInstance} from "./http-common";
import {WA_APP_TOKEN} from "./constants";

export class TokenManager {
    token = null;

    setToken(token) {
        this.token = token
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`

        localStorage.setItem(WA_APP_TOKEN, token)
    }

    logout() {
        this.token = null
        delete axiosInstance.defaults.headers['Authorization']
        localStorage.removeItem(WA_APP_TOKEN)
    }

    renew() {
        const token = localStorage.getItem(WA_APP_TOKEN)
        if (token) {
            this.setToken(token)
        }
    }

    getPayload() {
        if (this.token) {
            const parts = this.token.split(".")
            const rawToken = atob(parts[1])
            return JSON.parse(rawToken)
        }
        return null
    }

    isUserLogged() {
        return this.token != null
    }
}