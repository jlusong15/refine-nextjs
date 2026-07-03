"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { APPLICANT_STATUS } from "@/constants/applicant.constants"
import { Applicant } from "@/types/applicants.types"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type ApplicantStatusChartProps = {
	applicants: Applicant[]
}

export default function ApplicantStatusChart({ applicants }: ApplicantStatusChartProps) {
	const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()
	const statusOrder = Object.values(APPLICANT_STATUS)
	const chartData = statusOrder.map((status) => ({
		status,
		total: applicants.filter((applicant) => applicant.applicationStatus === status).length,
	}))
	console.log("primaryColor", primaryColor)
	return (
		<Card>
			<CardHeader>
				<CardTitle>Applicants per Status</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-87.5">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={chartData}
							margin={{
								top: 10,
								right: 10,
								left: 0,
								bottom: 50,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="status" angle={-25} textAnchor="end" interval={0} height={70} fontSize={12} />
							<YAxis allowDecimals={false} />
							<Tooltip />
							<Bar dataKey="total" radius={[6, 6, 0, 0]} fill={primaryColor} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
