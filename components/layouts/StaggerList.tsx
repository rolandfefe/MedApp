"use client";

import { StaggerVariants } from "@/app/MotionVariants";
import { motion, stagger } from "motion/react";
import { ComponentProps } from "react";

export default function StaggerList({
	...props
}: ComponentProps<typeof motion.div>) {
	return (
		<motion.div
			variants={StaggerVariants}
			initial={"hidden"}
			animate={"visible"}
			exit={"hidden"}
			transition={{
				delayChildren: stagger(0.2),
			}}
			{...props}
		>
			{props.children}
		</motion.div>
	);
}
