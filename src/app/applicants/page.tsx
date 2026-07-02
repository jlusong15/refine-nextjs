"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import { DataTable } from "@/components/shared/data-table"
import { DataTablePagination } from "@/components/shared/data-table/DataTablePagination"
import { DataTableSearch } from "@/components/shared/data-table/DataTableSearch"
import Loading from "@/components/shared/Loading"
import { Applicant } from "@/types/applicants.types"
import { useTable } from "@refinedev/core"
import { useState } from "react"
import { applicantTableColumns } from "./columns"
import ErrorPage from "@/components/layout/ErrorPage"

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

	return (
		<DefaultPageLayout title={pageName}>
			<div className="space-y-4">
				<div className="relative w-full justify-end flex items-center">
					<DataTableSearch
						value={search}
						onChange={handleSearch}
						placeholder="Search applicant name..."
						disabled={isFetching}
					/>
				</div>

				<DataTable data={result.data} columns={applicantTableColumns} isLoading={isFetching} onSort={handleSort} />

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
