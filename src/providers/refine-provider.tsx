"use client"

import { Refine } from "@refinedev/core"
import routerProvider from "@refinedev/nextjs-router"
import { DataProvider } from "@refinedev/strapi-v4"
import axiosInstance from "@/lib/axios"

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL!

export default function RefineProvider({ children }: { children: React.ReactNode }) {
	return (
		<Refine
			routerProvider={routerProvider}
			dataProvider={DataProvider(API_URL)}
			resources={[
				{
					name: "applicants",
					list: "/applicants",
					create: "/applicants/create",
					edit: "/applicants/edit/:id",
					show: "/applicants/:id",
				},
			]}
		>
			{children}
		</Refine>
	)
}
