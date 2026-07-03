"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import ErrorPage from "@/components/layout/ErrorPage"
import Loading from "@/components/shared/Loading"
import { PAGE_NAME } from "@/constants/pages.constants"
import { RESOURCE_NAME } from "@/constants/resource.constants"
import { Applicant } from "@/types/applicants.types"
import { Interview } from "@/types/interview.types"
import { useList } from "@refinedev/core"
import dynamic from "next/dynamic"
import DashboardStats from "./DashboardStats"
import { formatDate } from "@/lib/format"

const ApplicantStatusChart = dynamic(() => import("./ApplicantStatusChart"), {
	loading: () => <Loading />,
})

const UpcomingInterviewsCard = dynamic(() => import("./UpcomingInterviewsCard"), {
	loading: () => <Loading />,
})

const RecentApplicantsCard = dynamic(() => import("./RecentApplicantsCard"), {
	loading: () => <Loading />,
})

export default function DashboardPage() {
	const today = new Date()
	const applicantsQuery = useList<Applicant>({
		resource: RESOURCE_NAME.APPLICANTS,
		pagination: {
			mode: "off",
		},
	})
	const interviewsQuery = useList<Interview>({
		resource: RESOURCE_NAME.INTERVIEWS,
		pagination: {
			mode: "off",
		},
	})

	const applicants = applicantsQuery.result?.data ?? []
	const interviews = interviewsQuery.result?.data ?? []

	if (
		applicantsQuery.query.isLoading ||
		interviewsQuery.query.isLoading ||
		applicantsQuery.query.isRefetching ||
		interviewsQuery.query.isRefetching
	) {
		return <Loading />
	}

	if (
		applicantsQuery.query.isError ||
		interviewsQuery.query.isError ||
		applicantsQuery.query.isRefetchError ||
		interviewsQuery.query.isRefetchError
	) {
		return <ErrorPage title={PAGE_NAME.DASHBOARD} />
	}

	return (
		<DefaultPageLayout title="Dashboard">
			<div className="flex flex-col gap-5">
				<div>
					<p className="text-muted-foreground">Welcome! Today is {formatDate(today)}!</p>
				</div>

				<DashboardStats applicants={applicants} interviews={interviews} />

				<div className="grid gap-6 lg:grid-cols-2">
					<ApplicantStatusChart applicants={applicants} />
					<UpcomingInterviewsCard interviews={interviews} />
				</div>

				<RecentApplicantsCard applicants={applicants} />
			</div>
		</DefaultPageLayout>
	)
}
