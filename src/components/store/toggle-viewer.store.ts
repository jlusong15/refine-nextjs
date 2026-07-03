import { ACCESS_ROLES } from "@/constants/access.constants"
import { ToggleViewerStore } from "@/types/toggle-viewer.types"
import { create } from "zustand"

export const useToggleViewerStore = create<ToggleViewerStore>((set) => ({
	accessRoles: [],
	currentViewer: ACCESS_ROLES.ADMIN,
	setAccessRoles: (accessRoles) => set({ accessRoles }),
	setCurrentViewer: (currentViewer) => set({ currentViewer }),
}))