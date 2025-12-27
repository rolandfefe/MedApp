"use client";

import { useArticles } from "@/contexts/Articles.context";
import { NotebookTabs } from "lucide-react";
import LinkBtn from "../btns/LinkBtn";
import ArticleCard from "../cards/ArticleCard";
import Void from "../custom/Void";
import { motion, stagger, Variants } from "motion/react";
import { useCurrent } from "@/contexts/Current.context";
import ArticleForm from "../forms/ArticleForm";

const motionVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.5,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

export default function ArticlesFeed() {
	const { articles } = useArticles();
	const currentDoctor = useCurrent().currentDoctor;

	console.log(articles);

	return (
		<div>
			<motion.section
				variants={motionVariants}
				initial="hidden"
				animate="visible"
				transition={{
					delayChildren: stagger(0.3),
				}}
				// className="flex items-center gap-3 flex-wrap"
				className="space-y-2"
			>
				{articles.length > 0 ? (
					articles.map((article) => (
						<motion.div
							variants={motionVariants}
							layout
							whileHover={{
								scale: 1.01,
							}}
							whileTap={{ scale: 1 }}
							className="flex-1 basis-full sm:basis-[45%]"
						>
							<ArticleCard article={article} />
						</motion.div>
					))
				) : (
					<div>
						<Void msg="No articles😭 Click button bellow to create an article👇." />
						{currentDoctor && (
							<LinkBtn
								link={{
									href: `/doctor/${currentDoctor.id}/articles/new`,
								}}
								className="flex mx-auto mt-3"
							>
								New article <NotebookTabs />
							</LinkBtn>
						)}{" "}
					</div>
				)}
			</motion.section>

			{currentDoctor && (
				<ArticleForm.Trigger className="fixed bottom-3 right-3" />
			)}
		</div>
	);
}

ArticlesFeed.Related = () => {
	const { articles } = useArticles();
	const currentDoctor = useCurrent().currentDoctor;

	return (
		<motion.section
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{
				delayChildren: stagger(0.3),
			}}
			className="space-y-3"
		>
			{articles.length > 0 ? (
				articles.map((article) => (
					<motion.div
						variants={motionVariants}
						layout
						whileHover={{
							scale: 1.01,
						}}
						whileTap={{ scale: 1 }}
						className="flex-1 basis-full sm:basis-[45%]"
					>
						<ArticleCard.SM article={article} />
					</motion.div>
				))
			) : (
				<Void msg="No articles😭 Click button bellow to create an article👇." />
			)}
		</motion.section>
	);
};
