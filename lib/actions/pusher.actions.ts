"use server";

import { pusherServer } from "@/lib/pusher/pusher.server";

const CreateConsultationChannel = async () => {
	try {
		await pusherServer.trigger({});
	} catch (error: any) {}
};

export const confirmedAppointment = async () => {
	try {
		await pusherServer.trigger(`appointment-${}`)
	} catch (error: any) {
		throw new Error(error)
	}
}

// export const pusherAction = async (channel: string, ) => {
// 	try {
// 		await pusherServer.trigger(`appointment-${}`, )
// 	} catch (error: any) {
// 		throw new Error(error)
// 	}
// }