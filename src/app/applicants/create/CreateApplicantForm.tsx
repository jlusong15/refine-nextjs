"use client"

import { InputMultiComboBox } from "@/components/shared/InputComboBox"
import LinkButton from "@/components/shared/LinkButton"
import MiniLoader from "@/components/shared/MiniLoader"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ApplicantFormValues, applicantSchema } from "@/schemas/applicant.schema"
import { APPLICANT_STATUS } from "@/types/applicants.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"

interface CreateApplicantFormProps {
	defaultValues: ApplicantFormValues
	onSubmit: SubmitHandler<ApplicantFormValues>
	isLoading?: boolean
	cancelAction?: () => void
}

export function CreateApplicantForm({ defaultValues, onSubmit, isLoading, cancelAction }: CreateApplicantFormProps) {
	const form = useForm<ApplicantFormValues>({
		resolver: zodResolver(applicantSchema),
		defaultValues,
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="appliedRole"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Applied Role</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="applicationStatus"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select application status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.values(APPLICANT_STATUS).map((status) => (
										<SelectItem key={status} value={status}>
											{status}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="yearsOfExperience"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Years of Experience</FormLabel>
							<FormControl>
								<Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="expectedSalary"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expected Salary</FormLabel>
							<FormControl>
								<Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="availableStartDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Available Start Date</FormLabel>

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

				<FormField
					control={form.control}
					name="skills"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Skills</FormLabel>
							<InputMultiComboBox
								value={field.value ?? []}
								options={
									field.value?.map((skill) => ({
										value: skill,
										label: skill,
									})) ?? []
								}
								onChange={field.onChange}
								placeholder="Add skills..."
							/>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="notes"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2 items-center">
					{cancelAction && (
						<LinkButton disabled={isLoading} href="/applicants" variant="outline" onClick={cancelAction}>
							Cancel
						</LinkButton>
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
