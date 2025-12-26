"use client";

import { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

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
		<Card {...props} className={cn("bg-transparent", className)}>
			<CardContent>{therapy.name}</CardContent>
		</Card>
	);
}
