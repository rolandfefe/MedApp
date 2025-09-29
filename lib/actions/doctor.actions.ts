"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import doctorModel from "../db/models/doctor.model";
import { after } from "next/server";

export const createDoctor = async (
	doctor: IDoctor,
	pathname: string
): Promise<IDoctor> => {
	try {
		await connectDb();

		const newDoctor = await doctorModel.create(doctor);

		after(() => revalidatePath(pathname));

		return JSON.parse(JSON.stringify(newDoctor));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getDoctors = async (): Promise<IDoctor[]> => {
	try {
		await connectDb();

		const doctors = await doctorModel
			.find()
			.populate("user")
			.sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(doctors));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getDoctorsBySpecialty = async (
	specialty: string
): Promise<IDoctor[]> => {
	try {
		await connectDb();

		const doctors = await doctorModel
			.find({ specialties: specialty })
			.populate("user")
			.sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(doctors));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getDoctor = async ({
	userId,
	id,
}: {
	userId?: string;
	id?: string;
}): Promise<IDoctor> => {
	try {
		await connectDb();

		const doctor = await doctorModel
			.findOne()
			.or([{ _id: id }, { user: userId }])
			.populate("user");

		return JSON.parse(JSON.stringify(doctor));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateDoctor = async (
	updatedDoctor: IDoctor,
	pathname: string
) => {
	try {
		await connectDb();

		await doctorModel.findByIdAndUpdate(updatedDoctor._id, updatedDoctor);

		after(() => revalidatePath(pathname));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteDoctor = async (id: string, pathname: string) => {
	try {
		await connectDb();

		await doctorModel.findByIdAndDelete(id);

		after(() => revalidatePath(pathname));
	} catch (error: any) {
		throw new Error(error);
	}
};
