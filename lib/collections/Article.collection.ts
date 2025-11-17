import {
	eArticleCategories,
	eArticleStatus,
	eArticleType,
} from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
	slug: "Articles",
	fields: [
		{ name: "title", type: "text", required: true },
		{ name: "description", type: "text" },
		// ? Allow collaborations.
		{
			name: "authors",
			type: "relationship",
			relationTo: "doctors",
			hasMany: true,
		},

		{ name: "content", type: "richText", required: true },
		{
			name: "meta",
			type: "group",
			fields: [
				{
					name: "reads",
					type: "relationship",
					hasMany: true,
					relationTo: "users",
				},
				{
					name: "likes",
					type: "relationship",
					hasMany: true,
					relationTo: "users",
				},
				{
					name: "dislikes",
					type: "relationship",
					hasMany: true,
					relationTo: "users",
				},
				{
					name: "type",
					type: "select",
					options: Object.entries(eArticleType).map(([label, value]) => ({
						label,
						value,
					})),
				},
				{
					name: "status",
					type: "select",
					options: Object.entries(eArticleStatus).map(([label, value]) => ({
						label,
						value,
					})),
					defaultValue: eArticleStatus.DRAFT,
				},
				{
					name: "categories",
					type: "select",
					hasMany: true,
					options: Object.entries(eArticleCategories).map(([label, value]) => ({
						label,
						value,
					})),
				},
			],
		},
		{ name: "isVerified", type: "checkbox", defaultValue: false },
		{
			name: "licensing",
			required: true,
			type: "group",
			fields: [
				{ name: "copyright", type: "text", required: true },
				{ name: "licenseType", type: "text" },
				{ name: "isPublic", type: "checkbox", defaultValue: true },
			],
		},
	],
};
