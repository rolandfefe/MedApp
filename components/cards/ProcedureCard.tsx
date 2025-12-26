"use client";

import { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

export default function ProcedureCard({
	procedure,
	className,
	...props
}: {
	procedure: NonNullable<
		NonNullable<IVerdict["treatmentPlan"]["procedures"]>[number]
	>;
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={cn("bg-transparent", className)}>
			<CardContent>{procedure.name}</CardContent>
		</Card>
	);
}
