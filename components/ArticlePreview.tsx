"use client";

import { useArticles } from "@/contexts/Articles.context";
import { Editor } from "./blocks/editor-00/editor";

export default function ArticlePreview({ article }: { article: IArticle }) {
	console.log(article);
	const { articles, setActiveArticle } = useArticles();
	setActiveArticle(article);

	return (
		<div>
			<Editor.Renderer editorSerializedState={article.content} />
		</div>
	);
}
