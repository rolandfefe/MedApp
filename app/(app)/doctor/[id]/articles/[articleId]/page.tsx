import ArticlePreview from "@/components/ArticlePreview";
import { getArticle } from "@/lib/actions/article.actions";

export default async function page({
	params,
}: PageProps<"/doctor/[id]/articles/[articleId]">) {
	const { articleId } = await params;
	const [article] = await Promise.all([getArticle(articleId)]);

	return (
		<div>
			<ArticlePreview article={article} />
		</div>
	);
}
