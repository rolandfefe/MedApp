"use client";

import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import BackBtn from "../btns/BackBtn";
import { ThemeBtn } from "../btns/ThemeBtn";
import ChatContainer from "../ChatContainer";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { SidebarTrigger } from "../ui/sidebar";

export default function ConsultationNavbar({
	className,
}: {
	className?: string;
}) {
	const pathname = usePathname();

	return (
		<nav
			className={cn(
				"glass p-2 h-[7vh] sticky top-3 right-0 z-30 w-[97%] sm:w-[99%] mx-auto flex items-center justify-between gap-x-2 rounded-xl glass-shadow",
				className
			)}
		>
			<div className="flex items-center gap-x-2">
				<SidebarTrigger className=" " />
				<BackBtn />
			</div>

			<Heading className="text-xl md:text-2xl capitalize">
				{pathname.split("/")[3] || "Consultation"}
			</Heading>

			<div className="flex items-center gap-x-2">
				<ThemeBtn />

				{pathname.split("/")[3] && <ChatContainer.Panel />}
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<SignInButton mode="modal">
						<MyBtn>Sign in</MyBtn>
					</SignInButton>
				</SignedOut>
			</div>
		</nav>
	);
}
