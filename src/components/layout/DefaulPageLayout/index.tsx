import { ReactNode } from "react"
import PageHeader from "../PageHeader"

interface DefaultPageLayoutProps {
	title: string
	children: ReactNode
}

export default function DefaultPageLayout({ title, children }: DefaultPageLayoutProps) {
	return (
		<div className="px-5 py-2">
			<PageHeader title={title} />
			<div className="mt-4 text-lg text-gray-600 w-full border-t border-t-gray-300 py-5">{children}</div>
		</div>
	)
}
