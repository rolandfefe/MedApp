"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import MyBtn from "../custom/MyBtn";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function BackBtn({ ...props }: ComponentProps<typeof MyBtn>) {
	const router = useRouter();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<MyBtn
					size={"icon"}
					onClick={() => router.back()}
					variant={"secondary"}
					{...props}
				>
					<ArrowLeft />
				</MyBtn>
			</TooltipTrigger>

			<TooltipContent>Back</TooltipContent>
		</Tooltip>
	);
}
