import ArticlesFeed from "@/components/Feeds/ArticlesFeed";
import ArticleForm from "@/components/forms/ArticleForm";
import { getArticles } from "@/lib/actions/article.actions";

export default async function page() {
	const [{ articles }] = await Promise.all([getArticles({})]);

	return <ArticlesFeed />;
}
