import {
	eAppointmentStatus,
	eAppointmentTypes,
	ePatientConsent,
} from "@/types/enums/enums";
import z from "zod";

const onlineFormSchema = z.object({
	url: z.string().url("Invalid url"),
	accessCode: z.string().optional(),
});

// Main Appointment Form Schema
export const appointmentFormSchema = z
	.object({
		reason: z.string().min(1, "Appointment reason is required"),
		type: z.nativeEnum(eAppointmentTypes),
		startTime: z.coerce
			.string()
			.refine(
				(date) => new Date(date) > new Date(),
				"Start time must be in the future"
			)
			.optional(),
		endTime: z.coerce.string().optional(),
		online: onlineFormSchema.optional(),
		isEmergency: z.boolean().optional(),
		consentLevels: z
			.nativeEnum(ePatientConsent)
			.default(ePatientConsent.HEALTH_STATUSES),
	})
	.refine(
		(data) => {
			if (data.startTime && data.endTime) {
				return new Date(data.endTime) > new Date(data.startTime);
			}
			return true;
		},
		{
			message: "End time must be after start time",
			path: ["endTime"],
		}
	);

export const appointmentNotesFormSchema = z.object({
	patientNotes: z.string().optional(),
	doctorNotes: z.string().optional(),
	followUpInstructions: z.string().optional(),
});

export const appointmentOnlineSchema = z.object({
	url: z.string().url("Invalid url"),
	accessCode: z.string().optional(),
});

// Schema for scheduling an appointment
export const appointmentScheduleSchema = z
	.object({
		reason: z.string().min(1, "Appointment reason is required"),
		type: z.nativeEnum(eAppointmentTypes),
		startTime: z.coerce
			.date()
			.refine((date) => date > new Date(), "Start time must be in the future"),
		endTime: z.coerce.date().optional(),
	})
	.refine(
		(data) => {
			if (data.startTime && data.endTime) {
				return data.endTime > data.startTime;
			}
			return true;
		},
		{
			message: "End time must be after start time",
			path: ["endTime"],
		}
	);

// Schema for updating appointment status
export const appointmentStatusUpdateSchema = z.object({
	status: z.nativeEnum(eAppointmentStatus),
});

// Schema for rescheduling an appointment
export const appointmentRescheduleSchema = z
	.object({
		startTime: z.coerce
			.date()
			.refine((date) => date > new Date(), "Start time must be in the future"),
		endTime: z.coerce.date().optional(),
	})
	.refine(
		(data) => {
			if (data.startTime && data.endTime) {
				return data.endTime > data.startTime;
			}
			return true;
		},
		{
			message: "End time must be after start time",
			path: ["endTime"],
		}
	);

// Type inference
export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;
export type AppointmentScheduleData = z.infer<typeof appointmentScheduleSchema>;
export type AppointmentStatusUpdateData = z.infer<
	typeof appointmentStatusUpdateSchema
>;
export type AppointmentRescheduleData = z.infer<
	typeof appointmentRescheduleSchema
>;
export type appointmentNotesFormData = z.infer<
	typeof appointmentNotesFormSchema
>;
export type appointmentOnlineFormData = z.infer<typeof appointmentOnlineSchema>;

// Validation helpers
export const validateAppointmentTime = (startTime: Date, endTime?: Date) => {
	if (!endTime) return true;
	return endTime > startTime;
};

export const isAppointmentInFuture = (date: Date) => {
	return date > new Date();
};
