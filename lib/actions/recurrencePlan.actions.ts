"use server";

import config from "@/payload.config";
import { unstable_cache as cache, updateTag } from "next/cache";
import { getPayload } from "payload";
import { getAppointments } from "./appointment.actions";

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
 * @Queries
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
	}) => {
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
				depth: 3,
				page,
				limit,
			});

			return { plans, hasNextPage, nextPage: nextPage ?? page };
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

/**
 * @Utils
 *
 * */
export const getPlansByPatient = cache(
	async ({
		patient,
		page,
		limit,
	}: {
		patient: string;
		page?: number;
		limit?: number;
	}) => {
		try {
			const { appointments } = await getAppointments({ patient, limit: 0 });
			const appointmentsIDArr = appointments.map((a) => a.id);

			const {
				docs: plans,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "recurrencePlans",
				where: {
					appointment: { in: appointmentsIDArr },
				},
				depth: 3,

				page,
				limit,
			});

			return { plans, hasNextPage, nextPage: nextPage ?? page };
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
