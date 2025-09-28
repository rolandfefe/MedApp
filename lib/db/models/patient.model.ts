import { eGender, eMaritalStatus } from "@/types/enums";
import { model, models, Schema } from "mongoose";

const patientSchema = new Schema<IPatient>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			immutable: true,
		},
		DOB: {
			type: Date,
			required: true,
		},
		gender: {
			type: String,
			enum: eGender,
			required: true,
		},
		maritalStatus: {
			type: String,
			enum: eMaritalStatus,
		},
		occupation: String,
		race: String,
		languages: [String],
		emergencyContacts: [
			{
				name: { type: String, required: true },
				relationship: { type: String, required: true },
				phone: { type: String, required: true },
				priority: { type: String, enum: ["1", "2", "3"], default: "1" },
			},
		],
	},
	{ timestamps: true }
);

export default models.Patient || model<IPatient>("Patient", patientSchema);
