"use client"

import { useCan } from "@refinedev/core"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type AccessGuardProps = {
	resource: string
	action: string
	children: React.ReactNode
}

export default function AccessGuard({
	resource,
	action,
	children,
}: AccessGuardProps) {
	const router = useRouter()
	const { data, isLoading } = useCan({
		resource,
		action,
	})

	useEffect(() => {
		if (!isLoading && data && !data.can) {
			router.replace("/403")
		}
	}, [data, isLoading, router])

	if (isLoading) {
		return null // or a loading spinner
	}

	if (!data?.can) {
		return null
	}

	return children
}

// "use client"

// import { useToggleViewerStore } from "@/components/store/toggle-viewer.store"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// type Props = {
// 	permission: string
// 	children: React.ReactNode
// }

// export default function AccessGuard({
// 	permission,
// 	children,
// }: Props) {
// 	const router = useRouter()
// 	const currentViewer = useToggleViewerStore((state) => state.currentViewer)
// 	const accessRoles = useToggleViewerStore((state) => state.accessRoles)
// 	const accessibleAction = accessRoles.find((role) => role.roleCode === currentViewer)?.roleAccess


// 	useEffect(() => {
// 		console.log('currentViewer', currentViewer)
// 		console.log('accessRoles', accessRoles)
// 		console.log('accessibleAction', accessibleAction)
// 		console.log('permission', permission)
// 	}, [permission, router])
// 	// if (!accessRoles.includes(permission)) {
// 	//   router.replace("/403")
// 	// }
// 	// }, [permissions, permission, router])

// 	// if (!permissions.includes(permission)) {
// 	// 	return null
// 	// }

// 	return children
// }