"use server";

import { pusherServer } from "../pusher";

const CreateConsultationChannel = async () => {
	try {
    await pusherServer.trigger({})

	} catch (error:any) {}
};
