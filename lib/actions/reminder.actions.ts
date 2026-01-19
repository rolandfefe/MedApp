"use server";

import { getPayload } from "payload";
import config from "@/payload.config";
import { unstable_cache as cache, updateTag } from "next/cache";
import { eReminderStatus, eReminderVariants } from "@/types/enums/enums";

const payload = await getPayload({ config });

/**
 * @Mutations
 */
export const createReminder = async (data: IReminder) => {
	try {
		await payload.create({
			collection: "reminders",
			data,
		});

		updateTag("reminders");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateReminder = async (data: IReminder) => {
	try {
		await payload.update({
			collection: "reminders",
			id: data.id,
			data,
		});

		updateTag("reminders");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteReminder = async (id: string) => {
	try {
		await payload.delete({
			collection: "reminders",
			id,
		});

		updateTag("reminders");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Queries
 */

export const getReminders = cache(
	async ({
		user,
		variant,
		status,
		page,
		limit,
	}: {
		user: string;
		variant?: eReminderVariants;
		status?: eReminderStatus;
		page?: number;
		limit?: number;
	}) => {
		try {
			const {
				docs: reminders,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "reminders",
				where: {
					user: { equals: user },
					or: [
						{ variant: { equals: variant } },
						{ status: { equals: status } },
					],
				},
				page,
				limit,
			});

			return { reminders, hasNextPage, nextPage: nextPage ?? page };
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["reminders"],
		revalidate: 60 * 15,
	}
);

export const getReminder = cache(
	async () => {
		try {
		} catch (error: any) {}
	},
	[],
	{
		tags: ["reminders"],
		revalidate: 60 * 15,
	}
);
