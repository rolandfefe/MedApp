import { ArticleProvider } from "@/contexts/Articles.context";
import { CurrentProvider } from "@/contexts/Current.context";
import { getArticle } from "@/lib/actions/article.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import React from "react";

export default async function layout({
	params,
	children,
}: LayoutProps<"/article/[articleId]">) {
	const { articleId } = await params;

	const [article, user] = await Promise.all([
		getArticle(articleId),
		getCurrentUser(),
	]);

	return (
		<CurrentProvider user={user}>
			<ArticleProvider article={article} articlesInit={[]}>
				<main className="p-3">{children}</main>
			</ArticleProvider>
		</CurrentProvider>
	);
}
