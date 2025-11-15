import { eRouteOfAdministration } from "@/types/enums/enums";
import { z } from "zod";

// Assuming eRouteOfAdministration is an enum, you can import or define it
// If you need to define it here:
// export const eRouteOfAdministration = {
//   ORAL: 'oral',
//   INTRAVENOUS: 'intravenous',
//   // ... other routes
// } as const;

// Base schemas for nested structures
const procedureSchema = z.object({
	name: z.string(),
	type: z.string().optional(),
	scheduledDate: z.string().optional(), // Date as string in ISO format
	// status: z.enum(["recommended", "scheduled", "completed"]).optional(),
});

const therapySchema = z.object({
	name: z.string(),
	type: z.string().optional(),
	frequency: z.string().optional(),
	duration: z.string().optional(),
});

const medicationSchema = z.object({
	name: z.string().min(1, "Name is required"),
	dosage: z.string().min(1, "Dosage is required"),
	route: z.nativeEnum(eRouteOfAdministration), // You might want to use z.enum() here with actual values

	instructions: z.string(),
	sideEffects: z.string().optional(),
	reason: z.string().optional(),
	
	// route: z.string().optional(), // You might want to use z.enum() here with actual values
	startDate: z.string().min(1, "Start date is required"), // Date as string
	endDate: z.string().optional(),
});

const treatmentPlanSchema = z.object({
	procedures: z.array(procedureSchema).optional(),
	therapies: z.array(therapySchema).optional(),
	medications: z
		.array(medicationSchema)
		.min(1, "At least one medication is required"),
});

const prognosisSchema = z.object({
	outlook: z.enum(["excellent", "good", "fair", "poor", "guarded"]).optional(),
	estimatedRecoveryTime: z.string().optional(),
});

// Main Verdict schema
export const VerdictZodSchema = z.object({
	prognosis: prognosisSchema.optional(),
	isConfirmed: z.boolean().default(false),
	treatmentPlan: treatmentPlanSchema.optional(),
});

// Type inference
export type VerdictFormData = z.infer<typeof VerdictZodSchema>;
export type Procedure = z.infer<typeof procedureSchema>;
export type Therapy = z.infer<typeof therapySchema>;
export type Medication = z.infer<typeof medicationSchema>;
export type TreatmentPlan = z.infer<typeof treatmentPlanSchema>;
export type Prognosis = z.infer<typeof prognosisSchema>;

// Optional: Create schemas for creation and update with different requirements
export const CreateVerdictSchema = VerdictZodSchema;
export const UpdateVerdictSchema = VerdictZodSchema.partial();
