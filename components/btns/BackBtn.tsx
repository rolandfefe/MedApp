"use client";

import React from "react";
import MyBtn from "../custom/MyBtn";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function BackBtn() {
	const router = useRouter();

	return (
		<Tooltip>
			<TooltipTrigger>
				<MyBtn
					size={"icon"}
					onClick={() => router.back()}
					variant={"secondary"}
				>
					<ArrowLeft />
				</MyBtn>
			</TooltipTrigger>

			<TooltipContent>Back</TooltipContent>
		</Tooltip>
	);
}
