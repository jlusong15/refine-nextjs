"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { APPLICANT_STATUS } from "@/constants/applicant.constants"
import { RESOURCE_NAME } from "@/constants/resource.constants"
import { useList } from "@refinedev/core"
import { BriefcaseBusiness, CalendarClock, UserCheck, Users } from "lucide-react"

export default function DashboardStats() {
	const { result: applicants } = useList({
		resource: RESOURCE_NAME.APPLICANTS,
		pagination: {
			mode: "off",
		},
	})
	const { result: interviews } = useList({
		resource: RESOURCE_NAME.INTERVIEWS,
		pagination: {
			mode: "off",
		},
	})
	const applicantList = applicants?.data ?? []
	const interviewList = interviews?.data ?? []
	const today = new Date()
	const upcomingInterviews = interviewList.filter((interview) => new Date(interview.interviewDate) >= today)
	const hiredApplicants = applicantList.filter((applicant) => applicant.applicantStatus === APPLICANT_STATUS.HIRED)
	const activeApplicants = applicantList.filter(
		(applicant) =>
			![APPLICANT_STATUS.HIRED, APPLICANT_STATUS.REJECTED, APPLICANT_STATUS.WITHDRAWN].includes(
				applicant.applicantStatus,
			),
	)
	const stats = [
		{
			title: "Total Applicants",
			value: applicantList.length,
			icon: Users,
		},
		{
			title: "Upcoming Interviews",
			value: upcomingInterviews.length,
			icon: CalendarClock,
		},
		{
			title: "Hired",
			value: hiredApplicants.length,
			icon: UserCheck,
		},
		{
			title: "Active Applications",
			value: activeApplicants.length,
			icon: BriefcaseBusiness,
		},
	]

	return (
		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			{stats.map((stat) => {
				const Icon = stat.icon

				return (
					<Card key={stat.title}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>

							<Icon className="h-5 w-5 text-muted-foreground" />
						</CardHeader>

						<CardContent>
							<div className="text-3xl font-bold">{stat.value}</div>
						</CardContent>
					</Card>
				)
			})}
		</div>
	)
}
