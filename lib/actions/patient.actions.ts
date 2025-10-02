"use server";

import { after } from "next/server";
import { connectDb } from "../db/db";
import patientModel from "../db/models/patient.model";
import { revalidatePath } from "next/cache";

export const createPatient = async (patient: IPatient, pathname: string) => {
	try {
		await connectDb();

		await patientModel.create(patient);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getPatients = async (): Promise<IPatient[]> => {
	try {
		await connectDb();

		const patients = await patientModel
			.find()
			.populate("user")
			.sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(patients));
	} catch (error: any) {
		throw new Error();
	}
};

export const getPatient = async ({
	id,
	userId,
}: {
	id?: string;
	userId?: string;
}): Promise<IPatient> => {
	try {
		await connectDb();

		const patient = await patientModel
			.findOne()
			.or([{ _id: id }, { user: userId }])
			.populate("user")
			.sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(patient));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updatePatient = async (
	updatedPatient: IPatient,
	pathname: string
) => {
	try {
		await connectDb();

		await patientModel.findByIdAndUpdate(updatedPatient._id, updatedPatient);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deletePatient = async (id: string, pathname: string) => {
	try {
		await connectDb();

		await patientModel.findByIdAndDelete(id);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
