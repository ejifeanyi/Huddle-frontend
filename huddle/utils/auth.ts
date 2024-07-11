import cookie from "js-cookie";
import axios from "axios";
import { baseURL } from "./constant";

export const setCookie = (key: string, value: string) => {
	cookie.set(key, value, { expires: 15 });
};

export const removeCookie = (key: string) => {
	cookie.remove(key);
};

export const getCookie = (key: string) => {
	return cookie.get(key);
};

export const setAuthentication = (token: string) => {
	setCookie("token", token);
	localStorage.setItem("token", token); // Ensure token is also set in local storage
};

export const logOut = () => {
	removeCookie("token");
	localStorage.removeItem("token"); // Remove token from local storage
};

export const isLogin = async () => {
	const token = getCookie("token");
	if (token) {
		try {
			const res = await axios.post(`${baseURL}/auth`, { token });
			return res.data.success;
		} catch (error) {
			console.error("Error checking login status:", error);
			return false;
		}
	}
	return false;
};
