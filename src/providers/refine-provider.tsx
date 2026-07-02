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
			dataProvider={DataProvider(API_URL, axiosInstance)}
			resources={[
				{
					name: "book-reviews",
					list: "/book-reviews",
					create: "/submit-book-review",
					edit: "/book-reviews/edit/:id",
					show: "/book-reviews/:id",
				},
				{
					name: "posts",
					list: "/posts",
					create: "/posts/create",
					edit: "/posts/edit/:id",
					show: "/posts/:id",
				},
				{
					name: "categories",
					list: "/categories",
				},
			]}
		>
			{children}
		</Refine>
	)
}
