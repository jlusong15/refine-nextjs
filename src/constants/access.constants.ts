import { ActionType } from "@/types/access-control.types"

export const ACCESS_ROLES = {
	ADMIN: "ADMIN",
	RECRUITER: "RECRUITER",
	INTERVIEWER: "INTERVIEWER",
} as const

export const ACCESS_ACTIONS = {
	VIEW: "VIEW",
	CREATE: "CREATE",
	UPDATE: "UPDATE",
	DELETE: "DELETE",
} as const

export const ACCESS_ACTION_VALUES = Object.values(ACCESS_ACTIONS) as ActionType[]