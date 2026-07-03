import { APPLICANT_STATUS } from "@/constants/applicant.constants"
import { z } from "zod"

export const applicantSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.email("Invalid email address"),
	phone: z.string().min(1, "Phone is required"),
	appliedRole: z.string().min(1, "Applied role is required"),
	applicationStatus: z.enum(Object.values(APPLICANT_STATUS) as [
		string,
		...string[],
	], {
		error: "Application status is required",
	}),
	yearsOfExperience: z.number().nullable().optional(),
	expectedSalary: z.number().optional(),
	availableStartDate: z.date().optional(),
	skills: z.array(z.string()).optional(),
	notes: z.string().optional(),
})

export type ApplicantFormValues = z.infer<typeof applicantSchema>