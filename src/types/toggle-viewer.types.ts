export type ToggleViewerOption = {
	label: string
	value: string
}

export type ToggleViewerStore = {
	accessRoles: ToggleViewerOption[]
	currentViewer: string
	setAccessRoles: (options: ToggleViewerOption[]) => void
	setCurrentViewer: (value: string) => void
}