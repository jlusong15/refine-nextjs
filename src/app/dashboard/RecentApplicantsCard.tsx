"use client"

import LinkButton from "@/components/shared/LinkButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Applicant } from "@/types/applicants.types"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"

type RecentApplicantsCardProps = {
	applicants: Applicant[]
}

export default function RecentApplicantsCard({ applicants }: RecentApplicantsCardProps) {
	const applicantsList = [...(applicants ?? [])]
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 5)

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Recent Applicants</CardTitle>
				<LinkButton href="/applicants" variant="ghost" className="text-sm">
					View All <ArrowRight className="h-4 w-4" />
				</LinkButton>
			</CardHeader>

			<CardContent className="">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>E-mail</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Applied Role</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Applied</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{applicantsList?.length === 0 ? (
							<TableRow>
								<TableCell colSpan={3} className="text-center text-muted-foreground">
									No applicants found.
								</TableCell>
							</TableRow>
						) : (
							applicantsList?.map((applicant) => (
								<TableRow key={applicant.documentId}>
									<TableCell className="font-medium">{applicant.fullName}</TableCell>
									<TableCell className="font-medium">{applicant.email}</TableCell>
									<TableCell className="font-medium">{applicant.phone}</TableCell>
									<TableCell className="font-medium">{applicant.appliedRole}</TableCell>
									<TableCell>{applicant.applicationStatus}</TableCell>
									<TableCell className="text-right text-muted-foreground">
										{format(new Date(applicant.createdAt), "MMM dd, yyyy")}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
