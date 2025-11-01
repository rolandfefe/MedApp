"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { updateTag, unstable_cache as cache } from "next/cache";

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

