"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import recurrencePlanModel from "../db/models/recurrencePlan.model";

export const createPlan = async (plan: IRecurrencePlan, pathname: string) => {
	try {
		await connectDb();

		await recurrencePlanModel.create(plan);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getPlan = async ({
	// supervisor,
	_id,
}: {
	// supervisor?: string;
	_id?: string;
}): Promise<IRecurrencePlan> => {
	try {
		await connectDb();

		const plan = await recurrencePlanModel.findOne().or([{ _id }]);

		return JSON.parse(JSON.stringify(plan));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getPlans = async ({
	supervisor,
}: {
	supervisor?: string;
}): Promise<IRecurrencePlan[]> => {
	try {
		await connectDb();

		const plans = await recurrencePlanModel.findOne().or([{ supervisor }]);

		return JSON.parse(JSON.stringify(plans));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updatePlan = async (plan: IRecurrencePlan, pathname: string) => {
	try {
		await connectDb();

		await recurrencePlanModel.findByIdAndUpdate(plan._id, plan);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deletePlan = async (id: string, pathname: string) => {
	try {
		await connectDb();

		await recurrencePlanModel.findByIdAndDelete(id);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
