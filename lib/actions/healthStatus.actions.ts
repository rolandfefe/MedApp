"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import healthStatusModel from "../db/models/healthStatus.model";

export const createHealthStatus = async (
	status: IHealthStatus,
	pathname: string
) => {
	try {
		await connectDb();

		await healthStatusModel.create(status);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getHealthStatuses = async ({
	patient,
}: {
	patient: string;
}): Promise<IHealthStatus[]> => {
	try {
		await connectDb();

		const statuses = await healthStatusModel
			.find()
			.or([{ patient }])
			.populate({ path: "patient", populate: "user" })
			.sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(statuses));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getHealthStatus = async (_id: string): Promise<IHealthStatus> => {
	try {
		await connectDb();

		const status = await healthStatusModel
			.findById(_id)
			.populate({ path: "patient", populate: "user" });

		return JSON.parse(JSON.stringify(status));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateHealthStatus = async (
	updatedHealthStatus: IHealthStatus,
	pathname: string
) => {
	try {
		await connectDb();

		await healthStatusModel.findByIdAndUpdate(
			updatedHealthStatus._id,
			updatedHealthStatus
		);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteHealthStatus = async (_id: string, pathname: string) => {
	try {
		await connectDb();

		await healthStatusModel.findByIdAndDelete(_id);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
