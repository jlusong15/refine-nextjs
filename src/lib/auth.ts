import { AuthUser } from "@/types/auth.types";

export const TOKEN_KEY = "token";
export const USER_KEY = "user";
export const auth = {
	getToken(): string | null {
		if (typeof window === "undefined") {
			return null;
		}
		return localStorage.getItem(TOKEN_KEY);
	},
	setToken(token: string) {
		localStorage.setItem(TOKEN_KEY, token);
	},
	removeToken() {
		localStorage.removeItem(TOKEN_KEY);
	},
	getUser(): AuthUser | null {
		if (typeof window === "undefined") {
			return null;
		}
		const user = localStorage.getItem(USER_KEY);

		if (!user) {
			return null;
		}
		return JSON.parse(user) as AuthUser;
	},
	setUser(user: AuthUser) {
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	},
	removeUser() {
		localStorage.removeItem(USER_KEY);
	},
	isAuthenticated(): boolean {
		return !!this.getToken();
	},
	clear() {
		this.removeToken();
		this.removeUser();
	},
};