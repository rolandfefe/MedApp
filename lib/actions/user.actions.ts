"use server";

import { after } from "next/server";
import { connectDb } from "../db/db";
import userModel from "../db/models/user.model";
import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const createUser = async (
	user: IUser,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await userModel.create(user);

		after(() => revalidatePath(pathname));
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

export const completeOnboarding = async (formData: FormData) => {
	const { isAuthenticated, userId } = await auth();

	if (!isAuthenticated) {
		return { message: "No Logged In User" };
	}

	const client = await clerkClient();

	try {
		const res = await client.users.updateUser(userId, {
			publicMetadata: {
				onboardingComplete: true,
				applicationName: formData.get("applicationName"),
				applicationType: formData.get("applicationType"),
			},
		});
		return { message: res.publicMetadata };
	} catch (err) {
		return { error: "There was an error updating the user metadata." };
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

		after(() => revalidatePath(pathname));
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

		after(() => revalidatePath(pathname));
	} catch (error: any) {
		throw new Error(error);
	}
};
