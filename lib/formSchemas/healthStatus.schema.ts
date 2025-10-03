import { z } from "zod";
import { ePainType, eTenScale } from "@/types/enums";

// Vitals Schema
const vitalsSchema = z.object({
	bloodPressure: z.string().optional(),
	heartRate: z.string().optional(),
	temperature: z.string().optional(),
	respiratoryRate: z.string().optional(),
	oxygenSaturation: z.string().optional(),
	height: z.string().optional(),
	weight: z.string().optional(),
	bmi: z.string().optional(),
});

// Symptom Schema
const symptomSchema = z.object({
	description: z.string().min(1, "Symptom description is required"),
	severity: z.nativeEnum(eTenScale),
	duration: z.string().optional(),
	onset: z.string(),
});

// Pain Schema
const painSchema = z.object({
	location: z.string().min(1, "Pain location is required"),
	intensity: z.nativeEnum(eTenScale),
	type: z.nativeEnum(ePainType),
	aggravatingFactors: z.string().optional(),
	relievingFactors: z.string().optional(),
});

// Main HealthStatus Form Schema
export const healthStatusFormSchema = z.object({
	vitals: vitalsSchema,
	complaint: z.string().optional(),
	symptoms: z.array(symptomSchema).default([]),
	pain: z.array(painSchema).default([]),
});

// Partial update schema
export const healthStatusUpdateSchema = healthStatusFormSchema.partial();

// Individual section schemas for modular forms
export const vitalsFormSchema = z.object({
	vitals: vitalsSchema,
});

export const symptomsFormSchema = z.object({
	symptoms: z.array(symptomSchema),
});

export const painFormSchema = z.object({
	pain: z.array(painSchema),
});

// Type inference
export type HealthStatusFormData = z.infer<typeof healthStatusFormSchema>;
export type HealthStatusUpdateData = z.infer<typeof healthStatusUpdateSchema>;
export type VitalsFormData = z.infer<typeof vitalsFormSchema>;
export type SymptomsFormData = z.infer<typeof symptomsFormSchema>;
export type PainFormData = z.infer<typeof painFormSchema>;

// Individual type exports
export type Vitals = z.infer<typeof vitalsSchema>;
export type Symptom = z.infer<typeof symptomSchema>;
export type Pain = z.infer<typeof painSchema>;

// Default values
export const defaultVitals: Vitals = {
	bloodPressure: "",
	heartRate: "",
	temperature: "",
	respiratoryRate: "",
	oxygenSaturation: "",
	height: "",
	weight: "",
	bmi: "",
};

// Enhanced vitals schema with numeric validation (optional)
export const numericVitalsSchema = vitalsSchema.extend({
	bloodPressure: z
		.string()
		.regex(/^\d{1,3}\/\d{1,3}$/, "Blood pressure should be in format 120/80")
		.optional(),
	heartRate: z
		.string()
		.regex(/^\d+$/, "Heart rate should be a number")
		.optional(),
	temperature: z
		.string()
		.regex(/^\d+(\.\d+)?$/, "Temperature should be a number")
		.optional(),
	respiratoryRate: z
		.string()
		.regex(/^\d+$/, "Respiratory rate should be a number")
		.optional(),
	oxygenSaturation: z
		.string()
		.regex(/^\d+%?$/, "Oxygen saturation should be a number or percentage")
		.optional(),
	height: z
		.string()
		.regex(/^\d+(\.\d+)?$/, "Height should be a number")
		.optional(),
	weight: z
		.string()
		.regex(/^\d+(\.\d+)?$/, "Weight should be a number")
		.optional(),
	bmi: z
		.string()
		.regex(/^\d+(\.\d+)?$/, "BMI should be a number")
		.optional(),
});

export type NumericVitals = z.infer<typeof numericVitalsSchema>;

// Empty symptom template for forms
export const emptySymptom: Symptom = {
	description: "",
	severity: eTenScale.ZERO, // or whatever default you prefer
	duration: "",
	onSet: new Date(),
};

// Empty pain template for forms
export const emptyPain: Pain = {
	location: "",
	intensity: eTenScale.ZERO, // or whatever default you prefer
	type: Object.values(ePainType)[0], // first enum value as default
	aggravatingFactors: [],
	relievingFactors: [],
};
