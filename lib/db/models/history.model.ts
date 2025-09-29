import { model, models, Schema } from "mongoose";

const historySchema = new Schema<IHistory>(
	{
		patient: {
			type: Schema.Types.ObjectId,
			ref: "Patient",
			required: true,
			immutable: true,
		},
		// smoking: {
		//   status:
		// }
	},
	{ timestamps: true }
);

export default models?.History || model("History", historySchema);
