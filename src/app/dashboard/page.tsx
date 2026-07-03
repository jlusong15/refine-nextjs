"use client"

import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import ErrorPage from "@/components/layout/ErrorPage"
import Loading from "@/components/shared/Loading"
import { PAGE_NAME } from "@/constants/pages.constants"
import { RESOURCE_NAME } from "@/constants/resource.constants"
import { Applicant } from "@/types/applicants.types"
import { Interview } from "@/types/interview.types"
import { useList } from "@refinedev/core"
import ApplicantStatusChart from "./ApplicantStatusChart"
import DashboardStats from "./DashboardStats"
import RecentApplicantsCard from "./RecentApplicantsCard"
import UpcomingInterviewsCard from "./UpcomingInterviewsCard"

export default function DashboardPage() {
	const applicantsQuery = useList<Applicant>({
		resource: RESOURCE_NAME.APPLICANTS,
		pagination: {
			mode: "off",
		},
		meta: {
        pagination: {
            page: 1,
            pageSize: -1,
        },
    },
	})
	const interviewsQuery = useList<Interview>({
		resource: RESOURCE_NAME.INTERVIEWS,
		pagination: {
			mode: "off",
		},
		meta: {
        pagination: {
            page: 1,
            pageSize: -1,
        },
    },
	})

	const applicants = applicantsQuery.result?.data ?? []
	const interviews = interviewsQuery.result?.data ?? []
	console.log('applicantsQuery.result?.dat', applicantsQuery.result?.data)
	console.log('applicants', applicants)

	if (applicantsQuery.query.isLoading || interviewsQuery.query.isLoading) {
		return <Loading />
	}
	if (applicantsQuery.query.isError || interviewsQuery.query.isError) {
		;<ErrorPage title={PAGE_NAME.DASHBOARD} />
	}
	return (
		<DefaultPageLayout title="Dashboard">
			<div className="flex flex-col gap-3">
				<div>
					<p className="text-muted-foreground">Welcome back! Here's an overview of your recruitment pipeline.</p>
				</div>

				<div>
					<DashboardStats applicants={applicants} interviews={interviews} />
				</div>

				<div className="grid gap-6 lg:grid-cols-2">
					<ApplicantStatusChart applicants={applicants} />
					<UpcomingInterviewsCard interviews={interviews} />
				</div>

				<div>
					<RecentApplicantsCard applicants={applicants} />
				</div>
			</div>
		</DefaultPageLayout>
	)
}
