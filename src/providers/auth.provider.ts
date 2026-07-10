import axiosInstance from "@/lib/axios";
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
	login: async ({ email, password }) => {
		try {
			const { data } = await axiosInstance.post(
				"/auth/local",
				{
					identifier: email,
					password,
				},
			);
			localStorage.setItem("token", data.jwt);
			localStorage.setItem("user", JSON.stringify(data.user));
			return {
				success: true,
				redirectTo: "/dashboard",
			};

		} catch {
			return {
				success: false,
				error: {
					name: "Login Error",
					message: "Invalid credentials",
				},
			};
		}
	},
	logout: async () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		return {
			success: true,
			redirectTo: "/login",
		};
	},
	check: async () => {
		const token = localStorage.getItem("token");
		if (token) {
			return {
				authenticated: true,
			};
		}
		return {
			authenticated: false,
			redirectTo: "/login",
		};
	},
	getIdentity: async () => {
		const user = localStorage.getItem("user");
		if (!user) {
			return null;
		}
		return JSON.parse(user);
	},
	onError: async (error) => {
		if (error.status === 401) {
			localStorage.removeItem("token");
			return {
				logout: true,
			};
		}
		return {};
	},
};