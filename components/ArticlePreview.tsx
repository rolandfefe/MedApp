"use client";

import { useArticles } from "@/contexts/Articles.context";
import { Editor } from "./blocks/editor-00/editor";
import {
	ComponentProps,
	useEffect,
	useEffectEvent,
	useTransition,
} from "react";
import { useCurrent } from "@/contexts/Current.context";
import { updateArticle } from "@/lib/actions/article.actions";
import Heading from "./custom/Heading";
import moment from "moment";
import { Eye, NotebookTabs, Stars, ThumbsDown, ThumbsUp } from "lucide-react";
import { Badge } from "./ui/badge";
import DoctorCard from "./cards/DoctorCard";
import { cn } from "@/lib/utils";
import MyBtn from "./custom/MyBtn";
import { Spinner } from "./ui/spinner";
import BackBtn from "./btns/BackBtn";

export default function ArticlePreview({ article }: { article: IArticle }) {
	console.log(article);
	// const { articles, setActiveArticle } = useArticles();
	// setActiveArticle(article);

	return (
		<div className="space-y-3">
			<section className="border-2 border-primary rounded-xl p-2 space-y-2">
				<Heading className="text-lg sm:text-xl font-semibold text-primary">
					<NotebookTabs />
					{article.title}
				</Heading>
				<p className="text-sm text-muted-foreground">{article.description}</p>

				<div className="flex items-center gap-2 flex-wrap">
					{article.meta?.categories?.map((c, i) => (
						<Badge variant="secondary" key={i} className="text-xs">
							{c}
						</Badge>
					))}
				</div>

				<div className="flex items-center justify-between">
					<Badge variant="secondary" className="text-primary text-xs">
						<Stars />
						{article.meta?.type}
					</Badge>

					<p className="text-xs text-muted-foreground text-right">
						{moment(article.createdAt).format("Do MMM, YYYY")}
					</p>
				</div>
			</section>
			<Editor.Renderer
				editorSerializedState={article.content}
				className="border-0"
			/>
			<p className="text-sm font-medium text-center text-muted-foreground">
				<span>{article.licensing.copyright}</span>,{" "}
				<span>{article.licensing.licenseType}</span>
			</p>

			<div className="flex items-center justify-center gap-x-2">
				<BackBtn className="rounded-full!" />
				<ArticlePreview.Engagement article={article} />
			</div>

			<section className="bg-secondary p-3 rounded-2xl">
				<p className="text-lg">Authors:</p>
				<div className="flex items-center gap-2">
					{article.authors!.map((a, i) => (
						<DoctorCard key={i} doctor={a as IDoctor} />
					))}
				</div>
			</section>
		</div>
	);
}

ArticlePreview.Engagement = ({
	className,
	article,
	...props
}: { article: IArticle } & ComponentProps<"div">) => {
	const currentUser = useCurrent().currentUser!;
	const [isLiking, likeTransition] = useTransition();
	const [isDisliking, dislikeTransition] = useTransition();

	const readsArr =
		article.meta?.reads?.map((r) => {
			const reader = r as IUser;
			return reader.id;
		}) ?? [];
	const likesArr =
		article.meta?.likes?.map((l) => {
			const likes = l as IUser;
			return likes.id;
		}) ?? [];
	const dislikesArr =
		article.meta?.dislikes?.map((d) => {
			const dislikes = d as IUser;
			return dislikes.id;
		}) ?? [];

	const likeHandler = async () => {
		const hasLiked = !!likesArr!.find((l) => l == currentUser.id);

		likeTransition(async () => {
			if (hasLiked) {
				await updateArticle({
					...article,
					meta: {
						...article.meta,
						likes: likesArr!.filter((l) => l != currentUser.id),
					},
				});
			} else {
				await updateArticle({
					...article,
					meta: { ...article.meta, likes: [...likesArr!, currentUser.id] },
				});
			}
		});
	};

	const dislikeHandler = async () => {
		const hasDisliked = !!dislikesArr!.find((d) => d == currentUser.id);

		dislikeTransition(async () => {
			if (hasDisliked) {
				await updateArticle({
					...article,
					meta: {
						...article.meta,
						dislikes: dislikesArr!.filter((l) => l != currentUser.id),
					},
				});
			} else {
				await updateArticle({
					...article,
					meta: {
						...article.meta,
						dislikes: [...dislikesArr!, currentUser.id],
					},
				});
			}
		});
	};

	const readsCounter = useEffectEvent(async () => {
		const isViewer = readsArr!.find((r) => r == currentUser.id);
		if (isViewer) return;

		console.log("🤪counting reader....");
		await updateArticle({
			...article,
			meta: { ...article.meta, reads: [...readsArr!, currentUser.id] },
		});
	});

	useEffect(() => {
		readsCounter();
	}, []);
	return (
		<div className={cn("flex items-center gap-2 w-fit ", className)} {...props}>
			<MyBtn
				disabled={isLiking || isDisliking}
				size="sm"
				variant="outline"
				onClick={likeHandler}
			>
				{isLiking ? <Spinner /> : <ThumbsUp />}
				{likesArr!.length}
			</MyBtn>
			<MyBtn
				disabled={isLiking || isDisliking}
				size="sm"
				variant="outline"
				onClick={dislikeHandler}
			>
				{isDisliking ? <Spinner /> : <ThumbsDown />}

				{dislikesArr!.length}
			</MyBtn>
			<MyBtn size="sm" variant="outline">
				<Eye />
				{readsArr!.length}
			</MyBtn>
		</div>
	);
};
