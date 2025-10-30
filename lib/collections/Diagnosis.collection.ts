import {
	eConfidenceLevel,
	eDiagnosisStatus,
	eLaterality,
	eSeverity,
} from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Diagnosis: CollectionConfig = {
	slug: "diagnoses",

	fields: [
		// Relational
		{
			name: "appointment",
			type: "relationship",
			relationTo: "appointments",
			unique: true,
			required: true,
		},
		{
			name: "patient",
			type: "relationship",
			relationTo: "patients",
			required: true,
		},
		{
			name: "doctor",
			type: "relationship",
			relationTo: "doctors",
			required: true,
		},
		{
			name: "healthStatus",
			type: "relationship",
			relationTo: "healthStatuses",
			required: true,
		},
		{
			name: "history",
			type: "relationship",
			relationTo: "histories",
			required: true,
		},

		//
		{ name: "chiefComplaint", type: "textarea" },
		{ name: "preAppointmentNotes", type: "richText" },
		{ name: "medicationsReviewed", type: "checkbox" },
		{ name: "templateUsed", type: "text" },

		// Date Fields
		{ name: "onsetDate", type: "date", required: true },
		{ name: "dateResolved", type: "date" },

		{
			name: "status",
			type: "select",
			options: Object.entries(eDiagnosisStatus).map(([label, value]) => ({
				label,
				value,
			})),
			defaultValue: eDiagnosisStatus.Pending,
		},
		{ name: "updatedBy", type: "relationship", relationTo: "doctors" },

		// ? Differential Diagnosis.
		{
			name: "differentialDiagnosis",
			type: "array",
			minRows: 1,
			fields: [
				{ name: "condition", type: "text", required: true },
				{ name: "icd10Code", type: "text" }, // ! validate (especially at Form-level)
				{ name: "reasoning", type: "richText", required: true },
				{ name: "isPrimary", type: "checkbox", defaultValue: false },
				{
					name: "confidence",
					type: "radio",
					required: true,
					options: Object.entries(eConfidenceLevel).map(([label, value]) => ({
						label,
						value,
					})),
				},
				{
					name: "laterality",
					type: "radio",
					// required: true,
					options: Object.entries(eLaterality).map(([label, value]) => ({
						label,
						value,
					})),
				},
				{
					name: "severity",
					type: "radio",
					required: true,
					options: Object.entries(eSeverity).map(([label, value]) => ({
						label,
						value,
					})),
				},
				{ name: "dateConfirmed", type: "date", required: true },
			],
		},
	],
};
