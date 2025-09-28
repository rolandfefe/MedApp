import z from "zod";
import { eGender, eMaritalStatus } from "@/types/enums";

// Emergency Contact Schema
const emergencyContactSchema = z.object({
	name: z.string().min(1, "Emergency contact name is required"),
	relationship: z.string().min(1, "Relationship is required"),
	phone: z.string().min(1, "Phone number is required"),
	priority: z.enum(["1", "2", "3"]).default("1"),
});

// Main Patient Form Schema
export const patientZodSchema = z.object({
	DOB: z.string(),
	gender: z.nativeEnum(eGender),
	maritalStatus: z.nativeEnum(eMaritalStatus).optional(),
	occupation: z.string().optional(),
	race: z.string().optional(),
	languages: z.string().optional(),
	emergencyContacts: z.array(emergencyContactSchema).default([]),
});

// Partial update schema
export const patientUpdateSchema = patientZodSchema.partial();

// Create schema (you might want to omit certain fields for creation)
export const patientCreateSchema = patientZodSchema;

// Strict create schema (if you want to require certain fields for creation)
export const patientStrictCreateSchema = patientZodSchema
	.pick({
		DOB: true,
		gender: true,
	})
	.extend({
		maritalStatus: patientZodSchema.shape.maritalStatus.optional(),
		occupation: patientZodSchema.shape.occupation.optional(),
		race: patientZodSchema.shape.race.optional(),
		languages: patientZodSchema.shape.languages,
		emergencyContacts: patientZodSchema.shape.emergencyContacts,
	});

// Type inference
export type PatientFormData = z.infer<typeof patientZodSchema>;
export type PatientUpdateData = z.infer<typeof patientUpdateSchema>;
export type PatientCreateData = z.infer<typeof patientCreateSchema>;

// Individual schemas for modular use
export { emergencyContactSchema };

// Optional: Schema for adding/updating emergency contacts
export const emergencyContactFormSchema = z.object({
	emergencyContacts: z
		.array(emergencyContactSchema)
		.min(1, "At least one emergency contact is required"),
});

export type EmergencyContactFormData = z.infer<
	typeof emergencyContactFormSchema
>;
