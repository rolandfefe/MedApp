import { eRecurrenceFrequency, eWeekDays } from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const RecurrencePlan: CollectionConfig = {
	slug: "recurrencePlans",
	fields: [
		{
			name: "supervisor",
			type: "relationship",
			relationTo: "doctors",
			required: true,
		},
		{
			name: "appointment",
			type: "relationship",
			relationTo: "appointments",
			required: true,
			unique: true, // ! Appointments have only ONE plan!
		},
		{
			name: "frequency",
			type: "select",
			options: Object.entries(eRecurrenceFrequency).map(([label, value]) => ({
				label,
				value,
			})),
			required: true,
		},
		{
			name: "interval",
			type: "number",
			min: 1,
			required: true,
			defaultValue: 1,
		},
		{ name: "startDate", type: "date", required: true },
		{ name: "endDate", type: "date" },
		{ name: "startTime", type: "text", required: true },
		{ name: "endTime", type: "text" },
		{
			name: "weekDays",
			type: "select",
			hasMany: true,
			required: true,
			options: Object.entries(eWeekDays).map(([label, value]) => ({
				label,
				value,
			})),
		},
		{
			name: "exceptions",
			type: "text",
			hasMany: true,
		},
	],
};
