import type { CollectionConfig } from "payload";
import { ClerkAuthStrategy } from "../auth/ClerkAuthStrategy";

export const Users: CollectionConfig = {
	slug: "users",
	// ! typescript:  {interface: "IUser"},
	admin: {
		useAsTitle: "username",
	},
	access: {
		admin: () => true,
		unlock: () => true,
		create: () => true,
		read: () => true,
		update: () => true,
		delete: () => true,
		readVersions: () => true,
	},
	auth: {
		disableLocalStrategy: true,
		strategies: [ClerkAuthStrategy],
	},
	trash: true,
	fields: [
		{ name: "clerkId", type: "text", unique: true, required: true },
		{ name: "username", type: "text", unique: true, required: true },
		{ name: "fname", type: "text", required: true },
		{ name: "lname", type: "text", required: true },
		{
			name: "email",
			type: "text",
			unique: true,
			// hasMany: true, // ? Only one major email FOR NOW
			required: true,
		},
		{ name: "imageUrl", type: "text" },
	],
};
