"use client"

import DatePicker from "@/components/shared/DatePicker"
import { InputMultiComboBox } from "@/components/shared/InputComboBox"
import { InputNumber } from "@/components/shared/InputNumber"
import MiniLoader from "@/components/shared/MiniLoader"
import { SelectField } from "@/components/shared/SelectField"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { APPLICANT_STATUS } from "@/constants/applicant.constants"
import { ApplicantFormValues, applicantSchema } from "@/schemas/applicant.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

interface EditApplicantFormProps {
	defaultValues: ApplicantFormValues
	onSubmit: SubmitHandler<ApplicantFormValues>
	isLoading?: boolean
	cancelAction?: () => void
}

export function EditApplicantForm({ defaultValues, cancelAction, onSubmit, isLoading }: EditApplicantFormProps) {
	const form = useForm<ApplicantFormValues>({
		resolver: zodResolver(applicantSchema),
		defaultValues,
	})
	const applicantStatusOptions = Object.values(APPLICANT_STATUS).map((status) => ({
		label: status,
		value: status,
	}))

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
							<SelectField
								value={field.value}
								onValueChange={field.onChange}
								placeholder="Select application status"
								options={applicantStatusOptions}
							/>
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
								<InputNumber value={field?.value ?? null} onChange={field.onChange} />
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
							<DatePicker value={field.value} onChange={field.onChange} disabled={isLoading} />
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
