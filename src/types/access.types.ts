import { BaseEntity } from "./strapi.types";

export interface AccessControl extends BaseEntity {
	roleCode: string;
	roleAccess: string[]
}