import { eRecurrenceFrequency, eWeekDays } from "@/types/enums/enums";
import { model, models, Schema } from "mongoose";

const recurrencePlanSchema = new Schema<IRecurrencePlan>(
	{
		supervisor: {
			type: Schema.Types.ObjectId,
			required: true,
			immutable: true,
		},
		name: { type: String, required: true },
		frequency: {
			type: String,
			enum: eRecurrenceFrequency,
			required: true,
		},
		interval: { type: Number, required: true },
		startDate: { type: Date, required: true },
		endDate: Date,
		startTime: { type: Date, required: true },
		endTime: Date,
		exceptions: [Date],
		weekDays: [{ type: String, enum: eWeekDays }],
	},
	{ timestamps: true }
);

export default models?.RecurrencePlan ||
	model<IRecurrencePlan>("RecurrencePlan", recurrencePlanSchema);
