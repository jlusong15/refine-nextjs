export type ToggleViewerOption = {
	label: string
	value: string
}

export type ToggleViewerStore = {
	options: ToggleViewerOption[]
	selectedValue: string
	setOptions: (options: ToggleViewerOption[]) => void
	setSelectedValue: (value: string) => void
}