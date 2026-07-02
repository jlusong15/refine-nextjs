import { z } from "zod"

export const interviewSchema = z.object({
	role: z
		.string()
		.trim()
		.min(1, "Role is required"),

	description: z
		.string()
		.trim()
		.optional(),

	interviewerName: z
		.string()
		.trim()
		.min(1, "Interviewer name is required"),

	interviewDate: z.date({
		error: "Interview date is required",
	}),
})

export type InterviewFormValues = z.infer<typeof interviewSchema>