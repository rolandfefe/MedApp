import { z } from "zod";
import {
	eConfidenceLevel,
	eDiagnosisStatus,
	eLaterality,
	eSeverity,
} from "@/types/enums/enums";

// Differential Diagnosis Zod Schema
export const differentialDiagnosisFormSchema = z.object({
	// Diagnosis information
	condition: z.string().min(1, "Condition is required").trim(),
	icd10Code: z
		.string()
		.regex(/^[A-Za-z0-9.-]*$/, "Please enter a valid ICD-10 code")
		.optional()
		.or(z.literal("")),
	reasoning: z.string().optional().or(z.literal("")),

	// Confidence level enum
	confidence: z.nativeEnum(eConfidenceLevel, {
		required_error: "Confidence level is required",
	}),
	severity: z.nativeEnum(eSeverity),

	laterality: z.nativeEnum(eLaterality).optional(),
	stage: z.string().optional().or(z.literal("")),

	isPrimary: z.boolean().default(false),
});

export const diagnosisFormSchema = z
	.object({
		templateUsed: z.string().optional().or(z.literal("")),
		onsetDate: z.string({
			required_error: "Onset date is required",
		}),
		dateResolved: z.string().optional(),
		differentialDiagnosis: z
			.array(differentialDiagnosisFormSchema)
			.min(1, "At least one differential diagnosis is required"),
	})
	.refine(
		(data) => {
			if (!data.dateResolved) return true;
			return new Date(data.dateResolved) >= new Date(data.onsetDate);
		},
		{
			message: "Date resolved cannot be before onset date",
			path: ["dateResolved"],
		}
	)
	.refine(
		(data) => {
			const primaryDiagnoses = data.differentialDiagnosis.filter(
				(dx) => dx.isPrimary
			);
			return primaryDiagnoses.length === 1;
		},
		{
			message: "Exactly one differential diagnosis must be marked as primary",
			path: ["differentialDiagnosis"],
		}
	);

// Type exports
export type DifferentialDiagnosisFormData = z.infer<
	typeof differentialDiagnosisFormSchema
>;
export type DiagnosisFormData = z.infer<typeof diagnosisFormSchema>;
