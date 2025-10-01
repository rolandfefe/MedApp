import { z } from "zod";
import { eAllergySeverity, eLifeStyleStatus } from "@/types/enums";

// Allergy Schema
const allergySchema = z.object({
	substance: z.string().min(1, "Substance is required"),
	reaction: z.string().min(1, "Reaction description is required"),
	severity: z.nativeEnum(eAllergySeverity),
	onsetDate: z.string().optional(),
	lastReactionDate: z.string().optional(),
});

// Smoking History Schema
const smokingHistorySchema = z.object({
	status: z.nativeEnum(eLifeStyleStatus),
	years: z.coerce.number().int().nonnegative().optional(),
	quitDate: z.string().optional(),
	lastUse: z.string().optional(),
});

// Alcohol History Schema
const alcoholHistorySchema = z.object({
	status: z.nativeEnum(eLifeStyleStatus),
	years: z.coerce.number().int().nonnegative().optional(),
	quitDate: z.string().optional(),
	lastUse: z.string().optional(),
});

// Substance Use History Schema
const substanceUseHistorySchema = z.object({
	substances: z.string().min(1, "Substance name is required"),
	status: z.nativeEnum(eLifeStyleStatus),
	quitDate: z.string().optional(),
	lastUse: z.string().optional(),
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
	diagnosisDate: z.string(),
	resolved: z.boolean(),
	resolutionDate: z.string().optional(),
});

// Surgical History Schema
const surgicalHistorySchema = z.object({
	procedure: z.string().min(1, "Procedure name is required"),
	date: z.string(),
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
	diseaseHistory: z.array(diseaseHistorySchema).default([]),
	surgicalHistory: z.array(surgicalHistorySchema).default([]),
	familyHistory: z.array(familyHistorySchema).default([]),
	allergies: z.array(allergySchema).default([]),
	socialHistory: socialHistorySchema.optional(),
	exercise: z.string().optional(),
	diet: z.string().optional(),
	notes: z.string().optional(),
});

// Partial update schema
export const historyUpdateSchema = historyFormSchema.partial();

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

export type AllergyFormData = z.infer<typeof allergyFormSchema>;
export type SocialHistoryFormData = z.infer<typeof socialHistoryFormSchema>;
export type DiseaseHistoryFormData = z.infer<typeof diseaseHistoryFormSchema>;
export type SurgicalHistoryFormData = z.infer<typeof surgicalHistoryFormSchema>;
export type FamilyHistoryFormData = z.infer<typeof familyHistoryFormSchema>;
