import { LUCIDE_ICON_NAMES } from "@/constants";
import { GlobalConfig } from "payload";

export const DoctorNav: GlobalConfig = {
	slug: "DoctorNav",
	// admin: {},
	fields: [
		{
			name: "items",
			type: "array",
			fields: [
				{ name: "name", type: "text", required: true },
				{ name: "link", type: "text", required: true },
				{
					name: "icon",
					type: "select",
					required: true,
					options: LUCIDE_ICON_NAMES,
				},
			],
		},
	],
};
