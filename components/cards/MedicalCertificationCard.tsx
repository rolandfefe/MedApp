"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import { Building, Calendar1, GraduationCap } from "lucide-react";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Badge } from "../ui/badge";

export default function MedicalCertificationCard({
	certification,
	className,
	...props
}: {
	certification: NonNullable<
		NonNullable<IDoctor["credentials"]["medicalCertifications"]>
	>[number];
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={cn("relative bg-transparent", className)}>
			<CardContent>
				<div className="bg-secondary glass-shadow mb-3 p-1 px-2 rounded-lg">
					<p className="flex item-center gap-x-1 font-medium">
						<GraduationCap size={20} />
						<span>{certification.name}</span>
					</p>
				</div>

				<section className="space-y-2">
					<div className="space-y-2">
						<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
							<Building size={18} />
							<span>Institution:</span>
						</p>
						<p className="font-mono">{certification.institution}</p>
						<Separator />
					</div>
					<div className="space-y-2">
						<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
							<Calendar1 size={18} />
							<span>Date:</span>
						</p>
						<p className="font-mono">
							{moment(certification.date).format("Do-MM-YYYY")}
						</p>
					</div>
				</section>

				<Badge variant="primary-luminous" className="absolute bottom-2 right-2">
					{certification.type}
				</Badge>
			</CardContent>
		</Card>
	);
}
