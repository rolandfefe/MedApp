"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import LogoText from "./LogoText";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ThemeBtn } from "../btns/ThemeBtn";
import Heading from "../custom/Heading";
// import { SignedIn } from "@clerk/clerk-react";

export default function OnboardingNav({ className }: { className?: string }) {
	return (
		<nav
			className={cn(
				"flex items-center gap-x-3 justify-between sticky top-0 rounded-xl p-2 glass glass-shadow w-[98%] mx-auto",
				className
			)}
		>
			<div className="flex items-center gap-x-1">
				<Image
					src={"/assets/logo.png"}
					alt="logo"
					width={999}
					height={999}
					className="size-12 rounded-lg"
				/>
				<LogoText className="text-xl md:text-2xl hidden sm:block" />
			</div>

			<Heading className="text-xl md:text-2xl">OnBoarding</Heading>

			<div className="flex items-center gap-x-2">
				<ThemeBtn />
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</nav>
	);
}
