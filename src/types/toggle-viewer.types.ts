import { AccessRolesState, RoleType } from "./access-control.types"

export interface ToggleViewerOption {
	label: string
	value: string
}
export interface ToggleViewerStore {
	accessRoles: AccessRolesState[]
	currentViewer: RoleType
	setAccessRoles: (roles: AccessRolesState[]) => void
	setCurrentViewer: (value: RoleType) => void
}