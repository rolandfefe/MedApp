import { z } from "zod";

export const referralSchema = z.object({
	reason: z.string().min(1, "Referral reason is required"),
});

export type ReferralFormData = z.infer<
	typeof referralSchema
>;
