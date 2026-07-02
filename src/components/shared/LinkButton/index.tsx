import Link, { type LinkProps } from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type Props = {
	href: LinkProps["href"]
	children: React.ReactNode
	className?: string
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
	size?: "default" | "sm" | "lg" | "icon"
	disabled?: boolean
}

export default function LinkButton({
	href,
	children,
	className,
	variant = "default",
	size = "default",
	disabled = false,
	onClick,
	...props
}: Props & Omit<LinkProps, "href">) {
	if (!href) return null

	return (
		<Link
			{...props}
			href={disabled ? "#" : href}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : undefined}
			onClick={(e) => {
				if (disabled) {
					e.preventDefault()
					return
				}
				onClick?.(e)
			}}
			className={cn(buttonVariants({ variant, size }), disabled && "pointer-events-none opacity-50", className)}
		>
			{children}
		</Link>
	)
}
