import { Applicant } from "./applicants.types";
import { BaseEntity } from "./strapi.types";

export interface Interview extends BaseEntity {
	role: string;
	interviewDate: string;
	interviewerName: string;
	applicant: number | Applicant;
	description?: string;
}