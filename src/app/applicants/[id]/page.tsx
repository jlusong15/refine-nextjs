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
import { ACCESS_ACTIONS } from "@/constants/access.constants"
import { RESOURCE_NAME } from "@/constants/resource.constants"
import { formatCurrency, formatDateTime } from "@/lib/format"
import { Applicant } from "@/types/applicants.types"
import { CanAccess, useDelete, useList, useShow } from "@refinedev/core"
import { CalendarPlus, ChevronLeft, Pencil, Trash2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"
import CreateInterviewDialog from "./CreateInterviewDialog"

export default function ApplicantDetailsPage() {
	const router = useRouter()
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false)
	const params = useParams()
	const id = params.id as string
	const { query } = useShow<Applicant>({
		resource: RESOURCE_NAME.APPLICANTS,
		id,
	})
	const { result: resultQuery, query: interviewsQuery } = useList({
		resource: RESOURCE_NAME.INTERVIEWS,
		pagination: {
			mode: "off",
		},
		filters: [
			{
				field: "applicant.documentId",
				operator: "eq",
				value: id,
			},
		],
	})
	const { isLoading: interviewsLoading, isRefetching: interviewsRefetching } = interviewsQuery
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
	const interviews = resultQuery.data

	const handleDelete = () => {
		if (!isDeleteDialogOpen) {
			return setIsDeleteDialogOpen(true)
		}

		deleteApplicant(
			{
				resource: RESOURCE_NAME.APPLICANTS,
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
		<DefaultPageLayout title={applicant.fullName}>
			<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<LinkButton href="/applicants" variant="outline" className="pl-1 pr-2 w-full sm:w-auto" disabled={isDeleting}>
					<ChevronLeft />
					Back to List
				</LinkButton>

				<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
					{isDeleting && <MiniLoader />}

					<CanAccess resource={RESOURCE_NAME.APPLICANTS} action={ACCESS_ACTIONS.CREATE}>
						<Button className="w-full sm:w-auto" disabled={isDeleting} onClick={() => setIsInterviewDialogOpen(true)}>
							<CalendarPlus />
							Schedule Interview
						</Button>
					</CanAccess>

					<CanAccess resource={RESOURCE_NAME.APPLICANTS} action={ACCESS_ACTIONS.UPDATE}>
						<LinkButton
							href={`/applicants/edit/${applicant.documentId}`}
							className="w-full sm:w-auto"
							disabled={isDeleting}
						>
							<Pencil />
							Edit Applicant
						</LinkButton>
					</CanAccess>

					<CanAccess resource={RESOURCE_NAME.APPLICANTS} action={ACCESS_ACTIONS.DELETE}>
						<Button variant="destructive" className="w-full sm:w-auto" onClick={handleDelete} disabled={isDeleting}>
							<Trash2 />
							Delete
						</Button>
					</CanAccess>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-primary text-xl">Applicant Details</CardTitle>
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
								<DetailsRow
									label="Created At"
									value={applicant.createdAt ? formatDateTime(applicant.createdAt) : "-"}
								/>
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-primary text-xl">Scheduled Interviews</CardTitle>
					</CardHeader>
					<CardContent>
						{interviewsLoading || interviewsRefetching ? (
							<MiniLoader />
						) : interviews?.length > 0 ? (
							interviews?.map((interview) => (
								<React.Fragment key={interview.documentId}>
									<span className="font-semibold m-2 flex text-muted-foreground">ID: {interview.documentId}</span>
									<Table className="mb-5">
										<TableBody>
											<DetailsRow label="Role" value={interview.role} />
											<DetailsRow label="Interviewer Name" value={interview.interviewerName} />
											<DetailsRow label="Description" value={interview.description} />
											<DetailsRow
												label="Interview Date"
												value={interview.interviewDate ? formatDateTime(interview.interviewDate) : "-"}
											/>
											<DetailsRow
												label="Created At"
												value={interview.createdAt ? formatDateTime(interview.createdAt) : "-"}
											/>
										</TableBody>
									</Table>
								</React.Fragment>
							))
						) : (
							<p className="text-muted-foreground">No interviews scheduled.</p>
						)}
					</CardContent>
				</Card>
			</div>

			<CreateInterviewDialog
				open={isInterviewDialogOpen}
				onOpenChange={setIsInterviewDialogOpen}
				applicantId={applicant.documentId}
			/>

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
