"use server";

import { after } from "next/server";
import historyModel from "../db/models/history.model";
import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";

export const createHistory = async (history: IHistory, pathname: string) => {
	try {
		await connectDb();
		await historyModel.create(history);

		after(() => revalidatePath(pathname));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getHistory = async ({
	patientId,
	id,
}: {
	patientId?: string;
	id?: string;
}): Promise<IHistory> => {
	try {
		await connectDb();

		const history = await historyModel
			.findOne()
			.or([{ _id: id, patient: patientId }])
			.populate({ path: "patient", populate: "user" });

		return JSON.parse(JSON.stringify(history));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateHistory = async (
	updatedHistory: IHistory,
	pathname: string
) => {
	try {
		await connectDb();

		await historyModel.findByIdAndUpdate(updatedHistory._id, updatedHistory);

		after(() => revalidatePath(pathname));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteHistory = async (id: string, pathname: string) => {
	try {
		await connectDb();

		await historyModel.findByIdAndDelete(id);

		after(() => revalidatePath(pathname));
	} catch (error: any) {
		throw new Error(error);
	}
};
