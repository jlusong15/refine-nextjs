"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { APPLICANT_STATUS } from "@/constants/applicant.constants"
import { Applicant, ApplicantStatus } from "@/types/applicants.types"
import { Interview } from "@/types/interview.types"
import { BriefcaseBusiness, CalendarClock, UserCheck, Users } from "lucide-react"

type DashboardStatsProps = {
	applicants: Applicant[]
	interviews: Interview[]
}

export default function DashboardStats({ applicants, interviews }: DashboardStatsProps) {
	const today = new Date()
	const upcomingInterviews = interviews?.filter((interview) => new Date(interview?.interviewDate) >= today)
	const hiredApplicants = applicants?.filter((applicant) => applicant.applicationStatus === APPLICANT_STATUS.HIRED)
	const inactiveStatuses: ApplicantStatus[] = [
		APPLICANT_STATUS.HIRED,
		APPLICANT_STATUS.REJECTED,
		APPLICANT_STATUS.WITHDRAWN,
	]
	const activeApplicants = applicants?.filter((applicant) => !inactiveStatuses.includes(applicant.applicationStatus))
	const stats = [
		{
			title: "Total Applicants",
			value: applicants?.length,
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
