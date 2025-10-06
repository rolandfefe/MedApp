import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn, getAge } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Languages } from "lucide-react";
import { Badge } from "../ui/badge";

export default function PatientCard({
	patient,
	currentDoctor,
	className,
	variant = "sm",
}: {
	patient: IPatient;
	currentDoctor: IDoctor;
	className?: string;
	variant?: "sm" | "md" | "lg";
}) {
	const user = patient.user as IUser;

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
							<Badge variant={"secondary"}>{getAge(patient.DOB as Date)}</Badge>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	} else if (variant === "md") {
		return (
			<Card className={cn("", className)}>
				<CardContent className="flex items-start gap-x-2">
					<Avatar className="size-10 sm:size-12 rounded-lg">
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
							<p className="text-xs text-muted-foreground"></p>
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
