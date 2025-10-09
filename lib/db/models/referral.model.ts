import { eReferralStatus } from "@/types/enums/enums";
import { model, models, Schema } from "mongoose";

const referralSchema = new Schema<IReferral>(
	{
		appointment: {
			type: Schema.Types.ObjectId,
			ref: "Appointment",
			required: true,
		},
		from: { type: Schema.Types.ObjectId, ref: "Doctor" },
		to: { type: Schema.Types.ObjectId, ref: "Doctor" },
		reason: { type: String, required: true, trim: true },
		status: {
			type: String,
			enum: eReferralStatus,
			default: eReferralStatus.PENDING,
		},
	},
	{ timestamps: true }
);

export default models?.Referral || model<IReferral>("Referral", referralSchema);
