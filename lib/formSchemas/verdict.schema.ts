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
	type: z.string().optional(),
	scheduledDate: z.string().optional(), // Date as string in ISO format
	status: z.enum(["recommended", "scheduled", "completed"]).optional(),
});

const therapySchema = z.object({
	type: z.string().optional(),
	frequency: z.string().optional(),
	duration: z.string().optional(),
});

const medicationSchema = z.object({
	name: z.string().min(1, "Name is required"),
	dosage: z.string().min(1, "Dosage is required"),
	instructions: z.string().optional(),
	sideEffects: z.string().optional(),
	reason: z.string().optional(),
	route: z.string().optional(), // You might want to use z.enum() here with actual values
	startDate: z.string().min(1, "Start date is required"), // Date as string
	endDate: z.string().optional(), // Date as string
});

const treatmentPlanSchema = z.object({
	plan: z.any(), // richText - could be more specific if you know the structure
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
export const VerdictSchema = z.object({
	diagnosis: z.string().min(1, "Diagnosis is required"), // relationship as string ID
	doctor: z.array(z.string()).min(1, "At least one doctor is required"), // hasMany relationship as array of IDs
	prognosis: prognosisSchema.optional(),
	patientNotes: z.any(), // richText - could be more specific if you know the structure
	isConfirmed: z.boolean().default(false),
	treatmentPlan: treatmentPlanSchema.optional(),
});

// Type inference
export type Verdict = z.infer<typeof VerdictSchema>;
export type Procedure = z.infer<typeof procedureSchema>;
export type Therapy = z.infer<typeof therapySchema>;
export type Medication = z.infer<typeof medicationSchema>;
export type TreatmentPlan = z.infer<typeof treatmentPlanSchema>;
export type Prognosis = z.infer<typeof prognosisSchema>;

// Optional: Create schemas for creation and update with different requirements
export const CreateVerdictSchema = VerdictSchema;
export const UpdateVerdictSchema = VerdictSchema.partial();
