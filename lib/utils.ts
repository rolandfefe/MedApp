import {
	ADMIN_NAV_ITEMS,
	getDoctorNavItems,
	LANDING_NAV_ITEMS,
	PATIENT_NAV_ITEMS,
} from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getNavItem = (
	pathname: string,
	variant: "Patient" | "Doctor" | "Admin",
	id?: string
) => {
	const navItems =
		variant === "Admin"
			? ADMIN_NAV_ITEMS
			: variant === "Doctor"
			? getDoctorNavItems(id!)
			: PATIENT_NAV_ITEMS;

	return navItems.find(
		(item) => item.link === pathname || item.link.startsWith(pathname)
	);
};

export const containsRegex = (query: string): RegExp => {
	const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return new RegExp(escapedQuery, "i");
};

const fuzzyMatchRegex = (query: string): RegExp => {
	const pattern = query
		.split("")
		.map((char) => {
			return char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ".*?";
		})
		.join("");
	return new RegExp(pattern, "i");
};

export const getAge = (DOB: Date): string => {
	return `${new Date().getFullYear() - new Date(DOB).getFullYear()}yrs`;
};
