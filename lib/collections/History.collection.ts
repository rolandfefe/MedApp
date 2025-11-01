import { eLifeStyleStatus, eSeverity } from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Histories: CollectionConfig = {
	slug: "histories",
	// ! typescript:  { interface: "IHistory" },
	fields: [
		{
			name: "patient",
			type: "relationship",
			relationTo: "patients",
			required: true,
			unique: true,
		},
		{
			name: "diseaseHistory",
			type: "array",
			fields: [
				{ name: "name", type: "text", required: true },
				{ name: "diagnosisDate", type: "date", required: true },
				{ name: "resolved", type: "checkbox", required: true },
				{ name: "resolutionDate", type: "date" },
			],
		},
		{
			name: "surgicalHistory",
			type: "array",
			fields: [
				{ name: "procedure", type: "text", required: true },
				{ name: "date", type: "date", required: true },
				{ name: "facility", type: "text", required: true },
			],
		},
		{
			name: "familyHistory",
			type: "array",
			fields: [
				{ name: "condition", type: "text", required: true },
				{ name: "relation", type: "text", required: true },
				{ name: "notes", type: "textarea" },
			],
		},

		{
			name: "allergies",
			type: "array",
			fields: [
				{ name: "substance", type: "text", required: true },
				{ name: "reaction", type: "textarea", required: true },
				{
					name: "severity",
					type: "select",
					required: true,
					options: Object.entries(eSeverity).map(([label, value]) => ({
						label,
						value,
					})),
				},
				{ name: "onsetDate", type: "date" },
				{ name: "lastReactionDate", type: "date" },
			],
		},
		{
			name: "socialHistory",
			type: "group",
			fields: [
				{
					name: "smoking",
					type: "group",
					fields: [
						{
							name: "status",
							type: "select",
							options: Object.entries(eLifeStyleStatus).map(
								([label, value]) => ({ label, value })
							),
						},
						{ name: "years", type: "number" },
						{ name: "quiteDate", type: "date" },
						{ name: "lastUser", type: "date" },
					],
				},
				{
					name: "alcohol",
					type: "group",
					fields: [
						{
							name: "status",
							type: "select",
							options: Object.entries(eLifeStyleStatus).map(
								([label, value]) => ({ label, value })
							),
						},
						{ name: "years", type: "number" },
						{ name: "quiteDate", type: "date" },
						{ name: "lastUser", type: "date" },
					],
				},
				{
					name: "substanceUse",
					type: "group",
					fields: [
						{ name: "substances", type: "text", hasMany: true, required: true },
						{
							name: "status",
							type: "select",
							options: Object.entries(eLifeStyleStatus).map(
								([label, value]) => ({ label, value })
							),
						},
						{ name: "quiteDate", type: "date" },
						{ name: "lastUse", type: "date" },
					],
				},
			],
		},
		{ name: "exercise", type: "textarea" },
		{ name: "diet", type: "textarea" },
		{ name: "notes", type: "richText" },
	],
};
