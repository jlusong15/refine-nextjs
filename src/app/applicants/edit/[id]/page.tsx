"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import ErrorPage from "@/components/layout/ErrorPage"
import Loading from "@/components/shared/Loading"
import { RESOURCE_NAME } from "@/constants/resource.constants"
import { Applicant } from "@/types/applicants.types"
import { useShow, useUpdate } from "@refinedev/core"
import { useParams, useRouter } from "next/navigation"
import { EditApplicantForm } from "./EditApplicantForm"

export default function ApplicantEditPage() {
	const { id } = useParams<{ id: string }>()
	const router = useRouter()
	const { query } = useShow<Applicant>({
		resource: RESOURCE_NAME.APPLICANTS,
		id,
	})

	const {
		mutate,
		mutation: { isPending },
	} = useUpdate()

	if (query.isLoading) return <Loading />

	if (!query.data?.data) {
		return <ErrorPage title="Applicant not found" />
	}

	const applicant = query.data.data

	return (
		<DefaultPageLayout title="Edit Applicant">
			<EditApplicantForm
				isLoading={isPending}
				cancelAction={() => router.push(`/applicants/${applicant?.documentId}`)}
				defaultValues={{
					fullName: applicant.fullName,
					email: applicant.email,
					phone: applicant.phone,
					appliedRole: applicant.appliedRole,
					applicationStatus: applicant.applicationStatus,
					yearsOfExperience: applicant.yearsOfExperience ?? 0,
					expectedSalary: applicant.expectedSalary ?? 0,
					availableStartDate: applicant.availableStartDate ? new Date(applicant.availableStartDate) : undefined,
					skills: applicant.skills ?? [],
					notes: applicant.notes ?? "",
				}}
				onSubmit={(values) =>
					mutate(
						{
							resource: RESOURCE_NAME.APPLICANTS,
							id,
							values: {
								...values,
								availableStartDate: values.availableStartDate?.toISOString(),
							},
							invalidates: ["detail", "list"],
						},
						{
							onSuccess: () => router.push(`/applicants/${id}`),
						},
					)
				}
			/>
		</DefaultPageLayout>
	)
}
