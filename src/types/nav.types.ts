import { LucideIcon } from "lucide-react";

export interface NavModel {
	name: string
	route: string
	icon?: LucideIcon
}

export const NavLinks = [
	{ name: 'Dashboard', route: '/' },
	{ name: 'Applicants', route: '/applicants' },
];