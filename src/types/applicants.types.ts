import { BaseEntity } from "./strapi.types";

export interface Interview extends BaseEntity {
	role: string;
	description?: string;
	interviewDate: string;
	interviewerName: string;
}

export interface Applicant extends BaseEntity {
	fullName: string;
	email: string;
	phone: string;
	appliedRole: string;
	yearsOfExperience: number;
	applicationStatus: ApplicantStatus;
	expectedSalary?: number;
	availableStartDate?: string;
	skills?: string[];
	notes?: string;
	interviews?: Interview[];
}

export const APPLICANT_STATUS = {
	NEW: "New",
	SCREENING: "Screening",
	INTERVIEW_SCHEDULED: "Interview Scheduled",
	INTERVIEWED: "Interviewed",
	TECHNICAL_EXAM: "Technical Exam",
	OFFER_SENT: "Offer Sent",
	HIRED: "Hired",
	REJECTED: "Rejected",
	WITHDRAWN: "Withdrawn",
} as const;

export type ApplicantStatus =
	(typeof APPLICANT_STATUS)[keyof typeof APPLICANT_STATUS];