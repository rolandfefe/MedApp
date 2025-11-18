import { useCurrent } from "@/contexts/Current.context";
import Link from "next/link";
import { Badge } from "../ui/badge";
import moment from "moment";
import { Eye, Stars, ThumbsDown, ThumbsUp } from "lucide-react";
import { ComponentProps } from "react";

export default function ArticleCard({ article }: { article: IArticle }) {
	const currentDoctor = useCurrent().currentDoctor!;

	return (
		<Link href={`/article/${article.id}`}>
			<div className="relative p-3 glass glass-shadow rounded-2xl bg-secondary space-y-2">
				<Badge
					variant={"secondary"}
					className="absolute top-2 right-2 text-primary"
				>
					{article.meta?.type}
				</Badge>
				<div>
					<p className="text-xl font-medium text-primary mb-1">
						{article.title}
					</p>
					<p className="text-xs text-muted-foreground line-clamp-2">
						{article.description}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						{article.authors!.map((author, i) => {
							const user = author.user as IUser;

							return (
								<Badge variant="secondary" key={i} className="font-medium">
									@{user.username}
								</Badge>
							);
						})}
					</div>

					<p className="text-xs text-muted-foreground ">
						{moment(article.createdAt).fromNow()}
					</p>

					<div className="flex items-center gap-x-2 border py-1 px-2 rounded-3xl text-xs text-muted-foreground">
						<div className="flex items-center gap-x-1">
							<Eye size={18} />
							<span>{article.meta!.reads?.length ?? 0}</span>
						</div>
						<div className="flex items-center gap-x-1">
							<ThumbsUp size={18} />
							<span>{article.meta!.likes?.length ?? 0}</span>
						</div>
						<div className="flex items-center gap-x-1">
							<ThumbsDown size={18} />
							<span>{article.meta!.dislikes?.length ?? 0}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

ArticleCard.SM = ({ article }: ComponentProps<typeof ArticleCard>) => {
	return (
		<Link href={`/article/${article.id}`}>
			<div className="relative p-3 glass glass-shadow rounded-2xl bg-secondary space-y-2">
				<div>
					<p className="text-xl font-medium text-primary mb-1 line-clamp-1">
						{article.title}
					</p>
				</div>
				<Badge
					variant={"secondary"}
					className="flex items-center gap-x-2 text-primary"
				>
					<Stars size={20} />
					{article.meta?.type}
				</Badge>

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						{article.authors!.map((author, i) => {
							const user = author.user as IUser;

							return (
								<Badge variant="secondary" key={i} className="font-medium">
									@{user.username}
								</Badge>
							);
						})}
					</div>

					<p className="text-xs text-muted-foreground ">
						{moment(article.createdAt).fromNow(true)}
					</p>

					<div className="flex items-center gap-x-2 border py-1 px-2 rounded-3xl text-xs text-muted-foreground">
						<div className="flex items-center gap-x-1">
							<Eye size={18} />
							<span>{article.meta!.reads?.length ?? 0}</span>
						</div>
						<div className="flex items-center gap-x-1">
							<ThumbsUp size={18} />
							<span>{article.meta!.likes?.length ?? 0}</span>
						</div>
						<div className="flex items-center gap-x-1">
							<ThumbsDown size={18} />
							<span>{article.meta!.dislikes?.length ?? 0}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
