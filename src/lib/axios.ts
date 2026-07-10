import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
	// headers: {
	// 	Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
	// },
	withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;