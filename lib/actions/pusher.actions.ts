"use server";

import { pusherServer } from "@/lib/pusher/pusher.server";

export const appointmentConfirmationTrigger = async (
	appointment: IAppointment
) => {
	try {
		await pusherServer.trigger(
			`appointment-${appointment.patient.id}`,
			`appointment-${appointment.patient.id}-confirmed`,
			appointment.id
		);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const promptPatientTrigger = async (
	appointment: IAppointment,
	prompt: "History" | "Vitals"
) => {
	try {
		await pusherServer.trigger(
			`appointment-${appointment.patient?.id}`,
			`patient-prompt-${appointment.patient?.id}`,
			{ id: appointment.id, prompt }
		);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const consentControlTrigger = async (
	appointment: IAppointment,
	consent: NonNullable<IAppointment["consentLevels"]>[number],
	state: "hidden" | "granted"
) => {
	try {
		if (state === "granted") {
			await pusherServer.trigger(
				`appointment-${appointment.doctor?.id}`,
				`consent-granted-${appointment.doctor?.id}`,
				{ id: appointment.id, consent }
			);
		} else {
			await pusherServer.trigger(
				`appointment-${appointment.doctor?.id}`,
				`consent-denied-${appointment.doctor?.id}`,
				{ id: appointment.id, consent }
			);
		}
	} catch (error: any) {
		throw new Error(error);
	}
};
