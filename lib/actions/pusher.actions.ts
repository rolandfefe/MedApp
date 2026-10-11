"use server";

import { pusherServer } from "@/lib/pusher/pusher.server"


const CreateConsultationChannel = async () => {
	try {
    await pusherServer.trigger({})

	} catch (error:any) {}
};
