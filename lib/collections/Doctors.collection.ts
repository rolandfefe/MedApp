import {
	eGender,
	eLicenseStatus,
	eLicenseType,
	eMedicalCertificationTypes,
	eMedicalSpecialties,
	eRating,
} from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Doctors: CollectionConfig = {
	slug: "doctors",
	// ! typescript:  { interface: "IDoctor" },
	fields: [
		{ name: "user", type: "relationship", relationTo: "users", required: true },
		{ name: "DOB", type: "date", required: true },
		{
			name: "gender",
			type: "select",
			options: Object.entries(eGender).map(([label, value]) => ({
				label,
				value,
			})),
		},
		{ name: "languages", type: "text", hasMany: true },
		{ name: "bio", type: "text", maxLength: 5000 },
		{
			name: "specialties",
			type: "array",
			minRows: 1,
			fields: [
				{
					name: "primary",
					type: "select",
					required: true,
					options: Object.entries(eMedicalSpecialties).map(
						([label, value]) => ({ label, value })
					),
				},
				{
					name: "secondary",
					type: "select",
					options: Object.entries(eMedicalSpecialties).map(
						([label, value]) => ({ label, value })
					),
				},
				{ name: "procedures", type: "text", hasMany: true, required: true },
			],
		},
		{
			name: "credentials",
			required: true,
			type: "group",
			fields: [
				{
					name: "medicalCertifications",
					type: "array",
					minRows: 1,
					fields: [
						{
							name: "type",
							type: "select",
							options: Object.entries(eMedicalCertificationTypes).map(
								([label, value]) => ({ label, value })
							),
						},
						{ name: "institution", type: "text", required: true },
						{ name: "date", type: "date", required: true },
						{ name: "name", type: "text", required: true },
					],
				},
				{
					name: "licenses",
					type: "array",
					minRows: 1,
					fields: [
						{ name: "licenseNumber", type: "text", required: true },
						{
							name: "type",
							type: "select",
							options: Object.entries(eLicenseType).map(([label, value]) => ({
								label,
								value,
							})),
						},
						{
							name: "status",
							type: "select",
							options: Object.entries(eLicenseStatus).map(([label, value]) => ({
								label,
								value,
							})),
							defaultValue: eLicenseStatus.ACTIVE,
						},
						{ name: "issuingState", type: "text", required: true },
						{ name: "expirationDate", type: "date", required: true },
					],
				},
				{
					name: "boardCertifications",
					type: "array",
					fields: [
						{ name: "boardName", type: "text", required: true },
						{ name: "certificationId", required: true, type: "text" },
						{
							name: "status",
							type: "select",
							options: Object.entries(eLicenseStatus).map(([label, value]) => ({
								label,
								value,
							})),
							defaultValue: eLicenseStatus.ACTIVE,
						},
						{ name: "date", type: "date", required: true },
						{ name: "expirationDate", type: "date" },
					],
				},
				{
					name: "hospitalAffiliations",
					type: "array",
					minRows: 1,
					fields: [
						{ name: "name", type: "text", required: true },
						{ name: "department", type: "text", required: true },
						{ name: "roles", type: "text", hasMany: true, required: true },
						{ name: "startDate", type: "date", required: true },
						{ name: "endDate", type: "date" },
					],
				},
				{ name: "isVerified", type: "checkbox", defaultValue: false },
			],
		},
		{
			name: "contact",
			type: "group",
			fields: [
				{ name: "officePhone", type: "text", required: true },
				{ name: "officeEmail", type: "text", required: true },
				{ name: "mobilePhone", type: "text" },
			],
		},
		{
			name: "metrics",
			type: "group",
			fields: [
				{ name: "numberOfPatients", type: "number", defaultValue: 0 },
				{ name: "readmissionRate", type: "number", defaultValue: 0 },
				{ name: "experience", type: "number", defaultValue: 0 },
				{
					name: "rating",
					type: "array",
					fields: [
						{
							name: "user",
							type: "relationship",
							relationTo: "users",
							required: true,
						},
						{
							name: "rating",
							type: "select",
							options: Object.entries(eRating).map(([label, value]) => ({
								label,
								value,
							})),
						},
					],
				},
			],
		},
	],
};
