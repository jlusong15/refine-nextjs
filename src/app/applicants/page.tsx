"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import ErrorPage from "@/components/layout/ErrorPage"
import { DataTable } from "@/components/shared/DataTable"
import { DataTablePagination } from "@/components/shared/DataTable/DataTablePagination"
import { DataTableSearch } from "@/components/shared/DataTable/DataTableSearch"
import LinkButton from "@/components/shared/LinkButton"
import Loading from "@/components/shared/Loading"
import MiniLoader from "@/components/shared/MiniLoader"
import { Button } from "@/components/ui/button"
import { Applicant } from "@/types/applicants.types"
import { useDelete, useTable } from "@refinedev/core"
import { Eye, Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { applicantTableColumns } from "./columns"

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog"
import { useToggleViewerStore } from "@/components/store/toggle-viewer.store"
import useAccess from "@/hooks/useAccess"
import CanAccess from "@/components/shared/CanAccess"

export default function ApplicantsPage() {
	const pageName = "Applicants"
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
		resource: "applicants",

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
	/** Testing */
	const currentViewer = useToggleViewerStore((state) => state.currentViewer)
	const accessRoles = useToggleViewerStore((state) => state.accessRoles)
	console.log(currentViewer, accessRoles)

	const { hasAccess } = useAccess()

	console.log("@@@ CREATE", hasAccess("CREATE"))
	console.log("@@@ VIEW", hasAccess("VIEW"))
	console.log("@@@ UPDATE", hasAccess("UPDATE"))
	console.log("@@@ DELETE", hasAccess("DELETE"))

	if (isLoading) return <Loading />
	if (error) return <ErrorPage title={pageName} />

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
			<CanAccess action="VIEW">
				<LinkButton href={`/applicants/${applicant.documentId}`} variant="ghost" size="icon">
					<Eye className="h-4 w-4" />
				</LinkButton>
			</CanAccess>
			<CanAccess action="UPDATE">
				<LinkButton href={`/applicants/edit/${applicant.documentId}`} variant="ghost" size="icon">
					<Pencil className="h-4 w-4" />
				</LinkButton>
			</CanAccess>
			<CanAccess action="DELETE">
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
				resource: "applicants",
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
		<DefaultPageLayout title={pageName}>
			<div className="space-y-4">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<CanAccess action="CREATE">
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
