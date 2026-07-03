import { useToggleViewerStore } from "@/components/store/toggle-viewer.store"
import { ActionType } from "@/types/access-control.types"
import { AccessControlProvider } from "@refinedev/core"

export const accessControlProvider: AccessControlProvider = {
	can: async ({ action }) => {
		const { currentViewer, accessRoles } =
			useToggleViewerStore.getState()
		const role = accessRoles.find(
			(r) => r.roleCode === currentViewer,
		)
		const can =
			role?.roleAccess.includes(action as ActionType) ?? false

		return { can }
	}
}