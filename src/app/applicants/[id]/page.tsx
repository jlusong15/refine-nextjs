"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import ErrorPage from "@/components/layout/ErrorPage"
import DetailsRow from "@/components/shared/DetailsRow"
import LinkButton from "@/components/shared/LinkButton"
import Loading from "@/components/shared/Loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody } from "@/components/ui/table"
import { formatCurrency, formatDateTime } from "@/lib/format"
import { Applicant } from "@/types/applicants.types"
import { useShow } from "@refinedev/core"
import { ChevronLeft, Pencil, Trash2 } from "lucide-react"
import { useParams } from "next/navigation"

export default function ApplicantDetailsPage() {
	const params = useParams()
	const id = params.id as string
	const { query } = useShow<Applicant>({
		resource: "applicants",
		id,
	})
	const { data, isLoading, isRefetching, error } = query

	if (isLoading || isRefetching) return <Loading />
	if (error || !data?.data) {
		return <ErrorPage title="Applicant Not Found" />
	}

	const applicant = data.data

	return (
		<DefaultPageLayout title="Applicant Details">
			<div className="flex gap-0.5 mb-4 justify-end">
				<LinkButton href={`/applicants/edit/${applicant.documentId}`}>
					<Pencil /> Edit
				</LinkButton>
				{/* @@TODO: Add delete functionality */}
				<Button>
					<Trash2 /> Delete
				</Button>
				<LinkButton href="/applicants" variant="outline" className="pl-1 pr-2">
					<ChevronLeft /> Back to List
				</LinkButton>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="text-primary text-xl">{applicant.fullName}</CardTitle>
				</CardHeader>

				<CardContent>
					<Table>
						<TableBody>
							<DetailsRow label="ID" value={applicant.documentId} />
							<DetailsRow label="Full Name" value={applicant.fullName} />
							<DetailsRow label="Email" value={applicant.email} />
							<DetailsRow label="Phone" value={applicant.phone} />
							<DetailsRow label="Applied Role" value={applicant.appliedRole} />
							<DetailsRow label="Status" value={applicant.applicationStatus} />
							<DetailsRow
								label="Expected Salary"
								value={applicant.expectedSalary ? formatCurrency(applicant.expectedSalary) : "-"}
							/>
							<DetailsRow
								label="Available Start Date"
								value={applicant.availableStartDate ? formatDateTime(applicant.availableStartDate) : "-"}
							/>
							<DetailsRow label="Skills" value={applicant.skills?.length ? applicant.skills.join(", ") : "-"} />
							<DetailsRow label="Notes" value={applicant.notes} />
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</DefaultPageLayout>
	)
}
