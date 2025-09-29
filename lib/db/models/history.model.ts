import { eAllergySeverity, eLifeStyleStatus } from "@/types/enums";
import { IAllergy, ISocialHistory } from "@/types/history";
import { model, models, Schema } from "mongoose";

const allergySchema = new Schema<IAllergy>({
	substance: { type: String, required: true },
	reaction: { type: String, required: true },
	severity: { type: String, enum: eAllergySeverity, required: true },
	onsetDate: Date,
	lastReactionDate: Date,
});

const socialHistorySchema = new Schema<ISocialHistory>({
	smoking: {
		status: { type: String, enum: eLifeStyleStatus, required: true },
		years: Number,
		quitDate: Date,
		lastUse: Date,
	},
	alcohol: {
		status: { type: String, enum: eLifeStyleStatus, required: true },
		years: Number,
		quitDate: Date,
		lastUse: Date,
	},
	substanceUse: {
		substances: [{ type: String, required: true }],
		status: { type: String, enum: eLifeStyleStatus, required: true },
		quitDate: Date,
		lastUse: Date,
	},
});

const historySchema = new Schema<IHistory>(
	{
		patient: {
			type: Schema.Types.ObjectId,
			ref: "Patient",
			required: true,
			immutable: true,
			unique: true, // ! Patient can only have one History.
		},
		diseaseHistory: [
			{
				name: { type: String, required: true },
				diagnosisDate: { type: Date, required: true },
				resolved: { type: Boolean, required: true },
				resolutionDate: Date,
			},
		],
		surgicalHistory: [
			{
				procedure: { type: String, required: true },
				date: { type: Date, required: true },
				facility: { type: String, required: true },
			},
		],
		familyHistory: [
			{
				condition: { type: String, required: true },
				relation: { type: String, required: true },
				notes: String,
			},
		],
		allergies: [allergySchema],
		socialHistory: socialHistorySchema,
		exercise: String,
		diet: String,
	},
	{ timestamps: true }
);

export default models?.History || model<IHistory>("History", historySchema);
