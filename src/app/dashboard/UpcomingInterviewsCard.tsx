"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/format"
import { Interview } from "@/types/interview.types"
import { useMemo } from "react"

type UpcomingInterviewsCardProps = {
	interviews: Interview[]
}

export default function UpcomingInterviewsCard({ interviews }: UpcomingInterviewsCardProps) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const today = new Date()
	const interviewList = useMemo(() => {
		return [...(interviews ?? [])]
			.filter((interview) => new Date(interview.interviewDate).getTime() >= today.getTime())
			.sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime())
			.slice(0, 5)
	}, [interviews, today])

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Upcoming Interviews</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Role</TableHead>
							<TableHead>Interviewer</TableHead>
							<TableHead className="text-right">Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{interviewList?.length === 0 ? (
							<TableRow>
								<TableCell colSpan={3} className="text-center text-muted-foreground">
									No upcoming interviews.
								</TableCell>
							</TableRow>
						) : (
							interviewList?.map((interview) => (
								<TableRow key={interview.documentId}>
									<TableCell className="font-medium">{interview.role}</TableCell>
									<TableCell>{interview.interviewerName}</TableCell>
									<TableCell className="text-right text-muted-foreground">
										{formatDate(interview.interviewDate)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
