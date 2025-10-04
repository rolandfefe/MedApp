"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { connectDb } from "../db/db";
import userModel from "../db/models/user.model";

export const getCurrentUser = async (): Promise<IUser> => {
	try {
		await connectDb();

		let clerkId: string;

		if (process.env.MY_ENV === "dev") {
			clerkId = "user_33IYoE4ONaznKJn53RfVyPslr2t";
		} else {
			clerkId = (await currentUser())!.id;
		}

		const mongoUser = await userModel.findOne({ clerkId });

		return JSON.parse(JSON.stringify(mongoUser));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const createUser = async (
	user: IUser,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await userModel.create(user);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUser = async (userId: IUser["_id"]): Promise<IUser> => {
	try {
		await connectDb();

		const user = await userModel.findById(userId);

		return JSON.parse(JSON.stringify(user));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUsers = async (): Promise<IUser[]> => {
	try {
		await connectDb();

		const users = await userModel.find().sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(users));
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

		after(() => revalidatePath("/"));
	} catch (err: any) {
		throw new Error(err);
	}
};

export const updateUser = async (
	updatedUser: IUser,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await userModel.findOneAndUpdate(
			{ clerkId: updatedUser.clerkId },
			updatedUser
		);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteUser = async (
	clerkId: string,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await userModel.findOneAndDelete({ clerkId });

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
