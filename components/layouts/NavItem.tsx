"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export default function NavItem({
	name,
	link,
	icon,
	className,
}: {
	name: string;
	link: string;
	icon: JSX.Element;
	className?: string;
}) {
	const pathname = usePathname();

	const isActive =
		pathname === link || ((link !== "/" || pathname !== link ) && pathname.startsWith(link + "/"));

	return (
		<SidebarMenuItem>
			<Link href={link}>
				<SidebarMenuButton
					tooltip={name}
					className={cn(
						"font-medium",
						className,
						isActive &&
							"text-primary hover:text-primary bg-primary/30 dark:bg-primary/10 font-medium glass-shadow"
					)}
				>
					{icon}
					<motion.span whileHover={{ x: 5 }} whileTap={{ scale: 0.97 }}>
						{name}
					</motion.span>
				</SidebarMenuButton>
			</Link>
		</SidebarMenuItem>
	);
}
