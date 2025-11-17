"use server";

import config from "@/payload.config";
import { unstable_cache as cache, updateTag } from "next/cache";
import { getPayload } from "payload";

const payload = await getPayload({ config });

/**
 * @Mutations
 */
export const createPlan = async (data: IRecurrencePlan) => {
	try {
		await payload.create({
			collection: "recurrencePlans",
			data,
		});

		updateTag("plans");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updatePlan = async (data: IRecurrencePlan) => {
	try {
		await payload.update({
			collection: "recurrencePlans",
			id: data.id,
			data,
		});
		updateTag("plans");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deletePlan = async (id: string) => {
	try {
		await payload.delete({
			collection: "recurrencePlans",
			id,
		});

		updateTag("plans");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */
export const getPlan = cache(
	async ({
		id,
		appointment,
	}: {
		id?: string;
		appointment?: string;
	}): Promise<IRecurrencePlan> => {
		try {
			const { docs: plans } = await payload.find({
				collection: "recurrencePlans",
				where: {
					or: [
						{ id: { equals: id } },
						{ appointment: { equals: appointment } },
					],
				},
				limit: 1,
			});

			return plans[0];
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["plans"],
		revalidate: 15 * 60,
	}
);

export const getPlans = cache(
	async ({
		supervisor,
		page = 1,
		limit,
	}: {
		supervisor?: string;
		page?: number;
		limit?: number;
	}): Promise<{ plans: IRecurrencePlan[]; nextPg: number }> => {
		try {
			const {
				docs: plans,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "recurrencePlans",
				where: {
					supervisor: { equals: supervisor },
				},
				page,
				limit,
			});

			return { plans, nextPg: hasNextPage ? nextPage! : page };
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["plans"],
		revalidate: 15 * 60,
	}
);
