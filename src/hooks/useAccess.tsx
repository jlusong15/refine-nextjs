import { useToggleViewerStore } from "@/components/store/toggle-viewer.store"
import { ActionType } from "@/types/access-control.types"

const useAccess = () => {
	const currentViewer = useToggleViewerStore((state) => state.currentViewer)
	const accessRoles = useToggleViewerStore((state) => state.accessRoles)
	const accessibleAction = accessRoles.find((role) => role.roleCode === currentViewer)?.roleAccess

	const hasAccess = (action: ActionType) => {
		return accessibleAction?.includes(action)
	}

	return {
		hasAccess,
	}
}

export default useAccess
