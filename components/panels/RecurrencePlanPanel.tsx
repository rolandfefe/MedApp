"use client";

import { ComponentProps } from "react";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
import Heading from "../custom/Heading";
import { CalendarClock } from "lucide-react";
import { useConsultation } from "@/contexts/consultation.context";
import { Separator } from "../ui/separator";
import RecurrencePlanAside from "../asides/RecurrencePlanAside";
import { cn } from "@/lib/utils";

export default function RecurrencePlanPanel({
	children,
	className,
	...props
}: ComponentProps<typeof FormPanelTrigger>) {
	const { appointment } = useConsultation();
	const patient = appointment.patient as IPatient;

	return (
		<FormPanel>
			<FormPanelTrigger {...props} asChild className={cn("", className)}>
				{children}
			</FormPanelTrigger>
			<FormPanelContent>
				{/* <ScrollArea className="h-[90vh] mb-4"> */}
				<section>
					<Heading className="text-xl sm:text-2xl font-medium">
						<span className="text-primary flex item-center gap-x-2">
							<CalendarClock />
							{patient.user.fname}'s
						</span>

						<span>Recurrence Plan</span>
					</Heading>
				</section>
				<Separator className="mt-2 mb-4" />
				<RecurrencePlanAside />
				{/* </ScrollArea> */}
			</FormPanelContent>
		</FormPanel>
	);
}
