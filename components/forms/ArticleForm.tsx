"use client";

import { useArticles } from "@/contexts/Articles.context";
import { useCurrent } from "@/contexts/Current.context";
import { createArticle, updateArticle } from "@/lib/actions/article.actions";
import {
	ArticleFormData,
	ArticleZodSchema,
} from "@/lib/formSchemas/article.schema";
import { cn } from "@/lib/utils";
import {
	eArticleCategories,
	eArticleStatus,
	eArticleType,
} from "@/types/enums/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "@uidotdev/usehooks";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import {
	ChevronsUpDown,
	NotebookTabs,
	PenTool,
	SearchSlash,
	Stars,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
	ComponentProps,
	Dispatch,
	SetStateAction,
	useState,
	useTransition,
} from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Editor } from "../blocks/editor-00/editor";
import LinkBtn from "../btns/LinkBtn";
import ToastErrCard from "../cards/ToastErrCard";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { ShineBorder } from "../ui/shine-border";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ArticleForm({}: {}) {
	const currentDoctor = useCurrent().currentDoctor!;
	const { activeArticle } = useArticles();
	const [categories, setCategories] = useState<eArticleCategories[]>(
		activeArticle?.meta?.categories ?? [] //! fix type errors
	);
	const [contentSerializedState, setContentSerializedState] = useState<
		SerializedEditorState | undefined
	>(activeArticle?.content ?? undefined);
	const [isPending, startTransition] = useTransition();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const router = useRouter();
	const isSmScreen = useMediaQuery("(width <= 640px)");

	// ! Fix form type errors
	const form = useForm<ArticleFormData>({
		resolver: zodResolver(ArticleZodSchema),
		defaultValues: {
			title: activeArticle?.title ?? "",
			description: activeArticle?.description ?? "",
			meta: {
				type: activeArticle?.meta?.type ?? "",
			},
			licensing: {
				isPublic: true,
				copyright: activeArticle?.licensing.copyright ?? "",
				licenseType: activeArticle?.licensing.licenseType ?? "",
			},
		},
	});

	const submitHandler = (data: ArticleFormData, status: eArticleStatus) => {
		const cleanData: IArticle = {
			...data,
			meta: {
				...data.meta,
				categories,
				status,
			},
			content: contentSerializedState,
			authors: [currentDoctor.id],
		};

		if (activeArticle) {
			// Update
			startTransition(async () => {
				const { id } = await toast.promise(
					updateArticle({ ...activeArticle, ...cleanData }),
					{
						loading: "Updating Article...",
						error: "Failed! Please try again🙏",
						success: "Article Updated ✍️",
					},
					{ id: "xnc8nr0348" }
				);
				form.reset();
				setIsSuccess(true);
				router.push(`/article/${id}`);
			});
		} else {
			startTransition(async () => {
				const { id } = await toast.promise(
					createArticle(cleanData),
					{
						loading: "Creating Article...",
						error: "Failed! Please try again🙏",
						success: "Article Created🥳",
					},
					{ id: "034830j30" }
				);
				form.reset();
				setIsSuccess(true);
				router.push(`/article/${id}`);
			});
		}
	};

	const errHandler = async (err: FieldErrors<ArticleFormData>) => {
		console.log("err: ", err);
		toast.custom(
			(t) => (
				<ToastErrCard t={t}>
					{Object.entries(err).map(([k, v]) => (
						<p key={k} className={"text-sm text-secondary-foreground"}>
							<span className="font-medium text-destructive">{k}: </span>
							<code>{v.message}</code>
						</p>
					))}
				</ToastErrCard>
			),
			{ id: "034802jd20" }
		);
	};

	return (
		<Form {...form}>
			<div className="space-y-4">
				{isSmScreen ? (
					<ArticleForm.Essentials
						form={form}
						categories={categories}
						setCategories={setCategories}
					/>
				) : (
					<Collapsible>
						<CollapsibleTrigger
							asChild
							className="cursor-pointer! hover:bg-primary/30 dark:hover:bg-primary/10"
						>
							<div className="relative p-2 rounded-xl border-2 border-primary">
								<div className="space-y-2">
									<p className="text-lg font-medium text-primary flex items-center gep-x-2">
										<Stars />
										<span>Essentials</span>
									</p>
									<p className="text-sm text-muted-foreground">
										Set up the the essential details of your article. These will
										make it more discoverable.
									</p>
								</div>

								<ChevronsUpDown className="text-muted-foreground absolute top-2 right-2" />
							</div>
						</CollapsibleTrigger>

						<CollapsibleContent>
							<ArticleForm.Essentials
								form={form}
								categories={categories}
								setCategories={setCategories}
							/>
						</CollapsibleContent>
					</Collapsible>
				)}

				<section className="space-y-3">
					<div className="leading-tight">
						<p className="text-lg font-medium">Content</p>

						<p className="text-sm text-muted-foreground">
							Write the content of your article bellow.
						</p>
					</div>

					{isSmScreen ? (
						<Drawer>
							<DrawerTrigger asChild>
								<MyBtn size="lg" variant="invert" className="w-full">
									Open Editor <NotebookTabs />
								</MyBtn>
							</DrawerTrigger>
							<DrawerContent className="!min-h-[95vh]">
								<DrawerHeader>
									<DrawerTitle className="flex">
										<Heading className="text-lg text-primary text-center">
											Rich Editor <NotebookTabs />
										</Heading>
									</DrawerTitle>
									<DrawerDescription className="hidden">
										rich editor
									</DrawerDescription>
								</DrawerHeader>

								<ArticleForm.EditorSection
									contentSerializedState={contentSerializedState}
									setContentSerializedState={setContentSerializedState}
								/>
							</DrawerContent>
						</Drawer>
					) : (
						<ArticleForm.EditorSection
							contentSerializedState={contentSerializedState}
							setContentSerializedState={setContentSerializedState}
						/>
					)}
				</section>
			</div>

			<div className="flex items-center justify-center gap-x-5 mt-5">
				<MyBtn
					disabled={isPending}
					size="lg"
					variant="invert"
					onClick={form.handleSubmit(
						(data) => submitHandler(data, eArticleStatus.DRAFT),
						errHandler
					)}
				>
					Draft
				</MyBtn>
				<MyBtn
					disabled={isPending}
					size="lg"
					onClick={form.handleSubmit(
						(data) => submitHandler(data, eArticleStatus.PUBLISHED),
						errHandler
					)}
				>
					{activeArticle ? "Edit article" : "Publish"}
				</MyBtn>
			</div>
		</Form>
	);
}

