"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetIdentity } from "@refinedev/core"

type UserIdentity = {
	id: number
	username: string
	email: string
}

export default function MePage() {
	const { data: user, isLoading } = useGetIdentity<UserIdentity>()

	if (isLoading) {
		return <div className="flex items-center justify-center p-8">Loading...</div>
	}

	if (!user) {
		return <div className="flex items-center justify-center p-8">User not found.</div>
	}

	return (
		<div className="container mx-auto max-w-2xl py-8">
			<Card>
				<CardHeader>
					<CardTitle>My Profile</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<div>
						<p className="text-sm text-muted-foreground">ID</p>
						<p>{user.id}</p>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">Username</p>
						<p>{user.username}</p>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">Email</p>
						<p>{user.email}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
