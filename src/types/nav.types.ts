import { BookA, ChartBarStacked, House, LucideIcon, Rss } from "lucide-react";

export interface NavModel {
	name: string
	route: string
	icon?: LucideIcon
}

export const NavLinks = [
	{ name: 'Home', route: '/' },
	{ name: 'Applicans', route: '/applicants' },
	{ name: 'Interviews', icon: Rss, route: '/interviews' },
];