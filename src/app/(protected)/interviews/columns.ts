import { DataTableColumn } from "@/components/shared/DataTable"
import { Interview } from "@/types/interview.types"

export const interviewTableColumns: DataTableColumn<Interview>[] = [
	{
		key: "id",
		sortKey: "id",
		title: "ID",
		sortable: true,
	},
	{
		key: "role",
		sortKey: "role",
		title: "Role",
		sortable: true,
	},
	{
		key: "interviewDate",
		sortKey: "interviewDate",
		title: "Interview Date",
		sortable: true,
	},
	{
		key: "interviewerName",
		sortKey: "interviewerName",
		title: "Interviewer Name",
		sortable: true,
	},
	{
		key: ["applicant", "fullName"],
		sortKey: "applicant",
		title: "Applicant",
		sortable: false, // @@TODO
	},
	{
		key: "description",
		title: "Description",
		sortable: true,
	},
]
