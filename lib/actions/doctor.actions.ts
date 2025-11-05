"use server";

import config from "@/payload.config";
import { unstable_cache as cache, updateTag } from "next/cache";
import { getPayload } from "payload";

const payload = await getPayload({ config });

/**
 * @Mutations
 */

export const createDoctor = async (data: IDoctor): Promise<IDoctor> => {
	try {
		const doctor = await payload.create({
			collection: "doctors",
			data,
		});
		updateTag("doctors");

		return doctor;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateDoctor = async (data: IDoctor) => {
	try {
		await payload.update({
			collection: "doctors",
			id: data.id,
			data,
		});
		updateTag("doctors");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteDoctor = async (id: string) => {
	try {
		await payload.delete({
			collection: "doctors",
			id,
		});
		updateTag("doctors");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */
export const getDoctors = cache(
	async ({
		page = 1,
		limit,
	}: {
		page?: number;
		limit?: number;
	}) => {
		try {
			const {
				docs: doctors,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "doctors",
				page,
				limit,
			});

			return { doctors, hasNextPage, nextP };
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["doctors"],
		revalidate: 15 * 60,
	}
);

export const getDoctorsBySpecialty = cache(
	async (specialty: string): Promise<IDoctor[]> => {
		try {
			const { docs: doctors } = await payload.find({
				collection: "doctors",
				where: {
					specialty: { equals: specialty },
				},
			});

			return doctors;
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["doctors"],
		revalidate: 15 * 60,
	}
);

export const getDoctor = cache(
	async ({ user, id }: { user?: string; id?: string }): Promise<IDoctor> => {
		try {
			const { docs } = await payload.find({
				collection: "doctors",
				where: {
					or: [{ id: { equals: id } }, { user: { equals: user } }],
				},
				limit: 1,
			});

			return docs[0];
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["doctors"],
		revalidate: 30 * 60,
	}
);
