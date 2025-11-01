"use server";

import config from "@/payload.config";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { unstable_cache as cache, updateTag } from "next/cache";
import { getPayload } from "payload";

const payload = await getPayload({ config });

/**
 * @Mutations
 */
export const createUser = async (data: IUser): Promise<IUser> => {
	try {
		const user = await payload.create({
			collection: "users",
			data,
		});

		updateTag("users");

		return user;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateOnBoardingStatus = async (isComplete: boolean) => {
	const { userId } = await auth();

	const client = await clerkClient();

	try {
		const res = await client.users.updateUser(userId!, {
			publicMetadata: {
				onboardingComplete: isComplete,
			},
		});
		console.log(res.publicMetadata);

		updateTag("users");
	} catch (err: any) {
		throw new Error(err);
	}
};

export const updateUser = async (data: IUser): Promise<void> => {
	try {
		await payload.update({
			collection: "users",
			id: data.id,
			data,
		});

		updateTag("users");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteUser = async (clerkId: string): Promise<void> => {
	try {
		await payload.delete({
			collection: "users",
			where: {
				clerkId: { equals: clerkId },
			},
		});

		updateTag("users");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */
export const getCurrentUser = cache(
	async (): Promise<IUser> => {
		try {
			let clerkId: string;

			if (process.env.MY_ENV === "dev") {
				clerkId = "user_00Kv25keBYtBP7dYtrDdqeLhqK";
			} else {
				clerkId = (await currentUser())!.id;
			}

			const { docs } = await payload.find({
				collection: "users",
				limit: 1,
				where: {
					clerkId: { equals: clerkId },
				},
			});

			return docs[0];
		} catch (error: any) {
			throw new Error(error);
		}
	},
	["currentUser"],
	{
		tags: ["users"],
		revalidate: 60 * 60,
	}
);

export const getUser = cache(
	async ({
		id,
		clerkId,
	}: {
		id?: string;
		clerkId?: string;
	}): Promise<IUser> => {
		try {
			const { docs } = await payload.find({
				collection: "users",
				where: {
					or: [{ id: { equals: id } }, { clerkId: { equals: clerkId } }],
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
		tags: ["users"],
		revalidate: 30 * 60,
	}
);

export const getUsers = cache(
	async (page: number = 1): Promise<{ users: IUser[]; nextPg: number }> => {
		try {
			const {
				docs: users,
				nextPage,
				hasNextPage,
				page: pg,
			} = await payload.find({
				collection: "users",
				page,
			});

			return { users, nextPg: hasNextPage ? nextPage! : pg! };
		} catch (error: any) {
			throw new Error(error);
		}
	},
	["users"],
	{
		tags: ["users"],
		revalidate: 15 * 60,
	}
);
