"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import appointmentModel from "../db/models/appointment.model";
import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums/enums";
import { pusherServer } from "../pusher";

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
			// .populate({ path: "referrals", populate: ["from", "to"] });
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
			.populate({ path: "doctor", populate: "user" })
			.populate({
				path: "referrals",
				populate: [
					{ path: "from", populate: "user" },
					{ path: "to", populate: "user" },
				],
			});

		return JSON.parse(JSON.stringify(appointment));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateAppointment = async (
	appointment: IAppointment,
	pathname?: string
) => {
	try {
		await connectDb();

		const updatedAppointment = await appointmentModel
			.findByIdAndUpdate(appointment._id, appointment, { new: true })
			.populate({ path: "patient", populate: "user" })
			.populate({ path: "doctor", populate: "user" })
			.populate({
				path: "referrals",
				populate: [
					{ path: "from", populate: "user" },
					{ path: "to", populate: "user" },
				],
			});

		// ? Conditionally trigger Real-time
		if (pathname) {
			revalidatePath(pathname);
		} else {
			// ? Pusher
			pusherServer.trigger(
				`appointment-${appointment._id}`,
				`appointment-${appointment._id}-updated`,
				updatedAppointment
			);
		}
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

/**
 * @Realtime
 *
 */
