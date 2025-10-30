import { ePainType, eTenScale } from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const HealthStatus: CollectionConfig = {
	slug: "healthStatuses",
	// ! typescript:  { interface: "IHealthStatus" },
	fields: [
		{
			name: "patient",
			type: "relationship",
			relationTo: "patients",
			required: true,
		},
		{
			name: "vitals",
			type: "group",
			fields: [
				{ name: "bloodPressure", type: "text", required: true },
				{ name: "heartRate", type: "text", required: true },
				{ name: "temperature", type: "text", required: true },
				{ name: "respiratoryRate", type: "text", required: true },
				{ name: "oxygenSaturation", type: "text", required: true },
				{ name: "weight", type: "text", required: true },
				{ name: "bmi", type: "text", required: true },
			],
		},
		{ name: "complaint", type: "textarea" },
		{
			name: "symptoms",
			type: "array",
			minRows: 1,
			fields: [
				{ name: "description", type: "textarea" },
				{
					name: "severity",
					type: "select",
					options: Object.entries(eTenScale).map(([label, value]) => ({
						label,
						value,
					})),
					required: true,
				},
				{ name: "duration", type: "text" },
				{ name: "onset", type: "date", required: true },
			],
		},
		{
			name: "pain",
			type: "array",
			fields: [
				{ name: "location", type: "text", required: true },
				{
					name: "intensity",
					type: "select",
					options: Object.entries(eTenScale).map(([label, value]) => ({
						label,
						value,
					})),
					required: true,
				},
				{
					name: "type",
					type: "select",
					options: Object.entries(ePainType).map(([label, value]) => ({
						label,
						value,
					})),
					required: true,
				},
				{ name: "aggravatingFactors", type: "text", hasMany: true },
				{ name: "relievingFactors", type: "text", hasMany: true },
			],
		},
	],
};