ArticleForm.Trigger = ({
	className,
	...props
}: ComponentProps<typeof MyBtn>) => {
	const currentDoctor = useCurrent().currentDoctor;

	//? only allow doctors to write articles
	if (!currentDoctor) return;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<LinkBtn
					{...props}
					link={{
						href: `/doctor/${currentDoctor.id}/articles/new`,
						className: className,
					}}
					size={"icon"}
					variant={"secondary"}
					className={cn("rounded-full glass text-primary size-14", className)}
				>
					<ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
					<PenTool size={24} />
				</LinkBtn>
			</TooltipTrigger>
			<TooltipContent>✍️Write article</TooltipContent>
		</Tooltip>
	);
};

ArticleForm.Essentials = ({
	form,
	...props
}: {
	form: ReturnType<typeof useForm<ArticleFormData>>;
} & ComponentProps<typeof ArticleForm.CategoriesSelection>) => {
	return (
		<section className="space-y-4 bg-popover/30 rounded-lg p-3">
			<div className="flex flex-col sm:flex-row sm:items-end gap-3">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Title</FormLabel>

							<FormControl>
								<Input {...field} placeholder="Article title..." />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="licensing.isPublic"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center gap-x-1">
								<FormLabel>Public</FormLabel>

								<FormControl>
									<Checkbox checked={field.value} onChange={field.onChange} />
								</FormControl>
							</div>

							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<FormField
				control={form.control}
				name="description"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Description</FormLabel>

						<FormControl>
							<Textarea
								{...field}
								placeholder="Article title..."
								className="h-50"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="flex flex-col sm:flex-row sm:items-center gap-3">
				<FormField
					control={form.control}
					name="meta.type"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select article type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.entries(eArticleType).map(([k, v]) => (
										<SelectItem value={v} key={k}>
											{v}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="licensing.copyright"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Copyright</FormLabel>

							<FormControl>
								<Input {...field} placeholder="Enter article copyright..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="licensing.licenseType"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>License Type</FormLabel>

							<FormControl>
								<Input {...field} placeholder="Copyright license type..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<ArticleForm.CategoriesSelection {...props} />
		</section>
	);
};

ArticleForm.CategoriesSelection = ({
	categories,
	setCategories,
}: {
	categories: eArticleCategories[];
	setCategories: Dispatch<SetStateAction<eArticleCategories[]>>;
}) => {
	const [q, setQ] = useState<string>("");

	const clickHandler = (isSelected: boolean, category: eArticleCategories) =>
		setCategories((prev) => {
			if (isSelected) {
				return prev.filter((c) => c !== category);
			} else {
				return [...prev, category];
			}
		});

	return (
		<section className="space-y-4">
			<div>
				<p className="text-xl font-medium">Select Categories</p>
				<p className="text-sm text-muted-foreground">
					This will make your article more discoverable
				</p>
			</div>

			<InputGroup>
				<InputGroupAddon align={"inline-start"}>
					<SearchSlash />
				</InputGroupAddon>
				<InputGroupInput
					value={q}
					placeholder="Search category..."
					onChange={(e) => setQ(e.target.value)}
				/>
			</InputGroup>

			<div className="flex items-center gap-2 flex-wrap w-[90%]">
				<AnimatePresence>
					{Object.entries(eArticleCategories).map(([k, v]) => {
						const isSelected = categories.find((c) => c === v);
						if (!k.toLowerCase().startsWith(q)) return;

						return (
							<motion.div
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.3 }}
								layout
								key={k}
							>
								<Badge
									onClick={() => clickHandler(!!isSelected, v)}
									variant={isSelected ? "default" : "secondary"}
									className="cursor-pointer"
								>
									{v}
								</Badge>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>
		</section>
	);
};

ArticleForm.EditorSection = ({
	contentSerializedState,
	setContentSerializedState,
	className,
}: {
	contentSerializedState?: SerializedEditorState<SerializedLexicalNode>;
	setContentSerializedState: Dispatch<
		SetStateAction<SerializedEditorState<SerializedLexicalNode> | undefined>
	>;
	className?: string;
}) => {
	return (
		<div className={className}>
			<Editor
				editorSerializedState={contentSerializedState}
				onSerializedChange={setContentSerializedState}
				className="min-h-[70vh] bg-transparent border-0 sm:border"
			/>
		</div>
	);
};
