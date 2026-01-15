"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { updateTag, unstable_cache as cache } from "next/cache";
import { getAppointments } from "./appointment.actions";
import { getDiagnoses } from "./diagnosis.actions";

const payload = await getPayload({ config });

/**
 * @Mutations
 */
export const createVerdict = async (data: IVerdict) => {
	try {
		await payload.create({
			collection: "Verdict",
			data,
		});

		updateTag("verdicts");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateVerdict = async (data: IVerdict) => {
	try {
		await payload.update({
			collection: "Verdict",
			id: data.id,
			data,
		});

		updateTag("verdicts");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteVerdict = async (id: string) => {
	try {
		await payload.delete({
			collection: "Verdict",
			id,
		});
		updateTag("verdicts");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */
export const getVerdict = cache(
	async ({
		id,
		diagnosis,
	}: {
		id?: string;
		diagnosis?: string;
	}): Promise<IVerdict> => {
		try {
			const {
				docs: [verdict],
			} = await payload.find({
				collection: "Verdict",
				where: {
					or: [{ id: { equals: id } }, { diagnosis: { equals: diagnosis } }],
				},
				limit: 1,
			});

			return verdict;
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["verdicts"],
		revalidate: 15 * 60,
	}
);

/**
 * @Utils
 */

export const getVerdicts = cache(
	async ({
		patient,
		doctor,
		page,
		limit,
	}: {
		patient?: string;
		doctor?: string;
		page?: number;
		limit?: number;
	}) => {
		try {
			// get Diagnoses
			const { diagnoses } = await getDiagnoses({ patient, doctor });
			const diagnosesIdArr = diagnoses.map((d) => d.id);

			// get Verdicts
			const {
				docs: verdicts,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "Verdict",
				where: {
					diagnosis: { in: diagnosesIdArr },
				},
				page,
				limit,
			});

			return { verdicts, hasNextPage, nextPage };
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["verdicts"],
		revalidate: 15 * 60,
	}
);
