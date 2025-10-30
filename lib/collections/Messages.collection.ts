import { eMessageStatus } from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Messages: CollectionConfig = {
	slug: "messages",
	// ! typescript:  { interface: "IMessage" },

	fields: [
		{
			name: "appointment",
			type: "relationship",
			relationTo: "appointments",
			required: true,
		},
		{ name: "body", type: "textarea", required: true },
		{
			name: "status",
			type: "select",
			options: Object.entries(eMessageStatus).map(([label, value]) => ({
				label,
				value,
			})),

			defaultValue: eMessageStatus.SENT,
		},
		{ name: "refMessage", type: "relationship", relationTo: "messages" },
		{ name: "from", type: "relationship", relationTo: "users", required: true },
	],
};
