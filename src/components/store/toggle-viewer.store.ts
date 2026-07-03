import { ToggleViewerStore } from "@/types/toggle-viewer.types"
import { create } from "zustand"

export const useToggleViewerStore = create<ToggleViewerStore>((set) => ({
	options: [],
	selectedValue: "ADMIN",
	setOptions: (options) => set({ options }),
	setSelectedValue: (selectedValue) => set({ selectedValue }),
}))