import Link, { type LinkProps } from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type Props = {
	href: LinkProps["href"]
	children: React.ReactNode
	className?: string
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
	size?: "default" | "sm" | "lg" | "icon"
}

export default function LinkButton({
	href,
	children,
	className,
	variant = "default",
	size = "default",
	...props
}: Props & Omit<LinkProps, "href">) {
	if (!href) return null

	return (
		<Link
			{...props}
			href={href}
			className={cn(
				buttonVariants({ variant, size }),
				className,
			)}
		>
			{children}
		</Link>
	)
}