"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import messageModel from "../db/models/message.model";
import { pusherServer } from "../pusher";

export const createMsg = async (msg: IMessage) => {
	try {
		await connectDb();

		const newMsg = await (await messageModel.create(msg)).populate(["from"]);

		// ? 1. Pusher trigger.
		await pusherServer.trigger(
			`chat-${msg.appointment}-channel`,
			`new-${msg.appointment}-msg`,
			JSON.parse(JSON.stringify(newMsg))
		);

		// revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getMsgsByAppointment = async ({
	appointment,
}: {
	appointment: string;
}): Promise<IMessage[]> => {
	try {
		await connectDb();

		const msgs = await messageModel.find({ appointment }).populate(["from"]);

		return JSON.parse(JSON.stringify(msgs));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateMsg = async (msg: IMessage, pathname: string) => {
	try {
		await connectDb();

		await messageModel.findByIdAndUpdate(msg._id, msg);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteMsg = async (id: string, pathname: string) => {
	try {
		await connectDb();

		await messageModel.findByIdAndDelete(id);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
