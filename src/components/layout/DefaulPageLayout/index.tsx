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
			<div>{children}</div>
		</div>
	)
}
