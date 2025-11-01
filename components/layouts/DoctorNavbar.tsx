"use client";

import { cn, getNavItem } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";
import BackBtn from "../btns/BackBtn";
import { ThemeBtn } from "../btns/ThemeBtn";
import Heading from "../custom/Heading";
import { SidebarTrigger } from "../ui/sidebar";
// import { SignedIn } from "@clerk/clerk-react";

export default function DoctorNavbar({
	className,
	doctorNav,
}: {
	className?: string;
	doctorNav: IDoctorNav;
}) {
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
				{getNavItem(pathname, doctorNav.items!)?.name}
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
