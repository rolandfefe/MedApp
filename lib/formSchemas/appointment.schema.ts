import { z } from "zod";
import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums";

// Confirmation Schema
const confirmationSchema = z.object({
	isConfirmed: z.boolean().default(false),
	confirmedAt: z.coerce.date().optional(),
});

// Cancellation Schema
const cancellationSchema = z.object({
	cancelledAt: z.coerce.date(),
	reason: z.string().min(1, "Cancellation reason is required"),
});

// Main Appointment Form Schema
export const appointmentFormSchema = z
	.object({
		reason: z.string().min(1, "Appointment reason is required"),
		type: z.nativeEnum(eAppointmentTypes),
		cancellation: cancellationSchema.optional(),
		startTime: z.coerce
			.date()
			.refine((date) => date > new Date(), "Start time must be in the future")
			.optional(),
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

// Individual type exports
export type Confirmation = z.infer<typeof confirmationSchema>;
export type Cancellation = z.infer<typeof cancellationSchema>;

// Validation helpers
export const validateAppointmentTime = (startTime: Date, endTime?: Date) => {
	if (!endTime) return true;
	return endTime > startTime;
};

export const isAppointmentInFuture = (date: Date) => {
	return date > new Date();
};
