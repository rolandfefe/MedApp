"use server";

import config from "@/payload.config";
import { updateTag, unstable_cache as cache } from "next/cache";
import { getPayload } from "payload";
import healthStatusModel from "../db/models/healthStatus.model";

const payload = await getPayload({ config });

/**
 * @Mutations
 */

export const createHealthStatus = async (data: IHealthStatus) => {
	try {
		await payload.create({
			collection: "healthStatuses",
			data,
		});
		updateTag("healthStatuses");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateHealthStatus = async (data: IHealthStatus) => {
	try {
		await payload.update({
			collection: "healthStatuses",
			id: data.id,
			data,
		});

		updateTag("healthStatuses");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteHealthStatus = async (id: string) => {
	try {
		await payload.delete({
			collection: "healthStatuses",
			id,
		});
		updateTag("healthStatuses");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */

export const getHealthStatuses = cache(
	async ({
		patient,
		page = 1,
		limit,
	}: {
		patient: string;
		page?: number;
		limit?: number;
	}): Promise<{ healthStatuses: IHealthStatus[]; nextPg: number }> => {
		try {
			const {
				docs: healthStatuses,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "healthStatuses",
				where: {
					patient: { equals: patient },
				},
				page,
				limit,
			});

			return { healthStatuses, nextPg: hasNextPage ? nextPage! : page };
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["healthStatuses"],
		revalidate: 30 * 60,
	}
);

export const getHealthStatus = cache(
	async (id: string, latest?: boolean): Promise<IHealthStatus> => {
		try {
			return await payload.findByID({
				collection: "healthStatuses",
				id,
				depth: 1,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["healthStatuses"],
		revalidate: 15 * 60,
	}
);
