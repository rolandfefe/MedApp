import { model, models, Schema } from "mongoose";

const recurrencePlanSchema = new Schema<IRecurrencePlan>(
	{},
	{ timestamps: true }
);

export default models?.RecurrencePlan ||
	model<IRecurrencePlan>("RecurrencePlan", recurrencePlanSchema);
