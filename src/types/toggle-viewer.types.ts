export interface ToggleViewerOption {
	label: string
	value: string
}

export type ActionType = 'VIEW' | 'CREATE' | 'UPDATE' | 'DELETE'
export interface AccessRolesState {
	roleCode: RoleType
	roleAccess: ActionType[],
}

export type RoleType = 'ADMIN' | 'INTERVIEWER' | 'APPLICANT'

export interface ToggleViewerStore {
	accessRoles: AccessRolesState[]
	currentViewer: RoleType
	setAccessRoles: (roles: AccessRolesState[]) => void
	setCurrentViewer: (value: RoleType) => void
}