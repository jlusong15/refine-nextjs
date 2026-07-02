"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import { useUpdate } from "@refinedev/core"
import { id } from "date-fns/locale/id"
import { useRouter } from "next/navigation"
import { CreateApplicantForm } from "./CreateApplicantForm"

export default function ApplicantCreatePage() {
	const router = useRouter()
	const {
		mutate,
		mutation: { isPending },
	} = useUpdate()

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
					applicationStatus: "",
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
							onSuccess: () => router.push(`/applicants/${id}`),
						},
					)
				}
			/>
		</DefaultPageLayout>
	)
}
