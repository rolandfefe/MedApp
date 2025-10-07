"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import appointmentModel from "../db/models/appointment.model";
import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums/enums";

export const createAppointment = async (
	appointment: IAppointment,
	pathname: string
) => {
	try {
		await connectDb();

		await appointmentModel.create(appointment);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getAppointments = async ({
	patientId,
	doctorId,
	type,
	status,
}: {
	patientId?: string;
	doctorId?: string;
	type?: eAppointmentTypes;
	status?: eAppointmentStatus;
}): Promise<IAppointment[]> => {
	try {
		await connectDb();

		const appointments = await appointmentModel
			.find()
			.or([{ patient: patientId }, { doctor: doctorId }, { type }, { status }])
			.populate({ path: "patient", populate: "user" })
			.populate({ path: "doctor", populate: "user" })
			.populate("healthStatus")
			.sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(appointments));
	} catch (error: any) {
		throw new Error(error);
	}
};

// export const getAppointment = async ({
// 	_id,
// 	referral = "REFERRAL_DUMMY_ID",
// }: {
// 	_id?: string;
// 	referral?: string;
// }): Promise<IAppointment> => {
// 	try {
// 		await connectDb();

// 		const appointment = await appointmentModel
// 			.findOne()
// 			// .or([{ _id }, { referral }])
// 			.or([{ _id }])
// 			.populate({ path: "patient", populate: "user" })
// 			.populate({ path: "doctor", populate: "user" })
// 			.populate("healthStatus");

// 		return JSON.parse(JSON.stringify(appointment));
// 	} catch (error: any) {
// 		throw new Error(error);
// 	}
// };

export const getAppointmentById = async (id: string): Promise<IAppointment> => {
	try {
		await connectDb();

		const appointment = await appointmentModel
			.findById(id)
			.populate({ path: "patient", populate: "user" })
			.populate({ path: "doctor", populate: "user" });

		return JSON.parse(JSON.stringify(appointment));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateAppointment = async (
	updatedAppointment: IAppointment,
	pathname: string
) => {
	try {
		await connectDb();

		await appointmentModel.findByIdAndUpdate(
			updatedAppointment._id,
			updatedAppointment
		);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteAppointment = async (_id: string, pathname: string) => {
	try {
		await connectDb();

		await appointmentModel.findByIdAndDelete(_id);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
