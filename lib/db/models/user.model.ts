import { model, models, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
	{
		clerkId: {
			type: String,
			unique: true,
			required: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
		},
		fname: {
			type: String,
			required: true,
		},
		lname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		imageUrl: String,
	},
	{ timestamps: true }
);


export default models.User || model<IUser>("User", userSchema)