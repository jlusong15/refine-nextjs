import { DataTableColumn } from "@/components/shared/DataTable"
import { Applicant } from "@/types/applicants.types"

export const applicantTableColumns: DataTableColumn<Applicant>[] = [
	{
		key: "id",
		sortKey: "id",
		title: "ID",
		sortable: true,
	},
	{
		key: "fullName",
		sortKey: "fullName",
		title: "Full Name",
		sortable: true,
	},
	{
		key: "email",
		sortKey: "email",
		title: "Email",
		sortable: true,
	},
	{
		key: "phone",
		sortKey: "phone",
		title: "Phone",
		sortable: true,
	},
	{
		key: "appliedRole",
		sortKey: "appliedRole",
		title: "Applied Role",
		sortable: true,
	},
	{
		key: "applicationStatus",
		sortKey: "applicationStatus",
		title: "Status",
		sortable: true,
	},
]
