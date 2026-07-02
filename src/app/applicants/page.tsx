"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import { DataTable } from "@/components/shared/DataTable"
import { DataTablePagination } from "@/components/shared/DataTable/DataTablePagination"
import { DataTableSearch } from "@/components/shared/DataTable/DataTableSearch"
import Loading from "@/components/shared/Loading"
import { Applicant } from "@/types/applicants.types"
import { useTable } from "@refinedev/core"
import { useState } from "react"
import { applicantTableColumns } from "./columns"
import ErrorPage from "@/components/layout/ErrorPage"
import MiniLoader from "@/components/shared/MiniLoader"
import { Button } from "@/components/ui/button"
import { Eye, Link, Pencil, Trash2 } from "lucide-react"
import LinkButton from "@/components/shared/LinkButton"

export default function ApplicantsPage() {
	const pageName = "Applicants"
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
		tableQuery: { isLoading, isFetching, error },
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

	// @@TODO: Implement delete functionality
	const actions = (applicant: Applicant) => (
		<div className="flex justify-end gap-2">
			<LinkButton href={`/applicants/${applicant.documentId}`} variant="ghost" size="icon">
				<Eye className="h-4 w-4" />
			</LinkButton>
			<LinkButton href={`/applicants/${applicant.documentId}/edit`} variant="ghost" size="icon">
				<Pencil className="h-4 w-4" />
			</LinkButton>
			<Button variant="ghost" size="icon" title="Delete">
				<Trash2 className="h-4 w-4 text-destructive" />
			</Button>
		</div>
	)

	return (
		<DefaultPageLayout title={pageName}>
			<div className="space-y-4">
				<div className="relative w-full justify-end flex items-center">
					<div className="flex items-center gap-2">
						{isFetching && <MiniLoader />}
						<DataTableSearch
							value={search}
							onChange={handleSearch}
							placeholder="Search applicant name..."
							disabled={isFetching}
						/>
					</div>
				</div>

				<DataTable
					data={result.data}
					columns={applicantTableColumns}
					isLoading={isFetching}
					onSort={handleSort}
					actions={actions}
				/>

				<DataTablePagination
					currentPage={currentPage}
					pageCount={pageCount}
					pageSize={pageSize}
					isLoading={isFetching}
					setCurrentPage={setCurrentPage}
					setPageSize={setPageSize}
				/>
			</div>
		</DefaultPageLayout>
	)
}
