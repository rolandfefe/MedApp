import z from "zod";
import {
	eCertificationStatus,
	eGender,
	eLicenseStatus,
	eLicenseType,
	eMedicalCertificationTypes,
	eMedicalSpecialties,
	eRating,
} from "@/types/enums/enums";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Medical License Schema
const licenseSchema = z.object({
	licenseNumber: z.string().min(1, "License number is required"),
	type: z.nativeEnum(eLicenseType).nullable(),
	status: z
		.nativeEnum(eLicenseStatus)
		.nullable()
		.default(eLicenseStatus.ACTIVE),
	issuingState: z.string().min(1, "Issuing state is required"),
	expirationDate: z.string(),
});

// Board Certification Schema
const boardCertificationsSchema = z.object({
	certificationId: z.string().min(1, "Certification ID is required"),
	boardName: z.string().min(1, "Board name is required"),
	status: z
		.nativeEnum(eCertificationStatus)
		.default(eCertificationStatus.ACTIVE),
	date: z.string(),
	expirationDate: z.string(),
});

// Hospital Affiliation Schema
const hospitalAffiliationSchema = z.object({
	name: z.string().min(1, "Hospital name is required"),
	department: z.string().min(1, "Department is required"),
	roles: z.string().min(1, "Roles is required"),
	startDate: z.string(),
	endDate: z.string().optional(),
});

// Medical Degree Schema
const medicalCertificationSchema = z.object({
	name: z.string(),
	institution: z.string().min(1, "Institution is required"),
	type: z.nativeEnum(eMedicalCertificationTypes),
	date: z.string(),
});

// Credentials Schema
const credentialsSchema = z.object({
	medicalCertifications: z.array(medicalCertificationSchema).default([]),
	licenses: z.array(licenseSchema).min(1, "At least one license is required"),
	boardCertifications: z.array(boardCertificationsSchema).default([]),
	hospitalAffiliations: z
		.array(hospitalAffiliationSchema)
		.min(1, "At least one hospital affiliation is required"),
});

// Metrics Schema
const metricsSchema = z.object({
	numberOfPatients: z.number().int().nonnegative().default(0),
	readmissionRate: z.number().min(0).max(100).default(0),
	experience: z.number().int().nonnegative().optional(),
});

// Specialty Schema
const specialtySchema = z.object({
	primary: z.nativeEnum(eMedicalSpecialties, {
		required_error: "Primary specialty is required",
	}),
	secondary: z.nativeEnum(eMedicalSpecialties).optional(),
	procedures: z.string().min(1, "Procedure name is required"),
});

// Contact Schema
const contactSchema = z.object({
	officePhone: z.string().min(1, "Office phone is required"),
	officeEmail: z.string().email("Invalid email address"),
	mobilePhone: z.string().optional(),
});

// Main Doctor Form Schema
export const doctorFormSchema = z.object({
	DOB: z.string(),
	gender: z.nativeEnum(eGender),
	languages: z.string().optional(),
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
	medicalCertificationSchema,
	credentialsSchema,
	specialtySchema,
	contactSchema,
	metricsSchema,
};

// Form Hook
export const useDoctorForm = (doctor?: IDoctor) =>
	useForm({
		resolver: zodResolver(doctorFormSchema),
		// ! Fix default type errs [enums & dates]
		defaultValues: {
			bio: doctor?.bio || "",
			DOB: doctor?.DOB || "",
			gender: doctor?.gender || "",
			languages: doctor ? doctor.languages?.join(", ") : "",
			contact: doctor ? doctor.contact : {},
			credentials: doctor
				? {
						...doctor.credentials,
						hospitalAffiliations:
							doctor.credentials.hospitalAffiliations!.map((h) => ({
								...h,
								roles: h.roles.join(", "),
								endDate: h.endDate,
							})) || [],
						licenses: doctor
							? doctor.credentials.licenses!.map((l) => ({
									...l,
									type: l.type,
							  }))
							: [],
				  }
				: {},
			// credentials: doctor.credentials || {},
			specialties: doctor
				? doctor.specialties!.map((s) => ({
						...s,
						procedures: s.procedures.join(", "),
				  }))
				: [],
		},
	});
