"use client";

import React from "react";
import { Skeleton } from "./ui/skeleton";
import { HealthStatusFormPanel } from "./forms/healthStatusForm";
import MyBtn from "./custom/MyBtn";
import { PlusCircle } from "lucide-react";
import { useCurrent } from "@/contexts/Current.context";

export default function HealthStatusDashboard({
	healthStatuses,
}: {
	healthStatuses: IHealthStatus[];
}) {
	const patient = useCurrent().currentPatient!;

	return (
		<div>
			<section className="flex flex-col sm:flex-row items-center gap-x-3 justify-between">
				{[...Array(2)].map((_, i) => (
					<Skeleton key={i} className=" flex-1 h-36 rounded-xl" />
				))}
				<HealthStatusFormPanel action="Create">
					<MyBtn variant={"secondary"} className="text-primary h-36">
						New Check-up
						<PlusCircle />
					</MyBtn>
				</HealthStatusFormPanel>
			</section>
		</div>
	);
}
