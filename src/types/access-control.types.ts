import { ACCESS_ACTIONS, ACCESS_ROLES } from "@/constants/access.constants";

export type ActionType =
	(typeof ACCESS_ACTIONS)[keyof typeof ACCESS_ACTIONS];

export type RoleType =
	(typeof ACCESS_ROLES)[keyof typeof ACCESS_ROLES];

export interface AccessRolesState {
	roleCode: RoleType
	roleAccess: ActionType[],
}

export interface ToggleViewerStore {
	accessRoles: AccessRolesState[]
	currentViewer: RoleType
	setAccessRoles: (roles: AccessRolesState[]) => void
	setCurrentViewer: (value: RoleType) => void
}
