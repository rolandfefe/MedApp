"use server";

import { unstable_cache as cache, updateTag } from "next/cache";
import { getPayload } from "payload";
import { pusherServer } from "../pusher";

import config from "@/payload.config";

const payload = await getPayload({ config });

/**
 * @Mutations
 *
 * */
export const createMsg = async (
	data: Omit<IMessage, "id" | "createdAt" | "updatedAt">
) => {
	try {
		const msg = await payload.create({
			collection: "messages",
			data,
		});

		// ? 1. Pusher trigger.
		await pusherServer.trigger(
			`chat-${data.appointment}-channel`,
			`new-${data.appointment}-msg`,
			JSON.parse(JSON.stringify(msg))
		);

		updateTag("msgs");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateMsg = async (data: IMessage) => {
	try {
		await payload.update({
			collection: "messages",
			id: data.id,
			data,
		});

		updateTag("msgs");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteMsg = async (id: string) => {
	try {
		await payload.delete({
			collection: "messages",
			id,
		});

		updateTag("msgs");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */
export const getMsgs = cache(
	async ({ appointment, page = 1 }: { appointment: string; page?: number }) => {
		try {
			const {
				docs: msgs,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "messages",
				where: { appointment: { equals: appointment } },
				depth: 1,
				sort: "createdAt",
				page,
			});

			return { msgs, hasNextPage, nextPage };
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["msgs"],
		revalidate: 60,
	}
);
