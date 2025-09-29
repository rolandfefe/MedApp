"use client";

import { cn, getNavItem } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import LogoText from "./LogoText";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ThemeBtn } from "../btns/ThemeBtn";
import Heading from "../custom/Heading";
import { SidebarTrigger } from "../ui/sidebar";
import BackBtn from "../btns/BackBtn";
import { useParams, usePathname } from "next/navigation";
// import { SignedIn } from "@clerk/clerk-react";

export default function DoctorNavbar({ className }: { className?: string }) {
	const { id } = useParams();
	const pathname = usePathname();

	return (
		<nav
			className={cn(
				"flex items-center gap-x-3 justify-between sticky top-0 rounded-xl p-2 glass glass-shadow w-[98%] mx-auto mt-2",
				className
			)}
		>
			<div className="flex items-center gap-x-2">
				<SidebarTrigger />
				<BackBtn />
			</div>

			<Heading className="text-xl md:text-2xl">
				{getNavItem(pathname, "Doctor", id as string)?.name}
			</Heading>

			<div className="flex items-center gap-x-2">
				<ThemeBtn />
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</nav>
	);
}
