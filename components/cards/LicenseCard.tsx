"use client";

import { cn } from "@/lib/utils";
import { CalendarX2, CreditCard, Flag, GitCommit } from "lucide-react";
import moment from "moment";
import { ComponentProps } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export default function LicenseCard({
	license,
	className,
	...props
}: {
	license: NonNullable<NonNullable<IDoctor["credentials"]["licenses"]>>[number];
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={cn("relative bg-transparent", className)}>
			<CardContent>
				<div className="bg-secondary glass-shadow mb-3 p-1 px-2 rounded-lg">
					<p className="flex item-center gap-x-1 font-medium font-mono">
						<CreditCard size={20} />
						<span>{license.licenseNumber}</span>
					</p>
				</div>

				<section className="space-y-2">
					<div className="space-y-2">
						<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
							<Flag size={18} />
							<span>State:</span>
						</p>
						<p className="font-mono">{license.issuingState}</p>
						<Separator />
					</div>
					<div className="space-y-2">
						<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
							<GitCommit size={18} />
							<span>Status:</span>
						</p>
						{/* <p className="font-mono">{license.status}</p> */}
						<Badge
							variant={
								license.status === "Active" ? "primary-luminous" : "secondary"
							}
						>
							{license.status}
						</Badge>
						<Separator />
					</div>
					<div className="space-y-2">
						<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
							<CalendarX2 size={18} />
							<span>Expiration date:</span>
						</p>
						<p className="font-mono">
							{moment(license.expirationDate).format("Do-MM-YYYY")}
						</p>
					</div>
				</section>

				<Badge variant="primary-luminous" className="absolute bottom-2 right-2">
					{license.type}
				</Badge>
			</CardContent>
		</Card>
	);
}
