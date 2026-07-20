"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import ErrorPage from "@/components/layout/ErrorPage"
import { DataTable, DataTableColumnKey } from "@/components/shared/DataTable"
import { DataTablePagination } from "@/components/shared/DataTable/DataTablePagination"
import { DataTableSearch } from "@/components/shared/DataTable/DataTableSearch"
import LinkButton from "@/components/shared/LinkButton"
import Loading from "@/components/shared/Loading"
import MiniLoader from "@/components/shared/MiniLoader"
import { Button } from "@/components/ui/button"
import { ACCESS_ACTIONS } from "@/constants/access.constants"
import { PAGE_NAME } from "@/constants/pages.constants"
import { RESOURCE_CONFIG, RESOURCE_NAME } from "@/constants/resource.constants"
import { useDebounce } from "@/hooks/useDebounce"
import { Interview } from "@/types/interview.types"
import { CanAccess, useDelete, useTable } from "@refinedev/core"
import { Eye, Pencil, Trash2 } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { interviewTableColumns } from "./columns"
import { formatDateTime } from "@/lib/format"

const DeleteConfirmationDialog = dynamic(() => import("@/components/shared/DeleteConfirmationDialog"))

export default function InterviewsPage() {
	const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null)
	const {
		mutate: deleteInterview,
		mutation: { isPending: isDeleting },
	} = useDelete()
	const [search, setSearch] = useState("")
	const debouncedSearch = useDebounce(search, 500)
	const {
		result,
		currentPage,
		pageCount,
		pageSize,
		setCurrentPage,
		setPageSize,
		setSorters,
		setFilters,
		tableQuery: { isLoading, isFetching, isRefetching, error },
	} = useTable<Interview>({
		resource: RESOURCE_NAME.INTERVIEWS,
		queryOptions: {
			staleTime: RESOURCE_CONFIG.defaultStaleTime,
		},
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
		meta: {
			populate: "*",
		},
	})
	const interviews = useMemo(() => {
		const data = result?.data ?? []
		return data.map((item) => ({
			...item,
			interviewDate: item?.interviewDate ? formatDateTime(item.interviewDate) : "",
		}))
	}, [result?.data])

	useEffect(() => {
		setFilters(
			debouncedSearch
				? [
						{
							field: "role",
							operator: "contains",
							value: debouncedSearch,
						},
					]
				: [],
			"replace",
		)
		setCurrentPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearch])

	if (isLoading) return <Loading />
	if (error) return <ErrorPage title={PAGE_NAME.INTERVIEWS} />

	const handleSort = (field: DataTableColumnKey<Interview>) => {
		const sortField = Array.isArray(field) ? field.join(".") : field
		setSorters([
			{
				field: sortField,
				order: "asc",
			},
		])
		setCurrentPage(1)
	}

	const handleDelete = () => {
		if (!selectedInterview) return

		deleteInterview(
			{
				resource: RESOURCE_NAME.INTERVIEWS,
				id: selectedInterview.documentId,
				invalidates: ["list"],
			},
			{
				onSuccess: () => {
					toast.success("Interview deleted successfully.")
					setSelectedInterview(null)
				},
				onError: () => {
					toast.error("Failed to delete interview.")
					setSelectedInterview(null)
				},
			},
		)
	}

	const handlePageSizeChange = (size: number) => {
		setPageSize(size)
		setCurrentPage(1)
	}

	// @@TODO
	const actions = (interview: Interview) => (
		<div className="flex justify-end gap-2">
			<CanAccess resource={RESOURCE_NAME.INTERVIEWS} action={ACCESS_ACTIONS.VIEW}>
				<LinkButton href={`/interviews/${interview.documentId}`} variant="ghost" size="icon">
					<Eye className="h-4 w-4" />
				</LinkButton>
			</CanAccess>
			<CanAccess resource={RESOURCE_NAME.INTERVIEWS} action={ACCESS_ACTIONS.UPDATE}>
				<LinkButton href={`/interviews/edit/${interview.documentId}`} variant="ghost" size="icon">
					<Pencil className="h-4 w-4" />
				</LinkButton>
			</CanAccess>
			<CanAccess resource={RESOURCE_NAME.INTERVIEWS} action={ACCESS_ACTIONS.DELETE}>
				<Button variant="ghost" size="icon" title="Delete" onClick={() => setSelectedInterview(interview)}>
					<Trash2 className="h-4 w-4 text-destructive" />
				</Button>
			</CanAccess>
		</div>
	)

	return (
		<DefaultPageLayout title={PAGE_NAME.INTERVIEWS}>
			<div className="space-y-4">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex w-full items-center gap-2 sm:w-auto">
						{(isFetching || isRefetching) && <MiniLoader />}

						<DataTableSearch
							className="w-full sm:w-80"
							value={search}
							onChange={setSearch}
							placeholder="Search role..."
							disabled={isFetching || isRefetching}
						/>
					</div>
				</div>

				<DataTable
					data={interviews}
					columns={interviewTableColumns}
					isLoading={isFetching || isRefetching}
					onSort={handleSort}
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
					open={!!selectedInterview}
					onOpenChange={(open) => {
						if (!open) setSelectedInterview(null)
					}}
					onConfirm={handleDelete}
					isLoading={isDeleting}
					title="Delete Interview?"
					description={
						<>
							Are you sure you want to delete <strong>{selectedInterview?.role}</strong>?
							<br />
							This action cannot be undone.
						</>
					}
				/>
			</div>
		</DefaultPageLayout>
	)
}
