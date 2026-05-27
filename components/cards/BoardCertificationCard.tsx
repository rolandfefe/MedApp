"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import {
	BrainCircuit,
	Building2,
	CalendarDays,
	CalendarX2,
	GitCommit,
} from "lucide-react";
import moment from "moment";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import CopyBadge from "../custom/CopyBadge";

export default function BoardCertificationCard({
	certification,
	className,
	...props
}: {
	certification: NonNullable<
		NonNullable<IDoctor["credentials"]["boardCertifications"]>
	>[number];
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={cn("relative bg-transparent", className)}>
			<CardContent>
				<div className="bg-secondary glass-shadow mb-3 p-1 px-2 rounded-lg">
					<p className="flex item-center gap-x-1 font-medium font-mono">
						<Building2 size={20} />
						<span className="line-clamp-1">{certification.boardName}</span>
					</p>
				</div>
				<section className="space-y-2">
					<div className="space-y-2">
						<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
							<BrainCircuit size={18} />
							<span>Certification ID:</span>
						</p>
						{/* <p className="font-mono">{certification.certificationId}</p> */}
						<CopyBadge
							variant="secondary"
							content={certification.certificationId}
						/>
						<Separator />
					</div>

					<div className="flex item-center gap-2">
						<div className="space-y-2 flex-1">
							<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
								<CalendarDays size={18} />
								<span>Issuing date:</span>
							</p>
							<p className="font-mono">
								{moment(certification.date).format("Do-MM-YYYY")}
							</p>
						</div>
						<div className="space-y-2 flex-1">
							<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
								<CalendarX2 size={18} />
								<span>Expiration date:</span>
							</p>
							<p className="font-mono">
								{moment(certification.expirationDate).format("Do-MM-YYYY")}
							</p>
						</div>
					</div>
				</section>

				<Badge
					variant={
						certification.status === "Active" ? "primary-luminous" : "secondary"
					}
					className="absolute bottom-2 right-2 flex items-center gap-1 capitalize"
				>
					<GitCommit size={18} />
					{certification.status}
				</Badge>
			</CardContent>
		</Card>
	);
}
