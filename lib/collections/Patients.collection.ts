import { eGender, eMaritalStatus, eRating } from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Patients: CollectionConfig = {
	slug: "patients",
	// ! typescript:  { interface: "IPatient" },
	fields: [
		{ name: "user", type: "relationship", relationTo: "users", required: true },
		{ name: "DOB", type: "date", required: true },
		{
			name: "gender",
			type: "select",
			options: Object.entries(eGender).map(([label, value]) => ({
				label,
				value,
			})),
		},
		{
			name: "maritalStatus",
			type: "select",
			options: Object.entries(eMaritalStatus).map(([label, value]) => ({
				label,
				value,
			})),
		},
		{ name: "occupation", type: "text" },
		{ name: "race", type: "text" },
		{ name: "language", type: "text", hasMany: true },
		{
			name: "emergencyContacts",
			type: "array",
			fields: [
				{ name: "name", type: "text", required: true },
				{ name: "relationship", type: "text", required: true },
				{ name: "phone", type: "text", required: true },
				{
					name: "priority",
					type: "select",
					options: Object.entries(eRating).map(([label, value]) => ({
						label,
						value,
					})),
					defaultValue: eRating.ONE,
				},
			],
			minRows: 1,
			// maxRows: 3,
		},
	],
	trash: true,
};
