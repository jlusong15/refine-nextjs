"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import { APPLICANT_STATUS } from "@/types/applicants.types"
import { useCreate } from "@refinedev/core"
import { useRouter } from "next/navigation"
import { CreateApplicantForm } from "./CreateApplicantForm"

export default function ApplicantCreatePage() {
	const router = useRouter()
	const {
		mutate,
		mutation: { isPending },
	} = useCreate()

	return (
		<DefaultPageLayout title="Create Applicant">
			<CreateApplicantForm
				isLoading={isPending}
				cancelAction={() => router.push("/applicants")}
				defaultValues={{
					fullName: "",
					email: "",
					phone: "",
					appliedRole: "",
					applicationStatus: APPLICANT_STATUS.NEW,
					yearsOfExperience: undefined,
					expectedSalary: undefined,
					availableStartDate: undefined,
					skills: [],
					notes: "",
				}}
				onSubmit={(values) =>
					mutate(
						{
							resource: "applicants",
							values: {
								...values,
								availableStartDate: values.availableStartDate?.toISOString(),
							},
							invalidates: ["detail"],
						},
						{
							onSuccess: () => router.push(`/applicants`),
						},
					)
				}
			/>
		</DefaultPageLayout>
	)
}
