import { ACCESS_ACTIONS } from "@/constants/access.constants"
import { RESOURCE_NAME } from "@/constants/resource.constants"
import AccessGuard from "@/guards/access.guard"

export default function CreateApplicationLayout({ children }: { children: React.ReactNode }) {
	return (
		<AccessGuard resource={RESOURCE_NAME.APPLICANTS} action={ACCESS_ACTIONS.CREATE}>
			{children}
		</AccessGuard>
	)
}
