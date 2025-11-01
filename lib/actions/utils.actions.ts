"use server";

import { getAppointments } from "./appointment.actions";
import { getDoctor } from "./doctor.actions";
import { getHealthStatuses } from "./healthStatus.actions";
import { getPatient } from "./patient.actions";
import { getCurrentUser } from "./user.actions";

export const getCurrentPatient = async (): Promise<IPatient> => {
	const { id: user } = await getCurrentUser();
	return await getPatient({ user });
};

export const getCurrentDoctor = async (): Promise<IDoctor> => {
	const { id: user } = await getCurrentUser();
	return await getDoctor({ user });
};

export const getCurrentPatientHealStatuses = async ({
	limit,
}: {
	limit?: number;
}) => {
	const { id } = await getCurrentPatient();
	return await getHealthStatuses({ patient: id!, limit });
};

export const getCurrentPatientAppointments = async () => {
	const { id } = await getCurrentPatient();
	return await getAppointments({ patient: id! });
};

export const getCurrentDoctorAppointments = async () => {
	const { id } = await getCurrentDoctor();
	return await getAppointments({ patient: id! });
};

export const getAllocatedAutoAppointments = async () => {
	const autoAppointments = await getAppointments({ doctor: undefined });

	const _appointments = autoAppointments.filter((a) => {});

	return autoAppointments;
};
