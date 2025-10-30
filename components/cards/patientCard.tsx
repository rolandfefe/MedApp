import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn, getAge } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Languages } from "lucide-react";
import { Badge } from "../ui/badge";
import { Doctor, Patient, User } from "@/types/payload";

export default function PatientCard({
	patient,
	currentDoctor,
	className,
	variant = "sm",
}: {
	patient: Patient;
	currentDoctor: Doctor;
	className?: string;
	variant?: "sm" | "md" | "lg";
}) {
	const user = patient.user as User;

	if (variant === "sm") {
		return (
			<Card className={cn("", className)}>
				<CardContent className="flex items-start gap-x-2">
					<Avatar className="size-10 sm:size-14 rounded-lg">
						<AvatarImage src={user.imageUrl!} />
						<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
							{user.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<div>
						<div className="leading-tight">
							<p className="line-clamp-1 font-medium">
								<span>{user.fname}</span> <span>{user.lname}</span>
							</p>
							<p className="text-xs text-muted-foreground">{user.email}</p>
						</div>

						<div className="flex items-center gap-x-2">
							<Badge variant={"secondary"}>{patient.gender}</Badge>
							<Badge variant={"secondary"}>{getAge(patient.DOB)}</Badge>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	} else if (variant === "md") {
		return (
			<Card className={cn("", className)}>
				<CardContent className="">
					<Avatar className="size-20 mx-auto rounded-full">
						<AvatarImage src={user.imageUrl!} />
						<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
							{user.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<div className="mt-4 space-y-3">
						<div className="leading-tight text-center">
							<p className="line-clamp-1 font-medium">
								<span>{user.fname}</span> <span>{user.lname}</span>
							</p>
							<p className="text-xs text-muted-foreground">{user.email}</p>
						</div>

						<div className="flex items-center gap-x-1 justify-center">
							<Badge variant={"secondary"}>{patient.gender}</Badge>
							<Badge variant={"secondary"}>{getAge(patient.DOB as Date)}</Badge>
							<Badge variant={"secondary"}>{patient.maritalStatus}</Badge>
						</div>
					</div>
				</CardContent>
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
