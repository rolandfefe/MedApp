"use client"

import React, { ComponentProps } from "react";
import { Badge } from "../ui/badge";
import { Copy } from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import toast from "react-hot-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

export default function CopyBadge({
	tooltipMsg = "Copy to clipboard📋",
	successMsg = "Copied",
	content,
	className,
	...props
}: {
	tooltipMsg?: string;
	successMsg?: string;
	content: string;
} & ComponentProps<typeof Badge>) {
	const [_, copyAction] = useCopyToClipboard();

	const copyHandler = async () => {
		await copyAction(content);
		toast(successMsg, { icon: "📋", id: "cn22039x8adf" });
	};

	return (
		<Tooltip>
			<TooltipTrigger>
				<Badge
					{...props}
					onClick={copyHandler}
					className={cn("flex items-center gap-x-1 cursor-pointer", className)}
				>
					<Copy size={18} />
					<span>{content}</span>
				</Badge>
			</TooltipTrigger>

			<TooltipContent>{tooltipMsg}</TooltipContent>
		</Tooltip>
	);
}
