"use client";

import { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import Heading from "../custom/Heading";
import { CalendarClock, GitCommit, HandHelping } from "lucide-react";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Badge } from "../ui/badge";

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
			<CardContent>
				<div className="flex items-center justify-between gap-x-3">
					<Heading className="text-primary">
						<HandHelping />
						{procedure.name}
					</Heading>

					<Badge variant={"primary-luminous"}>{procedure.type}</Badge>
				</div>
				<Separator className="mt-1 mb-2" />

				<div className="font-mono space-y-3">
					<div className="flex-1 p-2 rounded-lg border bg-muted/50 glass-shadow space-y-2">
						<p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-x-1">
							<CalendarClock size={18} />
							Date:
						</p>
						<p className="text-sm sm:text-base font-medium">
							{moment(procedure.scheduledDate).format("Do-MM-YYYY")}
						</p>
					</div>
					<div className="flex-1 p-2 rounded-lg border bg-muted/50 glass-shadow space-y-2">
						<p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-x-1">
							<GitCommit size={18} />
							Status:
						</p>
						<p className="text-sm sm:text-base font-medium">
							<Badge variant="secondary">{procedure.status}</Badge>
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
