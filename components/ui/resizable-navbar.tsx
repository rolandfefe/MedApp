"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";

import React, { JSX, useRef, useState } from "react";
import MyBtn from "../custom/MyBtn";
import { useRouter } from "next/navigation";
import LogoText from "../layouts/LogoText";

interface NavbarProps {
	children: React.ReactNode;
	className?: string;
}

interface NavBodyProps {
	children: React.ReactNode;
	className?: string;
	visible?: boolean;
}

interface NavItemsProps {
	items: {
		name: string;
		link: string;
		icon: JSX.Element;
	}[];
	showIcons?: boolean;
	className?: string;
	onItemClick?: () => void;
}

interface MobileNavProps {
	children: React.ReactNode;
	className?: string;
	visible?: boolean;
}

interface MobileNavHeaderProps {
	children: React.ReactNode;
	className?: string;
}

interface MobileNavMenuProps {
	children: React.ReactNode;
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const [visible, setVisible] = useState<boolean>(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest > 100) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	});

	return (
		<motion.div
			ref={ref}
			// IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
			className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
		>
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(
							child as React.ReactElement<{ visible?: boolean }>,
							{ visible }
					  )
					: child
			)}
		</motion.div>
	);
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
	return (
		<motion.div
			// Modified
			initial={{
				backdropFilter: "blur(10px)",
				boxShadow:
					"0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
			}}
			animate={{
				width: visible ? "40%" : "100%",
				y: visible ? 20 : 0,
			}}
			transition={{
				type: "spring",
				stiffness: 200,
				damping: 50,
			}}
			style={{
				minWidth: "800px",
			}}
			className={cn(
				"relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-2xl glass px-4 py-2 md:flex",
				// visible && "bg-secondary/80 dark:bg-secondary/80",
				className
			)}
		>
			{children}
		</motion.div>
	);
};

export const NavItems = ({
	items,
	className,
	onItemClick,
	showIcons,
}: NavItemsProps) => {
	const [hovered, setHovered] = useState<number | null>(null);

	return (
		<motion.div
			onMouseLeave={() => setHovered(null)}
			className={cn(
				"absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 md:flex md:space-x-2",
				className
			)}
		>
			{items.map((item, idx) => (
				<Link
					onMouseEnter={() => setHovered(idx)}
					onClick={onItemClick}
					className="flex items-center gap-x-1 relative px-4 py-2 text-primary"
					key={`link-${idx}`}
					href={item.link}
				>
					{hovered === idx && (
						<motion.div
							layoutId="hovered"
							className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
						/>
					)}
					{showIcons && (
						<span className="relative z-20 text-sm">{item.icon}</span>
					)}
					<span className="relative z-20">{item.name}</span>
				</Link>
			))}
		</motion.div>
	);
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
	return (
		<motion.div
			initial={{
				backdropFilter: "blur(10px)",
				boxShadow:
					"0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
			}}
			animate={{
				width: visible ? "90%" : "100%",
				paddingRight: visible ? "12px" : "0px",
				paddingLeft: visible ? "12px" : "0px",
				borderRadius: visible ? "4px" : "2rem",
				y: visible ? 20 : 0,
			}}
			transition={{
				type: "spring",
				stiffness: 200,
				damping: 50,
			}}
			className={cn(
				"relative z-50 mx-auto !rounded-2xl flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between  px-0 py-2 md:hidden",
				className
			)}
		>
			{children}
		</motion.div>
	);
};

export const MobileNavHeader = ({
	children,
	className,
}: MobileNavHeaderProps) => {
	return (
		<div
			className={cn(
				"flex w-full flex-row items-center justify-between pe-2",
				className
			)}
		>
			{children}
		</div>
	);
};

export const MobileNavMenu = ({
	children,
	className,
	isOpen,
	onClose,
}: MobileNavMenuProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn(
						"absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg glass bg-secondary/80 px-4 py-8 glass-shadow",
						className
					)}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const MobileNavToggle = ({
	isOpen,
	onClick,
}: {
	isOpen: boolean;
	onClick: () => void;
}) => {
	return isOpen ? (
		<X className="text-black dark:text-white" onClick={onClick} />
	) : (
		<Menu className="text-black dark:text-white" onClick={onClick} />
	);
};

export const NavbarLogo = () => {
	return (
		<Link
			href="/"
			className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
		>
			<Image
				// src="/assets/logo_transparent.png"
				src="/assets/logo.png"
				alt="logo"
				width={999}
				height={999}
				className="size-10 rounded-lg "
			/>
			<LogoText className="text-2xl" />
		</Link>
	);
};

export const NavbarButton = ({
	href,
	children,
	className,
	variant = "primary",
	...props
}: {
	href: string;
	children: React.ReactNode;
	className?: string;
	variant?: "primary" | "secondary" | "dark" | "gradient";
}) =>
	// & (
	// 	| React.ComponentPropsWithoutRef<"a">
	// 	| React.ComponentPropsWithoutRef<"button">
	// )
	{
		const router = useRouter();
		const baseStyles =
			"px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

		const variantStyles = {
			primary:
				"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
			secondary: "bg-transparent shadow-none dark:text-white",
			dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
			gradient:
				"bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
		};

		return (
			<Link
				// onClick={() => router.push(href)}
				href={href!}
				className={cn(baseStyles, variantStyles[variant], className)}
				{...props}
			>
				{children}
			</Link>
		);
	};
