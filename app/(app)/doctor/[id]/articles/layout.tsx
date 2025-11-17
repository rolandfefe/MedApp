import { ArticleProvider } from "@/contexts/Articles.context";
import { getArticles } from "@/lib/actions/article.actions";

export default async function layout({
	children,
	params,
}: LayoutProps<"/doctor/[id]/articles">) {
	const [{ articles }] = await Promise.all([getArticles({limit: 0})]);
	return <ArticleProvider articlesInit={articles}>{children}</ArticleProvider>;
}
