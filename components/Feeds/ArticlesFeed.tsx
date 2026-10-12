"use client";

import { useArticles } from "@/contexts/Articles.context";
import { NotebookTabs } from "lucide-react";
import LinkBtn from "../btns/LinkBtn";
import ArticleCard from "../cards/ArticleCard";
import Void from "../custom/Void";
import { motion, stagger, Variants } from "motion/react";
import { useCurrent } from "@/contexts/Current.context";
import ArticleForm from "../forms/ArticleForm";
import { useMediaQuery } from "@uidotdev/usehooks";
import StaggerList from "../layouts/StaggerList";
import { StaggerVariants } from "@/app/MotionVariants";

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
	const isSmScreen = useMediaQuery("(width < 640px)");

	return (
		<div>
			<StaggerList className="space-y-2">
				{articles.length > 0 ? (
					articles.map((article) => (
						<motion.div
							layout
							variants={StaggerVariants}
							transition={{ ease: "easeOut", duration: 0.5 }}
							whileHover={{
								scale: 1.01,
							}}
							whileTap={{ scale: 1 }}
							key={article.id}
							className="flex-1 basis-full sm:basis-[45%]"
						>
							{isSmScreen ? (
								<ArticleCard.MD article={article} />
							) : (
								<ArticleCard article={article} />
							)}
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
			</StaggerList>

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
