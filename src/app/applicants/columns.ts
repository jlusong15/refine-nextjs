import { DataTableColumn } from "@/components/shared/data-table"
import { Applicant } from "@/types/applicants.types"

export const applicantTableColumns: DataTableColumn<Applicant>[] = [
	{
		key: "id",
		title: "ID",
		sortable: true,
	},
	{
		key: "fullName",
		title: "Full Name",
		sortable: true,
	},
	{
		key: "email",
		title: "Email",
		sortable: true,
	},
	{
		key: "phone",
		title: "Phone",
		sortable: true,
	},
	{
		key: "appliedRole",
		title: "Applied Role",
		sortable: true,
	},
	{
		key: "applicationStatus",
		title: "Status",
		sortable: true,
	},
]
