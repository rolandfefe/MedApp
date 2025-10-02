import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums";
import { model, models, Schema } from "mongoose";

const appointmentSchema = new Schema<IAppointment>(
	{
		patient: {
			type: Schema.Types.ObjectId,
			ref: "Patient",
			required: true,
		},
		doctor: {
			type: Schema.Types.ObjectId,
			ref: "Doctor",
			// required: true
		},
		diagnosis: {
			type: Schema.Types.ObjectId,
			ref: "Diagnosis",
			// required: true
		},
		healthStatus: {
			type: Schema.Types.ObjectId,
			ref: "HealthStatus",
			required: true,
		},
		// recurrencePlan: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: "RecurrencePlan",
		// 	// required: true
		// },
		referral: {
			type: Schema.Types.ObjectId,
			ref: "Referral",
			unique: true, // ! one-referral && one-appointment
		},
		reminders: [
			{
				type: Schema.Types.ObjectId,
				ref: "Reminder",
			},
		],

		reason: {
			type: String,
			required: true,
		},
		followUpInstructions: String,

		type: {
			type: String,
			enum: eAppointmentTypes,
			required: true,
		},
		status: {
			type: String,
			enum: eAppointmentStatus,
			default: eAppointmentStatus.SCHEDULED,
		},
		confirmation: {
			isConfirmed: { type: Boolean, default: false },
			confirmedAt: Date,
			confirmedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
		},
		cancellation: {
			cancelledAt: Date,
			cancelledBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
			reason: { type: String, required: true },
		},

		startTime: Date,
		endTime: Date,
	},
	{ timestamps: true }
);

export default models?.Appointment ||
	model<IAppointment>("Appointment", appointmentSchema);
