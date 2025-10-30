import { eReferralStatus } from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Referrals: CollectionConfig = {
	slug: "referrals",
	fields: [
		{
			name: "appointment",
			type: "relationship",
			relationTo: "appointments",
			required: true,
		},
		{
			name: "from",
			type: "relationship",
			relationTo: "doctors",
			required: true,
		},
		{ name: "to", type: "relationship", relationTo: "doctors", required: true },
		{ name: "reason", type: "richText", required: true },
		{
			name: "status",
			type: "select",
			options: Object.entries(eReferralStatus).map(([label, value]) => ({
				label,
				value,
			})),		
		},
	],
};
