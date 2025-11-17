import ArticlesFeed from "@/components/Feeds/ArticlesFeed";
import { ArticleProvider } from "@/contexts/Articles.context";
import { getArticles } from "@/lib/actions/article.actions";

export default async function page() {
	const [{ articles }] = await Promise.all([getArticles({})]);

	return (
		// <ArticleProvider articlesInit={articles}>
			<ArticlesFeed />
		// </ArticleProvider>
	);
}
