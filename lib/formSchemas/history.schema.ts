import { z } from "zod";
import { eAllergySeverity, eLifeStyleStatus } from "@/types/enums";

// Helper schema for ObjectId validation
const objectIdSchema = z
	.string()
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

// Allergy Schema
const allergySchema = z.object({
	substance: z.string().min(1, "Substance is required"),
	reaction: z.string().min(1, "Reaction description is required"),
	severity: z.nativeEnum(eAllergySeverity),
	onsetDate: z.date().optional().nullable(),
	lastReactionDate: z.date().optional().nullable(),
});

// Smoking History Schema
const smokingHistorySchema = z.object({
	status: z.nativeEnum(eLifeStyleStatus),
	years: z.number().int().nonnegative().optional().nullable(),
	quitDate: z.date().optional().nullable(),
	lastUse: z.date().optional().nullable(),
});

// Alcohol History Schema
const alcoholHistorySchema = z.object({
	status: z.nativeEnum(eLifeStyleStatus),
	years: z.number().int().nonnegative().optional().nullable(),
	quitDate: z.date().optional().nullable(),
	lastUse: z.date().optional().nullable(),
});

// Substance Use History Schema
const substanceUseHistorySchema = z.object({
	substances: z
		.array(z.string().min(1, "Substance name is required"))
		.default([]),
	status: z.nativeEnum(eLifeStyleStatus),
	quitDate: z.date().optional().nullable(),
	lastUse: z.date().optional().nullable(),
});

// Social History Schema
const socialHistorySchema = z.object({
	smoking: smokingHistorySchema,
	alcohol: alcoholHistorySchema,
	substanceUse: substanceUseHistorySchema,
});

// Disease History Schema
const diseaseHistorySchema = z.object({
	name: z.string().min(1, "Condition name is required"),
	diagnosisDate: z.date(),
	resolved: z.boolean(),
	resolutionDate: z.date().optional().nullable(),
});

// Surgical History Schema
const surgicalHistorySchema = z.object({
	procedure: z.string().min(1, "Procedure name is required"),
	date: z.date(), // Fixed typo from 'data' to 'date'
	facility: z.string().min(1, "Facility name is required"),
});

// Family History Schema
const familyHistorySchema = z.object({
	condition: z.string().min(1, "Condition name is required"),
	relation: z.string().min(1, "Relation is required"),
	notes: z.string().optional(),
});

// Main History Form Schema
export const historyFormSchema = z.object({
	patient: objectIdSchema,
	diseaseHistory: z.array(diseaseHistorySchema).default([]),
	surgicalHistory: z.array(surgicalHistorySchema).default([]),
	familyHistory: z.array(familyHistorySchema).default([]),
	allergies: z.array(allergySchema).default([]),
	socialHistory: socialHistorySchema.optional().nullable(),
	exercise: z.string().optional(),
	diet: z.string().optional(),
});

// Partial update schema
export const historyUpdateSchema = historyFormSchema.partial();

// Create schema
export const historyCreateSchema = historyFormSchema
	.omit({
		patient: true, // Patient might be set from context
	})
	.extend({
		patient: objectIdSchema.optional(), // Or keep it optional if set elsewhere
	});

// Individual section schemas for modular forms
export const allergyFormSchema = z.object({
	allergies: z.array(allergySchema),
});

export const socialHistoryFormSchema = z.object({
	socialHistory: socialHistorySchema,
});

export const diseaseHistoryFormSchema = z.object({
	diseaseHistory: z.array(diseaseHistorySchema),
});

export const surgicalHistoryFormSchema = z.object({
	surgicalHistory: z.array(surgicalHistorySchema),
});

export const familyHistoryFormSchema = z.object({
	familyHistory: z.array(familyHistorySchema),
});

// Type inference
export type HistoryFormData = z.infer<typeof historyFormSchema>;
export type HistoryUpdateData = z.infer<typeof historyUpdateSchema>;
export type HistoryCreateData = z.infer<typeof historyCreateSchema>;

export type AllergyFormData = z.infer<typeof allergyFormSchema>;
export type SocialHistoryFormData = z.infer<typeof socialHistoryFormSchema>;
export type DiseaseHistoryFormData = z.infer<typeof diseaseHistoryFormSchema>;
export type SurgicalHistoryFormData = z.infer<typeof surgicalHistoryFormSchema>;
export type FamilyHistoryFormData = z.infer<typeof familyHistoryFormSchema>;

// Individual type exports
export type Allergy = z.infer<typeof allergySchema>;
export type SocialHistory = z.infer<typeof socialHistorySchema>;
export type DiseaseHistory = z.infer<typeof diseaseHistorySchema>;
export type SurgicalHistory = z.infer<typeof surgicalHistorySchema>;
export type FamilyHistory = z.infer<typeof familyHistorySchema>;

// Default values for social history
export const defaultSocialHistory: SocialHistory = {
	smoking: {
		status: eLifeStyleStatus.NEVER,
	},
	alcohol: {
		status: eLifeStyleStatus.NEVER,
	},
	substanceUse: {
		substances: [],
		status: eLifeStyleStatus.NEVER,
	},
};
