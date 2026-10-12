import { Variants } from "motion/react";

export const StaggerVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 17,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: 17,
	},
};
