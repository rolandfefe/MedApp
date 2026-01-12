import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getNavItem = (
	pathname: string,
	items: NonNullable<IPatientNav["items"]>
) => {
	// ! Fix
	// const nav = items.find(
	// 	(item) =>
	// 		pathname.startsWith(item.link) ||
	// 		pathname.endsWith(item.link) ||
	// 		item.link === pathname
	// );
	const nav = items.find(
		(item) =>
			pathname === item.link ||
			((item.link !== "/" || pathname !== item.link) &&
				(pathname.startsWith(item.link) || pathname.endsWith(item.link)))
	);

	// console.log(nav);

	return nav;
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

export const getAge = (DOB: string | Date): string => {
	return `${new Date().getFullYear() - new Date(DOB).getFullYear()}yrs`;
};

// todo get whether
export const getIsAppointmentDoctor = (
	appointment: IAppointment,
	currentUser: IUser
): boolean => appointment?.doctor!.user.id == currentUser.id;

export function enumToArray<T extends string>(enumObj: {
	[key: string]: T;
}): [T, ...T[]] {
	const values = Object.values(enumObj) as T[];
	if (values.length === 0) {
		throw new Error("Enum must have at least one value");
	}
	return [values[0], ...values.slice(1)];
}
