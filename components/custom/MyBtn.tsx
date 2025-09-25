"use client";

import React, { ComponentProps } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export default function MyBtn({ ...props }: ComponentProps<typeof Button>) {
	return (
		<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.99 }}>
			<Button {...props}>{props.children}</Button>
		</motion.div>
	);
}
