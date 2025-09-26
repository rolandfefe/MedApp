"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useSidebar } from "../ui/sidebar";
import LogoText from "./LogoText";

export default function AppSidebarHeader() {
	const { state } = useSidebar();

	const headerVariants = {
		visible: { x: 0, opacity: 1 },
		hidden: { x: -140, opacity: 0 },
		exit: { x: -140, opacity: 0 },
	};

	return (
		<Link href="/" className="flex items-center gap-x-2">
			<Image
				src="/assets/logo.png"
				alt="logo"
				width={999}
				height={999}
				priority
				className="object-cover rounded-lg size-12"
			/>
			<AnimatePresence>
				{state === "expanded" && (
					<motion.div
						variants={headerVariants}
						initial="hidden"
						animate="visible"
						exit={"exit"}
						transition={{ staggerChildren: 0.3 }}
						className="leading-1 "
					>
						<motion.div
							variants={headerVariants}
							// className="h-5"
						>
							<LogoText className="text-2xl" />
						</motion.div>
						<motion.p
							variants={headerVariants}
							className="text-sm text-muted-foreground truncate font-medium"
						>
							Saving lives🩺
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</Link>
	);
}
