"use client";

import React, { ComponentProps } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export default function MyBtn({ ...props }: ComponentProps<typeof Button>) {
	return (
		<Button asChild {...props}>
			<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
				{props.children}
			</motion.button>
		</Button>
	);
}
