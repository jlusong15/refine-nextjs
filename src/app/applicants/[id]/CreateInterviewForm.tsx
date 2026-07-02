"use client"

import MiniLoader from "@/components/shared/MiniLoader"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { InterviewFormValues, interviewSchema } from "@/schemas/interview.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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
						<FormItem className="flex flex-col">
							<FormLabel>Interview Date</FormLabel>

							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											type="button"
											variant="outline"
											className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />

											{field.value ? format(field.value, "PPP") : "Pick a date"}
										</Button>
									</FormControl>
								</PopoverTrigger>

								<PopoverContent className="w-auto p-0" align="start">
									<Calendar mode="single" selected={field.value} defaultMonth={field.value} onSelect={field.onChange} />
								</PopoverContent>
							</Popover>

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
