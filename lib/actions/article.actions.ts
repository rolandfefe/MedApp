"use server";

import { getPayload } from "payload";
import config from "@/payload.config";
import { updateTag, unstable_cache as cache } from "next/cache";
import { eArticleCategories, eArticleType } from "@/types/enums/enums";

const payload = await getPayload({ config });
/**
 * @Mutations
 */

export const createArticle = async (data: IArticle) => {
	try {
		const article = await payload.create({
			collection: "Articles",
			data,
		});

		updateTag("articles");
		return article;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateArticle = async (data: IArticle) => {
	try {
		const article = await payload.update({
			collection: "Articles",
			id: data.id,
			data,
		});

		updateTag("articles");
		return article;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteArticle = async (id: string) => {
	try {
		await payload.delete({
			collection: "Articles",
			id,
		});

		updateTag("articles");
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * @Fetches
 */
export const getArticles = cache(
	async ({
		category,
		author,
		type,
		page,
		limit,
	}: {
		category?: eArticleCategories;
		author?: string;
		type?: eArticleType;
		page?: number;
		limit?: number;
	}) => {
		try {
			const isFilter = category || author || type;

			const {
				docs: articles,
				hasNextPage,
				nextPage,
			} = await payload.find({
				collection: "Articles",
				where: isFilter
					? {
							or: [
								{ authors: { equals: author } }, // ! test
								// { type: { equals: type } }, // ! test
								// { categories: { equals: category } }, // ! test
							],
					  }
					: undefined,
				page,
				limit,
			});

			return { articles, hasNextPage, nextPage: nextPage! ?? page };
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["articles"],
		revalidate: 15 * 60,
	}
);

export const getArticle = cache(
	async (id: string) => {
		try {
			return await payload.findByID({
				collection: "Articles",
				id,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	[],
	{
		tags: ["articles"],
		revalidate: 30 * 60,
	}
);
