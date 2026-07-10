import { DataTableColumn } from "@/components/shared/DataTable"
import { Interview } from "@/types/interview.types"

export const interviewTableColumns: DataTableColumn<Interview>[] = [
	{
		key: "id",
		title: "ID",
		sortable: true,
	},
	{
		key: "role",
		title: "Role",
		sortable: true,
	},
	{
		key: "interviewDate",
		title: "Interview Date",
		sortable: true,
	},
	{
		key: "interviewerName",
		title: "Interviewer Name",
		sortable: true,
	},
	{
		key: ["applicant", "fullName"],
		title: "Applicant",
		sortable: true,
	},
	{
		key: "description",
		title: "Description",
		sortable: true,
	},
]
