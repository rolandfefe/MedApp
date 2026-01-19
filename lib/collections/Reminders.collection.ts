import { eReminderStatus, eReminderVariants } from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Reminders: CollectionConfig = {
	slug: "reminders",
	// ! typescript:  { interface: "IReminder" },

	fields: [
		{ name: "user", type: "relationship", relationTo: "users", required: true },
		{
			name: "variant",
			type: "select",
			options: Object.entries(eReminderVariants).map(([label, value]) => ({
				label,
				value,
			})),
			defaultValue: eReminderVariants.PERSONAL,
		},
		{ name: "reminderLabel", type: "text", required: true },
		{ name: "description", type: "textarea" },

		// todo find out how to set up dynamic-collection relations
		// {
		// 	name: "item",
		// 	type: "relationship",	
		// 	relationTo: ["appointments", "Medication"],
		// },
		{ name: "time", type: "date", required: true },
		{
			name: "status",
			type: "select",
			options: Object.entries(eReminderStatus).map(([label, value]) => ({
				label,
				value,
			})),
			defaultValue: eReminderStatus.PENDING,
		},
	],
};
