import z from "zod";
import {
	eCertificationStatus,
	eGender,
	eLicenseStatus,
	eLicenseType,
	eMedicalDegreeTypes,
	eRating,
} from "@/types/enums";

// Medical License Schema
const licenseSchema = z.object({
	licenseNumber: z.string().min(1, "License number is required"),
	type: z.nativeEnum(eLicenseType),
	issuingState: z.string().min(1, "Issuing state is required"),
	status: z.nativeEnum(eLicenseStatus).default(eLicenseStatus.ACTIVE),
	expirationDate: z.date(),
});

// Board Certification Schema
const boardCertificationsSchema = z.object({
	boardName: z.string().min(1, "Board name is required"),
	specialty: z.string().min(1, "Specialty is required"),
	subSpecialty: z.string().optional(),
	certificationId: z.string().min(1, "Certification ID is required"),
	status: z
		.nativeEnum(eCertificationStatus)
		.default(eCertificationStatus.ACTIVE),
	certificationDate: z.date(),
	expirationDate: z.date(),
});

// Hospital Affiliation Schema
const hospitalAffiliationSchema = z.object({
	name: z.string().min(1, "Hospital name is required"),
	department: z.string().min(1, "Department is required"),
	role: z.string().min(1, "Role is required"),
	privilegeDetails: z.array(z.string()).default([]),
	startDate: z.date(),
	endDate: z.date().optional().nullable(),
});

// Medical Degree Schema
const medicalDegreeSchema = z.object({
	type: z.nativeEnum(eMedicalDegreeTypes),
	institution: z.string().min(1, "Institution is required"),
	date: z.date(),
});

// Credentials Schema
const credentialsSchema = z.object({
	medicalDegrees: z.array(medicalDegreeSchema).default([]),
	licenses: z.array(licenseSchema).min(1, "At least one license is required"),
	boardCertifications: z.array(boardCertificationsSchema).default([]),
	hospitalAffiliations: z
		.array(hospitalAffiliationSchema)
		.min(1, "At least one hospital affiliation is required"),
	isVerified: z.boolean().default(true),
});

// Metrics Schema
const metricsSchema = z.object({
	numberOfPatients: z.number().int().nonnegative().default(0),
	readmissionRate: z.number().min(0).max(100).default(0),
	experience: z.number().int().nonnegative().optional(),
});

// Specialty Schema
const specialtySchema = z.object({
	primary: z.string().min(1, "Primary specialty is required"),
	secondary: z.string().optional(),
	procedures: z
		.array(z.string().min(1, "Procedure name is required"))
		.default([]),
});

// Contact Schema
const contactSchema = z.object({
	officePhone: z.string().min(1, "Office phone is required"),
	officeEmail: z.string().email("Invalid email address"),
	mobilePhone: z.string().optional(),
	pager: z.string().optional(),
});

// Main Doctor Form Schema
export const doctorFormSchema = z.object({
	DOB: z
		.date()
		.refine(
			(date) => date <= new Date(),
			"Date of birth cannot be in the future"
		),
	gender: z.nativeEnum(eGender),
	languages: z.array(z.string()).default([]),
	bio: z.string().max(5000, "Bio must be 5000 characters or less").optional(),
	credentials: credentialsSchema,
	specialties: z
		.array(specialtySchema)
		.min(1, "At least one specialty is required"),
	contact: contactSchema,
	metrics: metricsSchema.optional().default({
		numberOfPatients: 0,
		readmissionRate: 0,
	}),
});

// Optional: Create schemas for partial updates
export const doctorUpdateSchema = doctorFormSchema.partial();

// Optional: Create schemas for specific operations
export const doctorCreateSchema = doctorFormSchema
	.omit({
		metrics: true, // Metrics might be auto-generated on creation
	})
	.extend({
		metrics: metricsSchema.optional(),
	});

// Type inference
export type DoctorFormData = z.infer<typeof doctorFormSchema>;
export type DoctorUpdateData = z.infer<typeof doctorUpdateSchema>;
export type DoctorCreateData = z.infer<typeof doctorCreateSchema>;

// Individual component schemas for modular use
export {
	licenseSchema,
	boardCertificationsSchema,
	hospitalAffiliationSchema,
	medicalDegreeSchema,
	credentialsSchema,
	specialtySchema,
	contactSchema,
	metricsSchema,
};
