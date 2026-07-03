import { APPLICANT_STATUS } from "@/constants/applicant.constants";
import { Interview } from "./interview.types";
import { BaseEntity } from "./strapi.types";

export type ApplicantStatus =
	(typeof APPLICANT_STATUS)[keyof typeof APPLICANT_STATUS];
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
