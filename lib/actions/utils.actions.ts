"use server"

import { cookies } from "next/headers";

export const setThemeCookieAction = async (theme: string): Promise<void> => {
	try {
		(await cookies()).set("theme", theme);
	} catch (error: any) {
		throw new Error(error);
	}
};


