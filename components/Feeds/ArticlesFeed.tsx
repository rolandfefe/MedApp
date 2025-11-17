"use client";

import { useArticles } from "@/contexts/Articles.context";
import { NotebookTabs } from "lucide-react";
import LinkBtn from "../btns/LinkBtn";
import ArticleCard from "../cards/ArticleCard";
import Void from "../custom/Void";
import { motion, stagger, Variants } from "motion/react";
import { useCurrent } from "@/contexts/Current.context";

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

	return (
		<div>
			<motion.section
				variants={motionVariants}
				initial="hidden"
				animate="visible"
				transition={{
					delayChildren: stagger(0.3),
				}}
			>
				{articles.length > 0 ? (
					articles.map((article) => (
						<motion.div variants={motionVariants}>
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
								className="flex mx-auto mb-3"
							>
								New article <NotebookTabs />
							</LinkBtn>
						)}{" "}
					</div>
				)}
			</motion.section>
		</div>
	);
}
