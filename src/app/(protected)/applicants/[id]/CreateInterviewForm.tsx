"use client"

import DateTimePicker from "@/components/shared/DateTimePicker"
import MiniLoader from "@/components/shared/MiniLoader"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InterviewFormValues, interviewSchema } from "@/schemas/interview.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

interface CreateInterviewFormProps {
	defaultValues: InterviewFormValues
	onSubmit: SubmitHandler<InterviewFormValues>
	isLoading?: boolean
	cancelAction?: () => void
}

export function CreateInterviewForm({ defaultValues, onSubmit, isLoading, cancelAction }: CreateInterviewFormProps) {
	const form = useForm<InterviewFormValues>({
		resolver: zodResolver(interviewSchema),
		defaultValues,
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="interviewerName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Interviewer Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="interviewDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Interview Date</FormLabel>
							<FormControl>
								<DateTimePicker value={field.value} onChange={field.onChange} disabled={isLoading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2 items-center">
					{cancelAction && (
						<Button type="button" disabled={isLoading} variant="outline" onClick={cancelAction}>
							Cancel
						</Button>
					)}
					<Button type="submit" disabled={isLoading}>
						Save Changes
					</Button>
					{isLoading && <MiniLoader />}
				</div>
			</form>
		</Form>
	)
}
