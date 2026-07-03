"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import ErrorPage from "@/components/layout/ErrorPage"
import { DataTable } from "@/components/shared/DataTable"
import { DataTablePagination } from "@/components/shared/DataTable/DataTablePagination"
import { DataTableSearch } from "@/components/shared/DataTable/DataTableSearch"
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog"
import LinkButton from "@/components/shared/LinkButton"
import Loading from "@/components/shared/Loading"
import MiniLoader from "@/components/shared/MiniLoader"
import { Button } from "@/components/ui/button"
import { ACCESS_ACTIONS } from "@/constants/access.constants"
import { PAGE_NAME } from "@/constants/pages.constants"
import { RESOURCE_NAME } from "@/constants/resource.constants"
import { Applicant } from "@/types/applicants.types"
import { CanAccess, useDelete, useTable } from "@refinedev/core"
import { Eye, Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { applicantTableColumns } from "./columns"

export default function ApplicantsPage() {
	const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
	const {
		mutate: deleteApplicant,
		mutation: { isPending: isDeleting },
	} = useDelete()
	const [search, setSearch] = useState("")
	const {
		result,
		currentPage,
		setCurrentPage,
		pageCount,
		pageSize,
		setPageSize,
		setSorters,
		setFilters,
		tableQuery: { isLoading, isFetching, isRefetching, error },
	} = useTable<Applicant>({
		resource: RESOURCE_NAME.APPLICANTS,

		pagination: {
			currentPage: 1,
			pageSize: 10,
		},

		sorters: {
			initial: [
				{
					field: "id",
					order: "desc",
				},
			],
		},
	})

	if (isLoading) return <Loading />
	if (error) return <ErrorPage title={PAGE_NAME.APPLICANTS} />

	const handleSearch = (value: string) => {
		setSearch(value)
		setFilters(
			value
				? [
						{
							field: "fullName",
							operator: "contains",
							value,
						},
					]
				: [],
			"replace",
		)
	}

	const handleSort = (field: keyof Applicant) => {
		setSorters([
			{
				field,
				order: "asc",
			},
		])
	}

	const actions = (applicant: Applicant) => (
		<div className="flex justify-end gap-2">
			<CanAccess resource={RESOURCE_NAME.APPLICANTS} action={ACCESS_ACTIONS.VIEW}>
				<LinkButton href={`/applicants/${applicant.documentId}`} variant="ghost" size="icon">
					<Eye className="h-4 w-4" />
				</LinkButton>
			</CanAccess>
			<CanAccess resource={RESOURCE_NAME.APPLICANTS} action={ACCESS_ACTIONS.UPDATE}>
				<LinkButton href={`/applicants/edit/${applicant.documentId}`} variant="ghost" size="icon">
					<Pencil className="h-4 w-4" />
				</LinkButton>
			</CanAccess>
			<CanAccess resource={RESOURCE_NAME.APPLICANTS} action={ACCESS_ACTIONS.DELETE}>
				<Button variant="ghost" size="icon" title="Delete" onClick={() => setSelectedApplicant(applicant)}>
					<Trash2 className="h-4 w-4 text-destructive" />
				</Button>
			</CanAccess>
		</div>
	)

	const handleDelete = () => {
		if (!selectedApplicant) return

		deleteApplicant(
			{
				resource: RESOURCE_NAME.APPLICANTS,
				id: selectedApplicant.documentId,
				invalidates: ["list"],
			},
			{
				onSuccess: () => {
					toast.success("Applicant deleted successfully.")
					setSelectedApplicant(null)
				},
				onError: () => {
					toast.error("Failed to delete applicant.")
					setSelectedApplicant(null)
				},
			},
		)
	}

	const handlePageSizeChange = (size: number) => {
		setPageSize(size)
		setCurrentPage(1)
	}

	return (
		<DefaultPageLayout title={PAGE_NAME.APPLICANTS}>
			<div className="space-y-4">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<CanAccess resource={RESOURCE_NAME.APPLICANTS} action={ACCESS_ACTIONS.CREATE}>
						<LinkButton href="/applicants/create" className="w-full sm:w-auto" disabled={isFetching || isRefetching}>
							<Plus className="h-4 w-4" />
							Create Applicant
						</LinkButton>
					</CanAccess>

					<div className="flex w-full items-center gap-2 sm:w-auto">
						{(isFetching || isRefetching) && <MiniLoader />}

						<DataTableSearch
							className="w-full sm:w-80"
							value={search}
							onChange={handleSearch}
							placeholder="Search applicant name..."
							disabled={isFetching || isRefetching}
						/>
					</div>
				</div>

				<DataTable
					data={result.data}
					columns={applicantTableColumns}
					isLoading={isFetching || isRefetching}
					onSort={handleSort}
					actions={actions}
				/>

				<DataTablePagination
					currentPage={currentPage}
					pageCount={pageCount}
					pageSize={pageSize}
					isLoading={isFetching || isRefetching}
					setCurrentPage={setCurrentPage}
					setPageSize={handlePageSizeChange}
				/>

				<DeleteConfirmationDialog
					open={!!selectedApplicant}
					onOpenChange={(open) => {
						if (!open) setSelectedApplicant(null)
					}}
					onConfirm={handleDelete}
					isLoading={isDeleting}
					title="Delete Applicant?"
					description={
						<>
							Are you sure you want to delete <strong>{selectedApplicant?.fullName}</strong>?
							<br />
							This action cannot be undone.
						</>
					}
				/>
			</div>
		</DefaultPageLayout>
	)
}
