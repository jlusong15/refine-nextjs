import useAccess from "@/hooks/useAccess"
import { ActionType } from "@/types/access-control.types"
import React from "react"

interface CanProps {
	children: React.ReactNode
	action: ActionType
	fallback?: React.ReactNode | string
}

const Can = ({ children, action, fallback = "" }: CanProps) => {
	const { hasAccess } = useAccess()

	return hasAccess(action) ? children : fallback
}

export default Can
