"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import ErrorPage from "@/components/layout/ErrorPage"
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog"
import DetailsRow from "@/components/shared/DetailsRow"
import LinkButton from "@/components/shared/LinkButton"
import Loading from "@/components/shared/Loading"
import MiniLoader from "@/components/shared/MiniLoader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody } from "@/components/ui/table"
import { formatCurrency, formatDateTime } from "@/lib/format"
import { Applicant } from "@/types/applicants.types"
import { useDelete, useShow } from "@refinedev/core"
import { ChevronLeft, Pencil, Trash2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function ApplicantDetailsPage() {
	const router = useRouter()
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const params = useParams()
	const id = params.id as string
	const { query } = useShow<Applicant>({
		resource: "applicants",
		id,
	})
	const {
		mutate: deleteApplicant,
		mutation: { isPending: isDeleting },
	} = useDelete()
	const { data, isLoading, isRefetching, error } = query

	if ((isLoading || isRefetching) && !isDeleting) return <Loading />
	if (error || !data?.data) {
		return <ErrorPage title="Applicant Not Found" />
	}

	const applicant = data.data

	const handleDelete = () => {
		if (!isDeleteDialogOpen) {
			return setIsDeleteDialogOpen(true)
		}

		deleteApplicant(
			{
				resource: "applicants",
				id: applicant.documentId,
				invalidates: ["list"],
			},
			{
				onSuccess: () => {
					toast.success("Applicant deleted successfully.")
					setIsDeleteDialogOpen(false)
					router.push(`/applicants`)
				},
				onError: () => {
					toast.error("Failed to delete applicant.")
					setIsDeleteDialogOpen(false)
				},
			},
		)
	}

	return (
		<DefaultPageLayout title="Applicant Details">
			<div className="flex mb-4 justify-between">
				<div>
					<LinkButton href="/applicants" variant="outline" className="pl-1 pr-2" disabled={isDeleting}>
						<ChevronLeft /> Back to List
					</LinkButton>
				</div>
				<div className="flex gap-1 items-center">
					{isDeleting && <MiniLoader />}
					<LinkButton href={`/applicants/edit/${applicant.documentId}`} disabled={isDeleting}>
						<Pencil /> Edit
					</LinkButton>
					<Button variant="destructive" onClick={() => handleDelete()} disabled={isDeleting}>
						<Trash2 /> Delete
					</Button>
				</div>
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

			<DeleteConfirmationDialog
				open={isDeleteDialogOpen}
				onOpenChange={(open) => {
					if (!open) setIsDeleteDialogOpen(false)
				}}
				onConfirm={handleDelete}
				isLoading={isDeleting}
				title="Delete Applicant?"
				description={
					<>
						Are you sure you want to delete <strong>{applicant?.fullName}</strong>?
						<br />
						This action cannot be undone.
					</>
				}
			/>
		</DefaultPageLayout>
	)
}
