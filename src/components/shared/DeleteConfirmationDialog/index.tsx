"use client"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type DeleteConfirmationDialogProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => void
	isLoading?: boolean

	title?: string
	description?: React.ReactNode

	confirmText?: string
	cancelText?: string
}

export default function DeleteConfirmationDialog({
	open,
	onOpenChange,
	onConfirm,
	isLoading = false,

	title = "Delete Item?",
	description = (
		<>
			Are you sure you want to delete this item?
			<br />
			This action cannot be undone.
		</>
	),

	confirmText = "Delete",
	cancelText = "Cancel",
}: DeleteConfirmationDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>

					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>

					<AlertDialogAction
						onClick={onConfirm}
						disabled={isLoading}
						className="bg-destructive hover:bg-destructive/90"
					>
						{isLoading ? "Deleting..." : confirmText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
