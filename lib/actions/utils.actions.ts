"use server";

import { getDoctor } from "./doctor.actions";
import { getHealthStatuses } from "./healthStatus.actions";
import { getPatient } from "./patient.actions";
import { getCurrentUser } from "./user.actions";

export const getCurrentPatient = async (): Promise<IPatient> => {
	const { _id: userId } = await getCurrentUser();
	return await getPatient({ userId });
};

export const getCurrentDoctor = async (): Promise<IDoctor> => {
	const { _id: userId } = await getCurrentUser();
	return await getDoctor({ userId });
};

export const getCurrentPatientHealStatuses = async (latest?: boolean) => {
	const { _id } = await getCurrentPatient();
	return await getHealthStatuses({ patient: _id!, latest });
};
