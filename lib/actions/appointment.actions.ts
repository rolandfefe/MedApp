"use server";

import config from "@/payload.config";
import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums/enums";
import { unstable_cache as cache, updateTag } from "next/cache";
import { getPayload } from "payload";
import { pusherServer } from "../pusher";

const payload = await getPayload({ config });

/**
 * @Mutations
 */
export const createAppointment = async (
	data: Omit<IAppointment, "id" | "createdAt" | "updatedAt">
) => {
	try {
		await payload.create({
			collection: "appointments",
			data,
		});

		updateTag("appointments");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateAppointment = async (data: IAppointment) => {
	try {
		const appointment = await payload.update({
			collection: "appointments",
			id: data.id,
			data,
			depth: 1,
		});

		updateTag("appointments");

		pusherServer.trigger(
			`appointment-${appointment.id}`,
			`appointment-${appointment.id}-updated`,
			appointment
		);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteAppointment = async (id: string) => {
	try {
		await payload.delete({
			collection: "appointments",
			id,
		});

		updateTag("appointments");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */
export const getAppointments = cache(
	async ({
		patient,
		doctor,
		type,
		status,
		page,
		limit,
	}: {
		patient?: string;
		doctor?: string;
		type?: eAppointmentTypes;
		status?: eAppointmentStatus;
		page?: number;
		limit?: number;
	}) => {
		try {
			const {
				docs: appointments,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "appointments",
				where: {
					or: [
						{ doctor: { equals: doctor } },
						{ patient: { equals: patient } },
						{ type: { equals: type } },
						{ status: { equals: status } },
					],
				},
				page,
				limit,
			});

			return { appointments, hasNextPage, nextPage };
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		revalidate: 15 * 60,
		tags: ["appointments"],
	}
);

export const getAppointment = cache(
	async (id: string): Promise<IAppointment> => {
		try {
			return await payload.findByID({
				collection: "appointments",
				id,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["appointments"],
		revalidate: 15 * 60,
	}
);
