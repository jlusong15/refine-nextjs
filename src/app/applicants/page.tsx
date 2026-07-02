"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import Loading from "@/components/shared/Loading"
import { Applicant } from "@/types/applicants.types"
import { useTable } from "@refinedev/core"

export default function ApplicantsPage() {
	const {
		result,
		tableQuery: { isLoading, error },
	} = useTable<Applicant>({
		resource: "applicants",
	})

	if (isLoading) {
		return <Loading />
	}

	if (error) {
		return <h3>Error fetching data</h3>
	}

	return (
		<DefaultPageLayout title="Applicants">
			<div>
				{!isLoading && !error && (
					<table className="w-full border-collapse border">
						<thead>
							<tr className="bg-gray-100">
								<th className="border px-4 py-2 text-left">ID</th>
								<th className="border px-4 py-2 text-left">Full Name</th>
								<th className="border px-4 py-2 text-left">E-mail</th>
								<th className="border px-4 py-2 text-left">Phone</th>
								<th className="border px-4 py-2 text-left">Applied Role</th>
								<th className="border px-4 py-2 text-left">Status</th>
							</tr>
						</thead>

						<tbody>
							{result.data.map((category) => (
								<tr key={category.id}>
									<td className="border px-4 py-2">{category.id}</td>
									<td className="border px-4 py-2">{category.fullName}</td>
									<td className="border px-4 py-2">{category.email}</td>
									<td className="border px-4 py-2">{category.phone}</td>
									<td className="border px-4 py-2">{category.appliedRole}</td>
									<td className="border px-4 py-2">{category.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</DefaultPageLayout>
	)
}
