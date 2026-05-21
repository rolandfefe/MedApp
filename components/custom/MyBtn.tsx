"use client";

import React, { ComponentProps } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export default function MyBtn({ children, ...props }: ComponentProps<typeof Button>) {
	return (
		<Button
			{...props}
			render={
				<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
					{children}
				</motion.button>
			}
		/>
	);
}
