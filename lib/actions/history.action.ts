"use server";

import config from "@/payload.config";
import { unstable_cache as cache, updateTag } from "next/cache";
import { getPayload } from "payload";

const payload = await getPayload({ config });

/**
 * @Mutation
 */
export const createHistory = async (data: IHistory) => {
	try {
		await payload.create({
			collection: "histories",
			data,
		});

		updateTag("histories");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateHistory = async (data: IHistory) => {
	try {
		await payload.update({
			collection: "histories",
			id: data.id,
			data,
		});

		updateTag("histories");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteHistory = async (id: string) => {
	try {
		await payload.delete({
			collection: "histories",
			id,
		});
		updateTag("histories");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */
export const getHistory = cache(
	async ({
		patient,
		id,
	}: {
		patient?: string;
		id?: string;
	}): Promise<IHistory> => {
		try {
			const {
				docs: [history],
			} = await payload.find({
				collection: "histories",
				where: {
					or: [{ id: { equals: id } }, { patient: { equals: patient } }],
				},
				limit: 1,
			});

			return history;
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["histories"],
		revalidate: 60 * 15,
	}
);
