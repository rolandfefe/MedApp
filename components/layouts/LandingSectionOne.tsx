"use client";

import React from "react";
import { Magnetic } from "../motion-primitives/magnetic";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useRouter } from "next/navigation";
import { Stars } from "lucide-react";
import Orb from "../ui/orb";
import Image from "next/image";
import LogoText from "./LogoText";
import { cn } from "@/lib/utils";

export default function LandingSectionOne({
	className,
}: {
	className?: string;
}) {
	const router = useRouter();

	return (
		<section className={cn("", className)}>
			<div className="h-[70vh] !w-3/4 absolute -z-10 left-1/2 -translate-x-1/2">
				<Orb
					hoverIntensity={0.5}
					rotateOnHover={true}
					hue={0}
					forceHoverState={false}
				/>
			</div>

			<div className="my">
				<div className="w-fit mx-auto">
					<Image
						src="/assets/logo_transparent.png"
						alt="logo"
						width={999}
						height={999}
						className="size-40"
					/>
					<LogoText className="text-center text-3xl -mt-7" />
				</div>

				<div className="w-fit mx-auto mt-3">
					<Magnetic actionArea="global" intensity={0.4}>
						<HoverBorderGradient
							containerClassName="rounded-full"
							as="button"
							onClick={() => router.push("/home")}
							className="cursor-pointer w-fit dark:bg-black bg-white text-black dark:text-white inline-flex items-center space-x-2 text-center"
						>
							<Stars />
							<Magnetic actionArea="global" intensity={0.2}>
								<span>Get Started</span>
							</Magnetic>
						</HoverBorderGradient>
					</Magnetic>
				</div>
			</div>
		</section>
	);
}
