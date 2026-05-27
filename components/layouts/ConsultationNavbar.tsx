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
import LinkBtn from "../btns/LinkBtn";
import { Home, LayoutDashboard } from "lucide-react";
import { useCurrent } from "@/contexts/Current.context";

export default function ConsultationNavbar({
	className,
}: {
	className?: string;
}) {
	const pathname = usePathname();
	const currentDoctor = useCurrent().currentDoctor;

	return (
		<nav
			className={cn(
				"glass p-2 h-[7vh] sticky top-3 right-0 z-30 w-[97%] sm:w-[99%] mx-auto flex items-center justify-between gap-x-2 rounded-xl glass-shadow",
				className
			)}
		>
			<div className="flex items-center gap-x-2">
				{/* <SidebarTrigger className=" " /> */}
				{currentDoctor ? (
					<LinkBtn
						link={{ href: `/doctor/${currentDoctor.id}` }}
						size="icon"
						variant="secondary"
					>
						<LayoutDashboard />
					</LinkBtn>
				) : (
					<LinkBtn link={{ href: `/home` }} size="icon" variant="secondary">
						<Home />
					</LinkBtn>
				)}
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
