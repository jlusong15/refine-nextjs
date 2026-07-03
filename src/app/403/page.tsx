import { ShieldX } from "lucide-react"

import LinkButton from "@/components/shared/LinkButton"

export default function ForbiddenPage() {
	return (
		<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
			<div className="max-w-md text-center">
				<div className="mb-6 flex justify-center">
					<div className="rounded-full bg-destructive/10 p-5">
						<ShieldX className="h-14 w-14 text-destructive" />
					</div>
				</div>
				<h1 className="text-5xl font-bold tracking-tight">403</h1>
				<h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>
				<p className="mt-3 text-muted-foreground">
					You do not have permission to access this page. Please switch to a viewer with the required access or return to
					the previous page.
				</p>
				<div className="mt-8 flex justify-center gap-3">
					<LinkButton href="/" variant="outline">
						Go Home
					</LinkButton>
					<LinkButton href="/applicants">Applicants</LinkButton>
				</div>
			</div>
		</div>
	)
}
