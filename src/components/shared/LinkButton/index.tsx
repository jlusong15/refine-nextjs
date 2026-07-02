"use client"

import { useRouter } from "next/navigation"
import type { LinkProps } from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
	href: LinkProps["href"]
	children: React.ReactNode
	className?: string
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
	size?: "default" | "sm" | "lg" | "icon"
	disabled?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function LinkButton({
	href,
	children,
	className,
	variant = "default",
	size = "default",
	disabled = false,
	onClick,
}: Props) {
	const router = useRouter()

	return (
		<Button
			type="button"
			variant={variant}
			size={size}
			className={className}
			disabled={disabled}
			onClick={(e) => {
				onClick?.(e)

				if (e.defaultPrevented || disabled) return

				router.push(href.toString())
			}}
		>
			{children}
		</Button>
	)
}
