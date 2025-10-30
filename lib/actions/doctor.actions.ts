"use server";

import { updateTag, unstable_cache as cache } from "next/cache";
import { connectDb } from "../db/db";
import doctorModel from "../db/models/doctor.model";
import { getPayload } from "payload";
import config from "@/payload.config";

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

// export const getDoctorsAdvanced = async ({}: {}) => {
// 	try {
// 		await connectDb()

// 		const doctors = await doctorModel.find()
// 	} catch (error:any) {
// 		throw new Error(error)
// 	}
// }

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
	}): Promise<{ doctors: IDoctor[]; nextPg: number }> => {
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

			return { doctors, nextPg: hasNextPage ? nextPage! : page };
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
