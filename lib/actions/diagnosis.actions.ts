"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import diagnosisModel from "../db/models/diagnosis.model";
import { eDiagnosisStatus } from "@/types/enums/enums";

export const createDiagnosis = async (
	diagnosis: IDiagnosis,
	pathname: string
) => {
	try {
		await connectDb();

		await diagnosisModel.create(diagnosis);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getDiagnosis = async ({
	appointment,
	_id,
}: {
	appointment?: string;
	_id?: string;
}): Promise<IAppointment[]> => {
	try {
		await connectDb();

		const diagnosis = await diagnosisModel
			.findOne()
			.or([{ appointment }, { _id }])
			.populate(["appointment", "patient", "doctor", "healthStatus"]);

		return JSON.parse(JSON.stringify(diagnosis));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getDiagnoses = async ({
	patient,
	doctor,
	status,
}: {
	patient?: string;
	doctor?: string;
	status?: eDiagnosisStatus;
}): Promise<IDiagnosis[]> => {
	try {
		await connectDb();

		const diagnoses = await diagnosisModel
			.find()
			.or([{ patient }, { doctor }, { status }])
			.populate(["appointment", "patient", "doctor", "healthStatus"])
			.sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(diagnoses));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateDiagnosis = async (
	diagnosis: IDiagnosis,
	pathname: string
) => {
	try {
		await connectDb();

		await diagnosisModel.findByIdAndUpdate(diagnosis._id, diagnosis);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * ! DANGER ZONE
 * @danger Restrict access to users who can use this action.
 */
export const deleteDiagnosis = async (id: string, pathname: string) => {
	try {
		await connectDb();

		await diagnosisModel.findByIdAndDelete(id);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
