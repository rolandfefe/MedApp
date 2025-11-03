"use client"

import React, { ComponentProps } from "react";
import MyBtn from "../custom/MyBtn";
import LinkBtn from "./LinkBtn";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ConsultationGuideBtn({
	className,
	// children,
	...props
}: ComponentProps<typeof DropdownMenuTrigger>) {

  const pathname = usePathname()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger {...props} className={cn("", className)}>
				<MyBtn></MyBtn>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<LinkBtn link={{href: ``}} >
					Verdict <ArrowRightCircle />
				</LinkBtn>
				<DropdownMenuItem>
					Verdict <ArrowRightCircle />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
