import {
	eArticleCategories,
	eArticleStatus,
	eArticleType,
} from "@/types/enums/enums";
import { z } from "zod";

const metaSchema = z.object({
	type: z.nativeEnum(eArticleType),
	// categories: z.array(z.nativeEnum(eArticleCategories)),
	// status: z.nativeEnum(eArticleStatus).default(eArticleStatus.DRAFT),
});

const licensingSchema = z.object({
	copyright: z.string(),
	licenseType: z.string(),
	isPublic: z.boolean().default(true),
});

export const ArticleZodSchema = z.object({
	title: z.string().min(2),
	description: z.string().min(2).optional(),
	meta: metaSchema,
	licensing: licensingSchema,
});

export type ArticleFormData = z.infer<typeof ArticleZodSchema>;
