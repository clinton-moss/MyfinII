import axios from 'axios';
import Authentication from "./services/Authentication";

var API = {
    async process(url, method, req) {
        //const baseURL = 'https://localhost:44458/';
        const baseURL = '';
        console.log(url, JSON.stringify(req))
        // token
        const token = Authentication.token;
        let customHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        if (await token() != null) {
            customHeaders = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + await token(),
                "Token": await Authentication.refresh(),
            }
        }

        const requestConfig = {
            method: method,
            url: baseURL + url,
            headers: customHeaders,
        }
        requestConfig.data = req
        try {
            const response = await axios(requestConfig)
            if (response.headers.get("Sync"))
                return response.headers.get("Sync")
            if (response.headers.get("Token"))
                Authentication.refreshToken(response.headers.get("Token"))
            if (response.status === 204) // No Content
                return true
            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) window.location.assign('/logout')
                else {
                    const _err = err
                    throw _err.response.data
                }
            } else throw err
        }
    }
}

export default API;