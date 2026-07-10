import { Applicant } from "./applicants.types";
import { BaseEntity } from "./strapi.types";

export interface Interview extends BaseEntity {
	role: string;
	interviewDate: string;
	interviewerName: string;
	applicant?: Applicant;
	description?: string;
	applicantFullName?: string
}