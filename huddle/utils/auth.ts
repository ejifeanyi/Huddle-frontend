import cookie from "js-cookie";
import axios from "axios";
import { baseURL } from "./constant";

export const setCookie = (key: any, value: any) => {
	cookie.set(key, value, { expires: 15 }); // Set cookie with expiration of 15 days
};

export const removeCookie = (key: any) => {
	cookie.remove(key); // Remove cookie by key
};

export const getCookie = (key: any) => {
	return cookie.get(key); // Get cookie value by key
};

export const setAuthentication = (token: any) => {
	setCookie("token", token); // Set authentication token as a cookie named "token"
};

export const logOut = () => {
	removeCookie("token"); // Remove authentication token cookie to log out
};

export const isLogin = async () => {
	const token = getCookie("token"); // Get authentication token from cookie

	if (token) {
		try {
			const res = await axios.post(`${baseURL}/auth`, { token }); // Send POST request to verify token
			return res.data.success; // Return true if token is valid
		} catch (error) {
			console.error("Error checking login status:", error);
			return false; // Return false if there's an error or token is invalid
		}
	}
	return false; // Return false if no token found
};
