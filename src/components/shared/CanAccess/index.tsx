import useAccess from "@/hooks/useAccess"
import { ActionType } from "@/types/access-control.types"
import React from "react"

interface CanAccessProps {
	children: React.ReactNode
	action: ActionType
	fallback?: React.ReactNode | string
}

const CanAccess = ({ children, action, fallback = "" }: CanAccessProps) => {
	const { hasAccess } = useAccess()

	return hasAccess(action) ? children : fallback
}

export default CanAccess
