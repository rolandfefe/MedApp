"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import referralModel from "../db/models/referral.model";
import { connect } from "http2";
import { eReferralStatus } from "@/types/enums/enums";

export const createReferral = async (
	referral: IReferral,
	pathname?: string
) => {
	try {
		await connectDb();

		await referralModel.create(referral);

		revalidatePath(pathname!);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getReferrals = async ({
	appointment,
	from,
	to,
}: {
	appointment?: string;
	from?: string;
	to?: string;
	status?: eReferralStatus;
}): Promise<IAppointment[]> => {
	try {
		await connectDb();

		const referrals = await referralModel
			.find()
			.or([{ appointment }, { from }, { to }, { status }])
			.populate([
				{ path: "from", populate: "user" },
				{ path: "to", populate: "user" },
			]);

		return JSON.parse(JSON.stringify(referrals));
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getReferral = async (id: string): Promise<IReferral> => {
	try {
		await connectDb();

		const referral = await referralModel.findById(id).populate([
			{ path: "from", populate: "user" },
			{ path: "to", populate: "user" },
		]);

		return JSON.parse(JSON.stringify(referral));
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const updateReferral = async (referral: IReferral, pathname: string) => {
	try {
		await connectDb();

		await referralModel.findByIdAndUpdate(referral._id, referral, {
			new: true,
		});

		// ? Conditionally trigger Real-time
		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteReferral = async (id: string, pathname: string) => {
	try {
		await connectDb();
		await referralModel.findByIdAndDelete(id);
		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error.message);
	}
};
