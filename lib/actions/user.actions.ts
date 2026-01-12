"use server";

import config from "@/payload.config";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { unstable_cache as cache, updateTag } from "next/cache";
import { getPayload } from "payload";

const payload = await getPayload({ config });
const isDevMode = process.env.MY_ENV === "dev";

/**
 * @Mutations
 */
export const createUser = async (
	data: Omit<IUser, "id" | "updatedAt" | "createdAt">
): Promise<IUser> => {
	try {
		const user = await payload.create({
			collection: "users",
			data,
		});

		// updateTag("users"); // ! Not necessary on creation / sign up

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

		// updateTag("users"); // ! Avoid since interacts with webhooks
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Queries
 */
export const getCurrentUser = async (): Promise<IUser> => {
	try {
		let clerkId: string | null;

		if (isDevMode) {
			// ? "user_44Ep69eYVSnVJI1XSnkXxkyFbkE" // - Dr Alexandar Chen
			// ? "user_33Ny58nhEBwER0gBwuGgthOktnN" // - Dr lina
			// ? "user_44Oz69oiFCxEQ1hCwvHhuiPkuoO" // - Pat olivia brown
			clerkId = "user_88It03icZWrZN5bWrpBbocJfoI"; // - Dr Miah Johnson
		} else {
			const clerkUser = await currentUser();
			clerkId = clerkUser && clerkUser.id;
		}

		const {
			docs: [user],
		} = await payload.find({
			collection: "users",
			limit: 1,
			where: {
				clerkId: { equals: clerkId ?? "" },
			},
		});

		return user;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUser = cache(
	async ({
		id,
		clerkId,
	}: {
		id?: string;
		clerkId?: string;
	}): Promise<IUser> => {
		try {
			const {
				docs: [user],
			} = await payload.find({
				collection: "users",
				where: {
					or: [{ id: { equals: id } }, { clerkId: { equals: clerkId } }],
				},
				limit: 1,
			});

			return user;
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
