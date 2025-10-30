"use server";

import config from "@/payload.config";
import { eReferralStatus } from "@/types/enums/enums";
import { updateTag, unstable_cache as cache } from "next/cache";
import { getPayload } from "payload";
import referralModel from "../db/models/referral.model";

const payload = await getPayload({ config });

/**
 * @Mutations
 */
export const createReferral = async (
	data: Omit<IReferral, "id" | "createdAt" | "updatedAt">
) => {
	try {
		await payload.create({
			collection: "referrals",
			data,
		});

		updateTag("referrals");
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const updateReferral = async (data: IReferral) => {
	try {
		await payload.update({
			collection: "referrals",
			id: data.id,
			data,
		});

		// ? Conditionally trigger Real-time
		updateTag("referrals");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteReferral = async (id: string) => {
	try {
		await payload.delete({
			collection: "referrals",
			id,
		});

		updateTag("referrals");
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * @Fetches
 */
export const getReferrals = cache(
	async ({
		appointment,
		from,
		to,
		status,
		page = 1,
		limit = 0,
	}: {
		appointment?: string;
		from?: string;
		to?: string;
		status?: eReferralStatus;
		page?: number;
		limit?: number;
	}): Promise<{ referrals: IReferral[]; nextPg: number }> => {
		try {
			const {
				docs: referrals,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "referrals",
				where: {
					or: [
						{ appointment: { equals: appointment } },
						{ from: { equals: from } },
						{ to: { equals: to } },
						{ status: { equals: status } },
					],
				},
				depth: 2,
				page,
				limit,
			});

			return { referrals, nextPg: hasNextPage ? nextPage! : page };
		} catch (error: any) {
			throw new Error(error.message);
		}
	},
	[],
	{
		tags: ["referrals"],
		revalidate: 15 * 60,
	}
);

export const getReferral = cache(
	async (id: string): Promise<IReferral> => {
		try {
			const referral = await payload.findByID({
				collection: "referrals",
				id,
				depth: 2,
			});

			return referral;
		} catch (error: any) {
			throw new Error(error.message);
		}
	},
	[],
	{
		tags: ["referrals"],
		revalidate: 15 * 60,
	}
);
