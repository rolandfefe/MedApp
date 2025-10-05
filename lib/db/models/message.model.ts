import { eMessageStatus } from "@/types/enums/enums";
import { model, models, Schema } from "mongoose";

const messageSchema = new Schema<IMessage>(
	{
		appointment: {
			type: Schema.Types.ObjectId,
			ref: "Appointment",
			required: true,
			unique: true,
			immutable: true,
		},
		body: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: eMessageStatus,
			default: eMessageStatus.SENT,
		},
		refMessage: {
			type: Schema.Types.ObjectId,
			ref: "Message",
		},
		from: {
			type: Schema.Types.ObjectId,
			ref: "User",
			immutable: true,
		},
	},
	{ timestamps: true }
);

export default models?.Message || model<IMessage>("Message", messageSchema);
