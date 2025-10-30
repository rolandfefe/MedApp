"use client";

import { cn, getNavItem } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";
import BackBtn from "../btns/BackBtn";
import { ThemeBtn } from "../btns/ThemeBtn";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { SidebarTrigger } from "../ui/sidebar";

export default function Navbar({ className }: { className?: string }) {
	const pathname = usePathname();

	return (
		<nav
			className={cn(
				"glass p-2 h-[7vh] sticky top-3 right-0 z-40 w-[97%] sm:w-[99%] mx-auto flex items-center justify-between gap-x-2 rounded-xl glass-shadow",
				className
			)}
		>
			<div className="flex items-center gap-x-2">
				<SidebarTrigger />
				<BackBtn />
			</div>

			<Heading className="text-xl md:text-2xl">
				{getNavItem(pathname, "Patient")?.name}
			</Heading>

			<div className="flex items-center gap-x-2">
				<ThemeBtn />
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<SignInButton mode="modal">
						<MyBtn>Sign in</MyBtn>
					</SignInButton>
					{/* <SignUpButton mode="modal">
						<MyBtn variant={"outline"}>Sign up</MyBtn>
					</SignUpButton> */}
				</SignedOut>
			</div>
		</nav>
	);
}
