"use client"

import { RESOURCE_NAME } from "@/constants/resource.constants"
import axiosInstance from "@/lib/axios"
import { Refine } from "@refinedev/core"
import routerProvider from "@refinedev/nextjs-router"
import { DataProvider } from "@refinedev/strapi-v4"
import { accessControlProvider } from "./access-control.provider"
import { authProvider } from "./auth.provider"

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL!

export default function RefineProvider({ children }: { children: React.ReactNode }) {
	return (
		<Refine
			routerProvider={routerProvider}
			dataProvider={DataProvider(API_URL, axiosInstance)}
			authProvider={authProvider}
			accessControlProvider={accessControlProvider}
			resources={[
				{
					name: "login",
					list: "/login",
				},
				{
					name: "dashboard",
					list: "/dashboard",
				},
				{
					name: "applicants",
					list: "/applicants",
					create: "/applicants/create",
					edit: "/applicants/edit/:id",
					show: "/applicants/show/:id",
				},
				// {
				// 	name: "interviews",
				// 	list: "/interviews",
				// },
			]}
		>
			{children}
		</Refine>
	)
}
