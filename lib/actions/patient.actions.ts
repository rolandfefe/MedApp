"use server";

import config from "@/payload.config";
import { eGender, eMaritalStatus } from "@/types/enums/enums";
import { unstable_cache as cache, updateTag } from "next/cache";
import { getPayload } from "payload";

const payload = await getPayload({ config });
/**
 * @Mutations
 */

export const createPatient = async (data: IPatient) => {
	try {
		await payload.create({
			collection: "patients",
			data,
		});

		updateTag("patients");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updatePatient = async (data: IPatient) => {
	try {
		await payload.update({
			collection: "patients",
			id: data.id,
			data,
		});

		updateTag("patients");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deletePatient = async (id: string) => {
	try {
		await payload.delete({
			collection: "patients",
			id,
		});

		updateTag("patients");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */

export const getPatients = cache(
	async ({
		gender,
		maritalStatus,
		page = 1,
		limit,
	}: {
		gender?: eGender;
		maritalStatus?: eMaritalStatus;
		page?: number;
		limit?: number;
	}): Promise<{ patients: IPatient[]; nextPg: number }> => {
		try {
			const {
				docs: patients,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "patients",
				where: {
					or: [
						{ gender: { equals: gender } },
						{ maritalStatus: { equals: maritalStatus } },
					],
				},
				depth: 1,
				page,
				limit,
			});

			return { patients, nextPg: hasNextPage ? nextPage! : page };
		} catch (error: any) {
			throw new Error();
		}
	},
	["patients"],
	{
		tags: ["patients"],
		revalidate: 15 * 60,
	}
);

export const getPatient = cache(
	async ({ id, user }: { id?: string; user?: string }): Promise<IPatient> => {
		try {
			const { docs } = await payload.find({
				collection: "patients",
				where: {
					or: [{ id: { equals: id } }, { user: { equals: user } }],
				},
				depth: 1,
				limit: 1,
			});

			return docs[0];
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["patients"],
		revalidate: 30 * 60,
	}
);
