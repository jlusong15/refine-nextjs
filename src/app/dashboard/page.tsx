import DefaultPageLayout from "@/components/layout/DefaulPageLayout"
import DashboardStats from "./DashboardStats"

export default function DashboardPage() {
	return (
		<DefaultPageLayout title="Dashboard">
			<div className="flex flex-col gap-3">
				<div>
					<p className="text-muted-foreground">Welcome back! Here's an overview of your recruitment pipeline.</p>
				</div>

				<div>
					<DashboardStats />
				</div>

				{/* <div className="grid gap-6 lg:grid-cols-2">
					<ApplicantStatusChart />
					<UpcomingInterviewsCard />
				</div>

				<div className="grid gap-6 lg:grid-cols-2">
					<RecentApplicantsCard />
				</div> */}
			</div>
		</DefaultPageLayout>
	)
}
