"use server";

import { NestedMiddlewareError } from "next/dist/build/utils";
import { connectDb } from "../db/db";
import messageModel from "../db/models/message.model";
import { revalidatePath } from "next/cache";

export const createMsg = async (msg: IMessage, pathname: string) => {
	try {
		await connectDb();

		const newMsg = await (await messageModel.create(msg)).populate(["from"]);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getMsgsByAppointments = async ({
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
