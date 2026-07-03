"use client"

import { useToggleViewerStore } from "@/components/store/toggle-viewer.store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type Props = {
	permission: string
	children: React.ReactNode
}

export default function AccessGuard({
	permission,
	children,
}: Props) {
	const router = useRouter()
	const currentViewer = useToggleViewerStore((state) => state.currentViewer)
	const accessRoles = useToggleViewerStore((state) => state.accessRoles)
	const accessibleAction = accessRoles.find((role) => role.roleCode === currentViewer)?.roleAccess


	useEffect(() => {
		console.log('currentViewer', currentViewer)
		console.log('accessRoles', accessRoles)
		console.log('accessibleAction', accessibleAction)
		console.log('permission', permission)
	}, [permission, router])
	// if (!accessRoles.includes(permission)) {
	//   router.replace("/403")
	// }
	// }, [permissions, permission, router])

	// if (!permissions.includes(permission)) {
	// 	return null
	// }

	return children
}