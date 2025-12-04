"use server";

import { getAppointments } from "./appointment.actions";
import { getDiagnosis } from "./diagnosis.actions";
import { getDoctor } from "./doctor.actions";
import { getHealthStatuses } from "./healthStatus.actions";
import { getPatient } from "./patient.actions";
import { getCurrentUser } from "./user.actions";
import { getVerdict } from "./verdict.actions";

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

export const getCurrentPatientAppointments = async ({
	page,
	limit,
}: {
	page?: number;
	limit?: number;
}) => {
	const { id: patient } = await getCurrentPatient();

	return await getAppointments({ patient, page, limit });
};

export const getCurrentDoctorAppointments = async ({
	page,
	limit,
}: {
	page?: number;
	limit?: number;
}) => {
	const { id:doctor } = await getCurrentDoctor();
	return await getAppointments({ doctor, limit, page });
};

export const getAllocatedAutoAppointments = async () => {
	const autoAppointments = await getAppointments({ doctor: undefined });

	const _appointments = autoAppointments.filter((a) => {});

	return autoAppointments;
};

export const getVerdictByAppointment = async (
	appointment: string
): Promise<IVerdict | undefined> => {
	const diagnosis = await getDiagnosis({ appointment });

	if (diagnosis) {
		return await getVerdict({ diagnosis: diagnosis.id });
	}

	return;
};
