import { useCurrent } from "@/contexts/Current.context";
import Link from "next/link";

export default function ArticleCard({ article }: { article: IArticle }) {
	const currentDoctor = useCurrent().currentDoctor!;
	return (
		<Link href={`/doctor/${currentDoctor.id}/articles/${article.id}`}>
			<div className="p-3 rounded-2xl">
				<p className="text-xl font-medium text-primary">{article.title}</p>
				<p className="text-xs text-muted-foreground">{article.description}</p>
			</div>
		</Link>
	);
}
