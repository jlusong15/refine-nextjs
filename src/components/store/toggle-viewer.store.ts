import { ToggleViewerStore } from "@/types/access-control.types"
import { create } from "zustand"

export const useToggleViewerStore = create<ToggleViewerStore>((set) => ({
	accessRoles: [],
	currentViewer: "ADMIN",
	setAccessRoles: (accessRoles) => set({ accessRoles }),
	setCurrentViewer: (currentViewer) => set({ currentViewer }),
}))