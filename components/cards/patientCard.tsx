import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

export default function PatientCard({
	patient,
	currentDoctor,
	className,
	variant,
}: {
	patient: IPatient;
	currentDoctor: IDoctor;
	className?: string;
	variant: "sm" | "md" | "lg";
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
