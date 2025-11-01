"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { unstable_cache as cache } from "next/cache";

const payload = await getPayload({ config });

/**
 * @Fetches
 */

export const getLandingNav = cache(
	async (): Promise<ILandingNav> => {
		try {
			return await payload.findGlobal({
				slug: "LandingNav",
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	["landing-nav"],
	{
		tags: ["landing-nav"],
		revalidate: 30 * 60,
	}
);

export const getPatientNav = cache(
	async (): Promise<IPatientNav> => {
		try {
			return await payload.findGlobal({
				slug: "PatientNav",
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	["patient-nav"],
	{
		tags: ["patient-nav"],
		revalidate: 30 * 60,
	}
);

export const getDoctorNav = cache(
	async (): Promise<IDoctorNav> => {
		try {
			return await payload.findGlobal({
				slug: "DoctorNav",
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	["doctor-nav"],
	{
		tags: ["doctor-nav"],
		revalidate: 30 * 60,
	}
);
