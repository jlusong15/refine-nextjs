import PageHeader from "../PageHeader"

interface ErrorPageProps {
	title?: string
	message?: string
}

export default function ErrorPage({ title, message }: ErrorPageProps) {
	return (
		<div className="px-5 py-2">
			<PageHeader title={title || "Error"} />
			<div className="mt-4 text-lg text-gray-600 w-full border-t border-t-gray-300 py-5">
				{message || "Error loading page"}
			</div>
		</div>
	)
}
