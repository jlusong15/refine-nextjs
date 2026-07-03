"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { APPLICANT_STATUS, INACTIVE_STATUSES } from "@/constants/applicant.constants"
import { Applicant } from "@/types/applicants.types"
import { Interview } from "@/types/interview.types"
import { BriefcaseBusiness, CalendarClock, UserCheck, Users } from "lucide-react"
import { useMemo } from "react"

type DashboardStatsProps = {
	applicants: Applicant[]
	interviews: Interview[]
}

export default function DashboardStats({ applicants, interviews }: DashboardStatsProps) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const today = new Date()
	const upcomingInterviews = useMemo(() => {
		return interviews?.filter((interview) => new Date(interview?.interviewDate) >= today) ?? []
	}, [interviews, today])
	const hiredApplicants = useMemo(() => {
		return applicants?.filter((applicant) => applicant?.applicationStatus === APPLICANT_STATUS.HIRED) ?? []
	}, [applicants])

	const activeApplicants = useMemo(() => {
		return applicants?.filter((applicant) => !INACTIVE_STATUSES.includes(applicant?.applicationStatus)) ?? []
	}, [applicants])
	const stats = [
		{
			title: "Total Applicants",
			value: applicants?.length ?? 0,
			icon: Users,
		},
		{
			title: "Upcoming Interviews",
			value: upcomingInterviews?.length ?? 0,
			icon: CalendarClock,
		},
		{
			title: "Hired",
			value: hiredApplicants?.length ?? 0,
			icon: UserCheck,
		},
		{
			title: "Active Applications",
			value: activeApplicants?.length ?? 0,
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
