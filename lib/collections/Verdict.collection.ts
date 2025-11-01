import { eRouteOfAdministration } from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Verdict: CollectionConfig = {
	slug: "Verdict",
	trash: true,
	fields: [
		{
			name: "diagnosis",
			type: "relationship",
			relationTo: "diagnoses",
			required: true,
			unique: true,
		},
		{
			name: "doctor",
			type: "relationship",
			relationTo: "doctors",
			hasMany: true, // ? Allow collaboration
			required: true,
		},
		// ? Confirmed Diagnoses fields

		{
			name: "prognosis",
			type: "group",
			fields: [
				{
					name: "outlook",
					type: "select",
					options: ["excellent", "good", "fair", "poor", "guarded"],
				},
				{ name: "estimatedRecoveryTime", type: "textarea" },
			],
		},

		{ name: "patientNotes", type: "richText", required: true },
		{ name: "isConfirmed", type: "checkbox", defaultValue: false },
		{
			name: "treatmentPlan",
			type: "group",
			fields: [
				{ name: "plan", type: "richText", required: true },
				{
					name: "procedures",
					type: "array",
					fields: [
						{ name: "type", type: "text" },
						{ name: "scheduledDate", type: "date" },
						{
							name: "status",
							type: "select",
							options: ["recommended", "scheduled", "completed"],
						},
					],
				},
				{
					name: "therapies",
					type: "array",
					fields: [
						{ name: "type", type: "text" },
						{ name: "frequency", type: "text" },
						{ name: "duration", type: "text" },
					],
				},
				{
					name: "medications",
					type: "array",
					minRows: 1,
					fields: [
						{ name: "name", type: "text", required: true },
						{ name: "dosage", type: "text", required: true },
						// { name: "frequency", type: "text" },
						{ name: "instructions", type: "textarea" },
						{ name: "sideEffects", type: "textarea" },
						{ name: "reason", type: "textarea" },
						{
							name: "route",
							type: "select",
							options: Object.entries(eRouteOfAdministration).map(
								([label, value]) => ({
									label,
									value,
								})
							),
						},
						{ name: "startDate", type: "date", required: true },
						{ name: "endDate", type: "date" },
					],
				},
			],
		},
	],
};
