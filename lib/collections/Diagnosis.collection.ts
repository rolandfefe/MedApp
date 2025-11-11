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
		{
			name: "appointment",
			type: "relationship",
			relationTo: "appointments",
			unique: true,
			required: true,
		},
		{
			name: "doctor",
			type: "relationship",
			relationTo: "doctors",
			required: true,
		},

		{
			name: "history",
			type: "relationship",
			relationTo: "histories",
			required: true,
		},
		{
			name: "healthStatus",
			type: "relationship",
			relationTo: "healthStatuses",
		},

		{ name: "templateUsed", type: "text" },
		{ name: "onsetDate", type: "date", required: true },
		{ name: "dateResolved", type: "date" },

		{ name: "chiefComplaint", type: "richText" },
		{ name: "notes", type: "richText" },
		{ name: "medicationsReviewed", type: "checkbox", defaultValue: false },

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

		{ name: "dateConfirmed", type: "date"},
		// { name: "isConfirmed", type: "checkbox", defaultValue: false },
		// ? Differential Diagnosis.
		{
			name: "differentialDiagnosis",
			type: "array",
			minRows: 1,
			fields: [
				{ name: "condition", type: "text", required: true },
				{ name: "icd10Code", type: "text" }, // ! validate (especially at Form-level)
				{ name: "reasoning", type: "textarea", required: true },
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
					name: "severity",
					type: "radio",
					required: true,
					options: Object.entries(eSeverity).map(([label, value]) => ({
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
			],
		},
	],
};
