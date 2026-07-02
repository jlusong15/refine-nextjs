import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
	headers: {
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
	},
});

export default axiosInstance;