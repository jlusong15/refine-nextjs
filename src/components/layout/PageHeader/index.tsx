interface PageHeaderProps {
	title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
	return <h1 className="my-3 text-4xl font-semibold text-primary">{title}</h1>
}
