"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import ErrorPage from "@/components/layout/ErrorPage"
import DetailsRow from "@/components/shared/DetailsRow"
import Loading from "@/components/shared/Loading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDateTime } from "@/lib/format"
import { Applicant } from "@/types/applicants.types"
import { useShow } from "@refinedev/core"
import { useParams } from "next/navigation"

export default function ApplicantDetailsPage() {
	const params = useParams()
	const id = params.id as string
	const { query } = useShow<Applicant>({
		resource: "applicants",
		id,
	})
	const { data, isLoading, error } = query

	if (isLoading) return <Loading />
	if (error || !data?.data) {
		return <ErrorPage title="Applicant Not Found" />
	}

	const applicant = data.data

	return (
		<DefaultPageLayout title="Applicant Details">
			<Card>
				<CardHeader>
					<CardTitle className="text-primary text-xl">{applicant.fullName}</CardTitle>
				</CardHeader>

				<CardContent>
					<Table>
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
					</Table>
				</CardContent>
			</Card>
		</DefaultPageLayout>
	)
}
