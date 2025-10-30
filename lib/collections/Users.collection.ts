import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	// ! typescript:  {interface: "IUser"},
	admin: {
		useAsTitle: "username",
	},
	auth: true,
	fields: [
		// Email added by default
		// Add more fields as needed
		{ name: "clerkId", type: "text", unique: true, required: true },
		{ name: "username", type: "text", unique: true, required: true },
		{ name: "fname", type: "text", required: true },
		{ name: "lname", type: "text", required: true },
		{
			name: "email",
			type: "text",
			unique: true,
			hasMany: true,
			required: true,
		},
		{ name: "imageUrl", type: "text" },
	],
};
