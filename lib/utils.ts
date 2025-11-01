import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getNavItem = (
	pathname: string,
	items: NonNullable<IPatientNav["items"]>
) =>
	items.find(
		(item) =>
			item.link === pathname ||
			item.link.startsWith(pathname) ||
			item.link.endsWith(pathname)
	);

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

export const getAge = (DOB: string | Date): string => {
	return `${new Date().getFullYear() - new Date(DOB).getFullYear()}yrs`;
};

// todo get whether
export const getIsAppointmentDoctor = (
	appointment: IAppointment,
	currentUser: IUser
): boolean => appointment?.doctor!.user.id == currentUser.id;
