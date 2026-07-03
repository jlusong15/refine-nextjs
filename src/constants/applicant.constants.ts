import { ApplicantStatus } from "@/types/applicants.types";

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

export const INACTIVE_STATUSES: ApplicantStatus[] = [
  APPLICANT_STATUS.HIRED,
  APPLICANT_STATUS.REJECTED,
  APPLICANT_STATUS.WITHDRAWN,
]