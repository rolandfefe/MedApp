"use server";

import { updateTag, unstable_cache as cache } from "next/cache";
import diagnosisModel from "../db/models/diagnosis.model";
import { eDiagnosisStatus } from "@/types/enums/enums";
import { getPayload } from "payload";
import config from "@/payload.config";

const payload = await getPayload({ config });

/**
 * @Mutation
 */

export const createDiagnosis = async (data: IDiagnosis) => {
	try {
		await payload.create({
			collection: "diagnoses",
			data,
		});

		updateTag("diagnoses");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateDiagnosis = async (data: IDiagnosis) => {
	try {
		await payload.update({
			collection: "diagnoses",
			id: data.id,
			data,
		});
		updateTag("diagnoses");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * ! DANGER ZONE
 * @danger Restrict access to users who can use this action.
 */
export const deleteDiagnosis = async (id: string) => {
	try {
		await payload.delete({
			collection: "diagnoses",
			id,
		});
		updateTag("diagnoses");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */

export const getDiagnosis = cache(
	async ({
		appointment,
		id,
	}: {
		appointment?: string;
		id?: string;
	}): Promise<IDiagnosis> => {
		try {
			const { docs: [diagnosis] } = await payload.find({
				collection: "diagnoses",
				where: {
					or: [
						{ id: { equals: id } },
						{ appointment: { equals: appointment } },
					],
				},
				limit: 1,
				depth: 2
			});

			return diagnosis;
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["diagnoses"],
		revalidate: 15 * 60,
	}
);

export const getDiagnoses = async ({
	patient,
	doctor,
	status,
	page = 1,
	limit,
}: {
	patient?: string;
	doctor?: string;
	status?: eDiagnosisStatus;
	page?: number;
	limit?: number;
}): Promise<{ diagnoses: IDiagnosis[]; nextPg: number }> => {
	try {
		const {
			docs: diagnoses,
			hasNextPage,
			nextPage,
		} = await payload.find({
			collection: "diagnoses",
			where: {
				or: [
					{ patient: { equals: patient } },
					{ doctor: { equals: doctor } },
					{ status: { equals: status } },
				],
			},
			page,
			limit,
		});

		return { diagnoses, nextPg: hasNextPage ? nextPage! : page };
	} catch (error: any) {
		throw new Error(error);
	}
};
