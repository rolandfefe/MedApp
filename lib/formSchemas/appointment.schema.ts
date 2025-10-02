import { z } from "zod";
import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums";

// Helper schema for ObjectId validation
const objectIdSchema = z
	.string()
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

// Confirmation Schema
const confirmationSchema = z.object({
	isConfirmed: z.boolean().default(false),
	confirmedAt: z.coerce.date().optional(),
	confirmedBy: objectIdSchema,
});

// Cancellation Schema
const cancellationSchema = z.object({
	cancelledAt: z.coerce.date(),
	cancelledBy: objectIdSchema,
	reason: z.string().min(1, "Cancellation reason is required"),
});

// Main Appointment Form Schema
export const appointmentFormSchema = z
	.object({
		patient: objectIdSchema,
		doctor: objectIdSchema.optional(),
		diagnosis: objectIdSchema.optional(),
		healthStatus: objectIdSchema,
		recurrencePlan: objectIdSchema.optional(),
		referral: objectIdSchema.optional(),
		reminders: z.array(objectIdSchema).default([]),

		reason: z.string().min(1, "Appointment reason is required"),
		followUpInstructions: z.string().optional(),

		type: z.nativeEnum(eAppointmentTypes),
		status: z
			.nativeEnum(eAppointmentStatus)
			.default(eAppointmentStatus.SCHEDULED),

		confirmation: confirmationSchema.optional(),
		cancellation: cancellationSchema.optional(),

		startTime: z
			.coerce.date()
			.refine((date) => date > new Date(), "Start time must be in the future")
			.optional()
			.nullable(),
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

// Partial update schema
export const appointmentUpdateSchema = appointmentFormSchema.partial();

// Create schema (with relaxed requirements for references that might be set later)
export const appointmentCreateSchema = appointmentFormSchema
	.omit({
		diagnosis: true,
		recurrencePlan: true,
		referral: true,
		confirmation: true,
		cancellation: true,
	})
	.extend({
		diagnosis: objectIdSchema.optional(),
		recurrencePlan: objectIdSchema.optional(),
		referral: objectIdSchema.optional(),
		confirmation: confirmationSchema.optional(),
		cancellation: cancellationSchema.optional(),
	});

// Schema for scheduling an appointment
export const appointmentScheduleSchema = z
	.object({
		patient: objectIdSchema,
		doctor: objectIdSchema.optional(),
		healthStatus: objectIdSchema,
		reason: z.string().min(1, "Appointment reason is required"),
		type: z.nativeEnum(eAppointmentTypes),
		startTime: z
			.coerce.date()
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

// Schema for confirming an appointment
export const appointmentConfirmationSchema = z.object({
	confirmation: confirmationSchema
		.pick({
			confirmedBy: true,
		})
		.extend({
			isConfirmed: z.literal(true),
			confirmedAt: z.coerce.date().default(() => new Date()),
		}),
});

// Schema for cancelling an appointment
export const appointmentCancellationSchema = z.object({
	cancellation: cancellationSchema
		.pick({
			cancelledBy: true,
			reason: true,
		})
		.extend({
			cancelledAt: z.coerce.date().default(() => new Date()),
		}),
	status: z.literal(eAppointmentStatus.CANCELLED),
});

// Schema for updating appointment status
export const appointmentStatusUpdateSchema = z.object({
	status: z.nativeEnum(eAppointmentStatus),
});

// Schema for rescheduling an appointment
export const appointmentRescheduleSchema = z
	.object({
		startTime: z
			.coerce.date()
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
export type AppointmentUpdateData = z.infer<typeof appointmentUpdateSchema>;
export type AppointmentCreateData = z.infer<typeof appointmentCreateSchema>;
export type AppointmentScheduleData = z.infer<typeof appointmentScheduleSchema>;
export type AppointmentConfirmationData = z.infer<
	typeof appointmentConfirmationSchema
>;
export type AppointmentCancellationData = z.infer<
	typeof appointmentCancellationSchema
>;
export type AppointmentStatusUpdateData = z.infer<
	typeof appointmentStatusUpdateSchema
>;
export type AppointmentRescheduleData = z.infer<
	typeof appointmentRescheduleSchema
>;

// Individual type exports
export type Confirmation = z.infer<typeof confirmationSchema>;
export type Cancellation = z.infer<typeof cancellationSchema>;

// Default values
export const defaultConfirmation: Omit<Confirmation, "confirmedBy"> = {
	isConfirmed: false,
	confirmedAt: null,
};

export const defaultAppointmentForm: Partial<AppointmentFormData> = {
	reminders: [],
	status: eAppointmentStatus.SCHEDULED,
	confirmation: null,
	cancellation: null,
	followUpInstructions: "",
};

// Validation helpers
export const validateAppointmentTime = (startTime: Date, endTime?: Date) => {
	if (!endTime) return true;
	return endTime > startTime;
};

export const isAppointmentInFuture = (date: Date) => {
	return date > new Date();
};
