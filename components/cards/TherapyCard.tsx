"use client";

import { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Heading from "../custom/Heading";
import { Badge } from "../ui/badge";
import { Flower, GitMerge, Terminal, TerminalIcon } from "lucide-react";

export default function TherapyCard({
	therapy,
	className,
	...props
}: {
	therapy: NonNullable<
		NonNullable<IVerdict["treatmentPlan"]["therapies"]>[number]
	>;
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={cn("bg-transparent relative", className)}>
			<CardContent className="">
				<div className="flex items-center justify-between">
					<Heading className="text-primary capitalize ">
						<Flower />
						<span>{therapy.name}</span>
					</Heading>
				</div>
				<Separator className="mt-1 mb-3" />
				<div className="font-mono">
					<p className="flex items-center gap-x-2">
						<GitMerge size={18} className="text-muted-foreground" />
						<span>{therapy.frequency}</span>
					</p>
					<p className="flex items-center gap-x-2">
						<Terminal size={18} className="text-muted-foreground" />
						<span>{therapy.duration}</span>
					</p>
				</div>
				<Badge variant="primary-luminous" className="absolute bottom-2 right-2">
					{therapy.type}
				</Badge>
			</CardContent>
		</Card>
	);
}
