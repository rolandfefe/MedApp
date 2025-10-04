import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

export default function AppointmentCard({
	appointment,
	currentDoctor,
	currentPatient,
	variant = "md",
	mode,
	className,
}: {
	appointment: IAppointment;
	currentPatient?: IPatient;
	currentDoctor?: IDoctor;
	variant: "sm" | "md" | "lg";
	mode: "Patient" | "Doctor";
	className?: string;
}) {
	if (variant === "sm") {
		return (
			<Card className={cn("", className)}>
				<CardContent></CardContent>
			</Card>
		);
	} else if (variant === "md") {
		return (
			<Card className={cn("", className)}>
				<CardContent></CardContent>
			</Card>
		);
	} else if (variant === "lg") {
		return (
			<Card className={cn("", className)}>
				<CardContent></CardContent>
			</Card>
		);
	}
}
