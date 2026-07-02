import { format } from "date-fns"

export const formatCurrency = (value: number) =>
	new Intl.NumberFormat("en-PH", {
		style: "currency",
		currency: "PHP",
	}).format(value)

export const formatDateTime = (value: string | Date) =>
	format(new Date(value), "MMM d, yyyy h:mm a")

export const formatDate = (value: string | Date) =>
	format(new Date(value), "MMM d, yyyy")

export const formatTime = (value: string | Date) =>
	format(new Date(value), "h:mm a")