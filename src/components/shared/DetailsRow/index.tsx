import { TableRow, TableCell } from "@/components/ui/table"

export default function DetailsRow({ label, value }: { label: string; value: React.ReactNode }) {
	return (
		<TableRow>
			<TableCell className="w-52 font-medium">{label}</TableCell>
			<TableCell>{value ?? "-"}</TableCell>
		</TableRow>
	)
}
