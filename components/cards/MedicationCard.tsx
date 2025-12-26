"use client";

import { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { AlertCircle, BrainCircuit, Pill, ShieldHalf } from "lucide-react";
import moment from "moment";
import { Badge } from "../ui/badge";
import Heading from "../custom/Heading";

export default function MedicationCard({
	medication,
	className,
	...props
}: {
	medication: NonNullable<
		NonNullable<IVerdict["treatmentPlan"]["medications"]>[number]
	>;
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={cn("bg-transparent", className)}>
			<CardContent className="space-y-2">
				<div className="flex items-center justify-between">
					{/* <Heading className="flex item-center gap-x-1 font-medium"> */}
					<Heading className="text-primary sm:text-lg font-medium">
						<Pill size={20} />
						<span>{medication.name}</span>
					</Heading>

					<div className="flex items-center gap-x-1">
						<Badge variant="primary-luminous">{medication.dosage}</Badge>
						<span>~</span>
						<Badge variant={"secondary"}>{medication.route}</Badge>
					</div>
				</div>

				<Separator className="mb-3 mt-1" />

				<div className="font-mono bg-muted/70 p-2 rounded-lg">
					<p className="flex items-center gap-x-1 text-sm font-medium">
						<AlertCircle size={15} />
						<span>Instructions:</span>
					</p>

					<p className="text-xs text-muted-foreground">
						{medication.instructions}
					</p>
				</div>

				<Accordion type="single" collapsible className="border px-2 rounded-lg">
					<AccordionItem value="item-1">
						<AccordionTrigger>
							<ShieldHalf size={20} />
							<span>Side Effects</span>
						</AccordionTrigger>
						<AccordionContent className="text-sm font-mono text-muted-foreground">
							{medication.sideEffects}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>
							<BrainCircuit size={20} />
							<span>Reason</span>
						</AccordionTrigger>
						<AccordionContent className="text-sm font-mono text-muted-foreground">
							{medication.reason}
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<div className="flex items-center gap-x-2">
					<div className="flex-1 px-2 py-1 rounded-lg border bg-muted/50 glass-shadow">
						<p className="text-xs sm:text-sm text-muted-foreground">Start:</p>
						<p className="text-sm sm:text-base font-medium">
							{moment(medication.startDate).format("Do-MM-YYYY")}
						</p>
					</div>
					<div className="flex-1 px-2 py-1 rounded-lg border bg-muted/50 glass-shadow">
						<p className="text-xs sm:text-sm text-muted-foreground">End:</p>
						<p className="text-sm sm:text-base font-medium">
							{moment(medication.endDate).format("Do-MM-YYYY")}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
