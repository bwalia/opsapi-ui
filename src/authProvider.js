import { jwtDecode } from "jwt-decode";
import { fetchUtils } from 'react-admin';
const httpClient = fetchUtils.fetchJson;

export default {
    async login({ username, password }) {
        const loginUrl = import.meta.env.VITE_LOGIN_URL
        const request = new Request(loginUrl, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: new Headers({ "Content-Type": "application/json" }),
        });
        let response;
        try {
            response = await fetch(request);
        } catch (_error) {
            throw new Error("Network error");
        }
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        const auth = await response.json();
        localStorage.setItem("auth", auth.token);
        localStorage.setItem("permissions", JSON.stringify(auth.permissions));
        localStorage.setItem("user", JSON.stringify(auth.user));
        localStorage.setItem("role", auth.user.role);
    },
    async checkError(error) {
        const status = error.status;
        console.log({ error });

        if (status === 401) {
            // localStorage.removeItem("auth");
            // localStorage.removeItem("user");
            // throw new Error("Session expired");
        }
        if (status === 403) {
            localStorage.removeItem("auth");
            localStorage.removeItem("user");
            localStorage.removeItem("permissions");
            localStorage.removeItem("role");
            Promise.reject(error.body.data);

        }
        // other error codes (404, 500, etc): no need to log out
    },
    async checkAuth() {
        const { protocol, hostname, port } = window.location;
        const baseURL = port ? `${protocol}//${hostname}:${port}` : `${protocol}//${hostname}`;
        const loginServer = import.meta.env.VITE_LOGIN_SERVER
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (!token && !localStorage.getItem('auth')) {
            throw { redirectTo: `${loginServer}/auth/login?from=${baseURL}` };
        } else {
            const decoded = jwtDecode(token);
            localStorage.setItem("auth", token);
            localStorage.setItem("user", JSON.stringify(decoded));

            // urlParams.delete('token');
        }
    },
    async logout() {
        const loginServer = import.meta.env.VITE_LOGIN_SERVER
        const userObj = localStorage.getItem('user');
        if (userObj) {
            const user = JSON.parse(userObj);
            const url = `${loginServer}/auth/logout?sub=${user.sub}`
            try {
                const { status, json } = await httpClient(url);
                console.log({status, json});
                
                if (status == 200) {
                    const { protocol, hostname, port } = window.location;
                    const baseURL = port ? `${protocol}//${hostname}:${port}` : `${protocol}//${hostname}`;
                    localStorage.removeItem("auth");
                    localStorage.removeItem("user");
                    // window.location.href = baseURL;
                }
            } catch (_error) {
                console.log({_error});
                
                throw new Error(_error);
            }
        }
        // if (response.status < 200 || response.status >= 300) {
        //     throw new Error(response.statusText);
        // }
        // const auth = await response.json();
        // console.log({auth});
        
        // localStorage.removeItem("auth");
        // localStorage.removeItem("user");
        // localStorage.removeItem("permissions");
        // localStorage.removeItem("role");
    },
    // async getIdentity() {
    //     const userObject = localStorage.getItem("user");
    //     const user = JSON.parse(userObject);
    //     return { id: user.id, fullName: user.username };
    // },
    // async canAccess({ action, resource }) {
    //     try {
    //         const permissions = JSON.parse(localStorage.getItem('permissions'));

    //         if (!permissions || !Array.isArray(permissions)) {
    //             return false;
    //         }

    //         // Check if the action is allowed for this resource
    //         return permissions.some(perm => perm.resource === resource &&
    //             perm.action.includes(action));
    //     } catch (error) {
    //         console.error('Error checking permissions:', error);
    //         return true; // Fallback to always allow access if there's an error
    //     }
    // },
};