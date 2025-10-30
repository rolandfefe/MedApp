"use server";

import { getAppointments } from "./appointment.actions";
import { getDoctor } from "./doctor.actions";
import { getHealthStatuses } from "./healthStatus.actions";
import { getPatient } from "./patient.actions";
import { getCurrentUser } from "./user.actions";

export const getCurrentPatient = async (): Promise<IPatient> => {
	const { id: userId } = await getCurrentUser();
	return await getPatient({ userId });
};

export const getCurrentDoctor = async (): Promise<IDoctor> => {
	const { id: userId } = await getCurrentUser();
	return await getDoctor({ userId });
};

export const getCurrentPatientHealStatuses = async (latest?: boolean) => {
	const { id } = await getCurrentPatient();
	return await getHealthStatuses({ patient: id!, latest });
};

export const getCurrentPatientAppointments = async (latest?: boolean) => {
	const { id } = await getCurrentPatient();
	return await getAppointments({ patient: id! });
};

export const getAllocatedAutoAppointments = async (): Promise<
	Appointment[]
> => {
	const autoAppointments = await getAppointments({ doctor: undefined });

	const _appointments = autoAppointments.filter((a) => {});

	return autoAppointments;
};
