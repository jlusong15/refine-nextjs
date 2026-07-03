import { ACCESS_ACTIONS, ACCESS_ROLES } from "@/constants/access.constants";

export type ActionType =
	(typeof ACCESS_ACTIONS)[keyof typeof ACCESS_ACTIONS];

export type RoleType =
	(typeof ACCESS_ROLES)[keyof typeof ACCESS_ROLES];

export interface AccessRolesState {
	roleCode: RoleType
	roleAccess: ActionType[],
}
