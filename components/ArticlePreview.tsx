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
import { deleteArticle, updateArticle } from "@/lib/actions/article.actions";
import Heading from "./custom/Heading";
import moment from "moment";
import {
	Edit3,
	Eye,
	NotebookTabs,
	Stars,
	ThumbsDown,
	ThumbsUp,
	Trash2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import DoctorCard from "./cards/DoctorCard";
import { cn } from "@/lib/utils";
import MyBtn from "./custom/MyBtn";
import { Spinner } from "./ui/spinner";
import BackBtn from "./btns/BackBtn";
import Image from "next/image";
import LinkBtn from "./btns/LinkBtn";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import ConfirmationDialog from "./panels/ConfirmationDialog";
import { useRouter } from "next/navigation";

export default function ArticlePreview({ article }: { article: IArticle }) {
	console.log(article);

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
			<section className="relative">
				<Image
					src="/assets/logo_transparent.png"
					alt="logo"
					width={999}
					height={999}
					priority
					className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-20 dark:opacity-15 w-[40%] sm:w-1/2"
				/>
				<Editor.Renderer
					editorSerializedState={article.content}
					className="border-0 bg-transparent"
				/>
			</section>
			<p className="text-sm font-medium text-center text-muted-foreground">
				<span>{article.licensing.copyright}</span>,{" "}
				<span>{article.licensing.licenseType}</span>
			</p>

			<div className="flex items-center justify-center gap-x-2">
				<BackBtn className="rounded-full!" />
				<ArticlePreview.Engagement article={article} />
				<ArticlePreview.Actions article={article} />
			</div>

			<section className="bg-secondary glass-shadow p-3 rounded-2xl">
				<p className="text-lg">Authors:</p>
				<div className="flex items-center gap-2">
					{article.authors!.map((a, i) => (
						<DoctorCard
							key={i}
							doctor={a as IDoctor}
							className="flex-1 basis-full sm:basis-auto"
						/>
					))}
				</div>
			</section>
		</div>
	);
}


ArticlePreview.Actions = ({
	article,
}: ComponentProps<typeof ArticlePreview>) => {
	const currentDoctor = useCurrent().currentDoctor;
	const isAuthor = !!article.authors!.find((a) => a.id === currentDoctor?.id);
	const router = useRouter();

	console.log(currentDoctor, isAuthor);

	if (!currentDoctor || !isAuthor) return;

	const deleteHandler = async () => {
		await deleteArticle(article.id);
		router.push(`/doctor/${currentDoctor.id}/articles`)
	};

	return (
		<ButtonGroup>
			<LinkBtn
				link={{ href: `/article/${article.id}/edit` }}
				variant={"secondary"}
				size="sm"
				className="rounded-r-none"
			>
				<Edit3 />
			</LinkBtn>
			<ButtonGroupSeparator orientation="vertical" />

			<ConfirmationDialog
				action={deleteHandler}
				msg="Are you sure you want to delete this article?"
				successMsg="Article deleted🗑️"
			>
				<MyBtn size="sm" variant="secondary" className="text-destructive">
					<Trash2 />
				</MyBtn>
			</ConfirmationDialog>
		</ButtonGroup>
	);
};

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
	const hasLiked = !!likesArr!.find((l) => l == currentUser.id);

	const dislikesArr =
		article.meta?.dislikes?.map((d) => {
			const dislikes = d as IUser;
			return dislikes.id;
		}) ?? [];
	const hasDisliked = !!dislikesArr!.find((d) => d == currentUser.id);

	const likeHandler = async () => {
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
				disabled={isLiking || isDisliking || hasDisliked}
				size="sm"
				variant="outline"
				onClick={likeHandler}
			>
				{isLiking ? <Spinner /> : <ThumbsUp />}
				{likesArr!.length}
			</MyBtn>
			<MyBtn
				disabled={isLiking || isDisliking || hasLiked}
				size="sm"
				variant="outline"
				onClick={dislikeHandler}
				className={cn(hasLiked && "cursor-progress")}
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
