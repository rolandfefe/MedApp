import { z } from "zod";
import { eRecurrenceFrequency, eWeekDays } from "@/types/enums/enums";

// Recurrence Plan Zod Schema
export const recurrencePlanFormSchema = z
	.object({
		supervisor: z.string().min(1, "Supervisor is required"),
		name: z.string().min(1, "Name is required").trim(),
		frequency: z.nativeEnum(eRecurrenceFrequency, {
			required_error: "Frequency is required",
		}),
		interval: z
			.number()
			.int("Interval must be a whole number")
			.positive("Interval must be positive")
			.min(1, "Interval must be at least 1"),
		startDate: z.coerce.date({
			required_error: "Start date is required",
		}),
		endDate: z.coerce.date().optional(),

		// Time range
		startTime: z.coerce.date({
			required_error: "Start time is required",
		}),
		endTime: z.coerce.date().optional(),

		// Exceptions and week days
		exceptions: z.array(z.coerce.date()).default([]),
		weekDays: z.array(z.nativeEnum(eWeekDays)).default([]),
	})
	.refine(
		(data) => {
			if (!data.endDate) return true;
			return data.endDate >= data.startDate;
		},
		{
			message: "End date cannot be before start date",
			path: ["endDate"],
		}
	)
	.refine(
		(data) => {
			if (!data.endTime) return true;
			return data.endTime > data.startTime;
		},
		{
			message: "End time must be after start time",
			path: ["endTime"],
		}
	)
	.refine(
		(data) => {
			// For weekly frequency, at least one week day must be selected
			if (data.frequency === eRecurrenceFrequency.WEEKLY) {
				return data.weekDays.length > 0;
			}
			return true;
		},
		{
			message: "At least one week day must be selected for weekly frequency",
			path: ["weekDays"],
		}
	)
	.refine(
		(data) => {
			// For daily frequency, weekDays should be empty
			if (
				data.frequency === eRecurrenceFrequency.DAILY &&
				data.weekDays.length > 0
			) {
				return false;
			}
			return true;
		},
		{
			message: "Week days should not be selected for daily frequency",
			path: ["weekDays"],
		}
	);

// Type exports
export type RecurrencePlanFormData = z.infer<typeof recurrencePlanFormSchema>;

// Utility function to get default week days based on frequency
export const getDefaultWeekDays = (
	frequency: eRecurrenceFrequency
): eWeekDays[] => {
	if (frequency === eRecurrenceFrequency.WEEKLY) {
		return [eWeekDays.MONDAY, eWeekDays.WEDNESDAY, eWeekDays.FRIDAY];
	}
	return [];
};

// Validation for specific frequency types
export const validateRecurrencePlan = (data: RecurrencePlanFormData) => {
	const validations: string[] = [];

	// Monthly frequency validation
	if (data.frequency === eRecurrenceFrequency.MONTHLY && data.interval > 31) {
		validations.push("Monthly interval cannot exceed 31");
	}

	return validations;
};
