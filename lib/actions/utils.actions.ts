"use server";

import { getDoctor } from "./doctor.actions";
import { getPatient } from "./patient.actions";
import { getCurrentUser } from "./user.actions";

export const getCurrentPatient = async (): Promise<IPatient> => {
	try {
		const { _id: userId } = await getCurrentUser();

		return await getPatient({ userId });
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getCurrentDoctor = async (): Promise<IDoctor> => {
	try {
		const { _id: userId } = await getCurrentUser();
		return await getDoctor({ userId });
	} catch (error: any) {
		throw new Error(error);
	}
};
