"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InterviewFormValues } from "@/schemas/interview.schema"
import { useCreate } from "@refinedev/core"
import { toast } from "sonner"
import { CreateInterviewForm } from "./CreateInterviewForm"
import { RESOURCE_NAME } from "@/constants/resource.constants"

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	applicantId: string
}

export default function CreateInterviewDialog({ open, onOpenChange, applicantId }: Props) {
	const {
		mutate: createInterview,
		mutation: { isPending },
	} = useCreate()

	const handleSubmit = (values: InterviewFormValues) => {
		createInterview(
			{
				resource: RESOURCE_NAME.INTERVIEWS,
				values: {
					...values,
					applicant: applicantId,
				},
				invalidates: ["list"],
			},
			{
				onSuccess: () => {
					toast.success("Interview scheduled successfully.")
					onOpenChange(false)
				},

				onError: () => {
					toast.error("Unable to schedule interview.")
				},
			},
		)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Schedule Interview</DialogTitle>
				</DialogHeader>

				<CreateInterviewForm
					defaultValues={{
						role: "",
						description: "",
						interviewerName: "",
						interviewDate: new Date(),
					}}
					onSubmit={handleSubmit}
					isLoading={isPending}
					cancelAction={() => onOpenChange(false)}
				/>
			</DialogContent>
		</Dialog>
	)
}
