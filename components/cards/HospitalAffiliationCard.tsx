"use client";

import { cn } from "@/lib/utils";
import {
	CalendarDays,
	CalendarX2,
	Crosshair,
	GitFork,
	GitMerge,
} from "lucide-react";
import moment from "moment";
import { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export default function HospitalAffiliationCard({
	hospital,
	className,
	...props
}: {
	hospital: NonNullable<
		NonNullable<IDoctor["credentials"]["hospitalAffiliations"]>
	>[number];
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={cn("relative bg-transparent", className)}>
			<CardContent>
				<div className="bg-secondary glass-shadow mb-3 p-1 px-2 rounded-lg">
					<p className="flex item-center gap-x-1 font-medium font-mono">
						<Crosshair size={20} />
						<span className="line-clamp-1">{hospital.name}</span>
					</p>
				</div>
				<section className="space-y-2">
					<div className="space-y-2">
						<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
							<GitMerge size={18} />
							<span>Department:</span>
						</p>
						<p className="font-mono">{hospital.department}</p>
						<Separator />
					</div>
					<div className="space-y-2">
						<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
							<GitFork size={18} />
							<span>Rolls:</span>
						</p>
						<p className="font-mono">{hospital.roles.join(", ")}</p>
						<Separator />
					</div>
					<div className="flex item-center gap-2">
						<div className="space-y-2 flex-1">
							<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
								<CalendarDays size={18} />
								<span>Start date:</span>
							</p>
							<p className="font-mono">
								{moment(hospital.startDate).format("Do-MM-YYYY")}
							</p>
						</div>

						<div className="space-y-2 flex-1">
							<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
								<CalendarX2 size={18} />
								<span>End date:</span>
							</p>
							<p className="font-mono">
								{moment(hospital.endDate).format("Do-MM-YYYY")}
							</p>
						</div>
					</div>
				</section>
			</CardContent>
		</Card>
	);
}
