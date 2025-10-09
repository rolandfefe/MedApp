import {
	eAppointmentStatus,
	eAppointmentTypes,
	ePatientConsent,
} from "@/types/enums/enums";
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
		},
		healthStatus: {
			type: Schema.Types.ObjectId,
			ref: "HealthStatus",
			// required: true,
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
			confirmedBy: { type: Schema.Types.ObjectId, ref: "User" },
		},
		cancellation: {
			cancelledAt: Date,
			cancelledBy: { type: Schema.Types.ObjectId, ref: "User" },
			reason: { type: String },
		},

		startTime: Date,
		endTime: Date,

		// Consultation details
		patientNotes: String,
		doctorNotes: String,
		followUpInstructions: String,

		consentLevels: [
			{
				type: String,
				enum: ePatientConsent,
				default: ePatientConsent.HISTORY,
			},
		],
		isEmergency: { type: Boolean, default: false },
		imgs: [String],
		online: {
			url: { type: String },
			accessCode: String,
		},
	},
	{ timestamps: true }
);

export default models?.Appointment ||
	model<IAppointment>("Appointment", appointmentSchema);
