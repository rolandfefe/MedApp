"use client";

import { useCurrent } from "@/contexts/Current.context";
import { cn, getAge } from "@/lib/utils";
import { Patient, User } from "@/types/payload";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ComponentProps } from "react";

export default function PatientCard({
	patient,
	className,
}: {
	patient: Patient;
	className?: string;
}) {
	const user = patient.user as User;
	const currentPatient = useCurrent().currentPatient as IPatient;
	const currentDoctor = useCurrent().currentDoctor as IDoctor;

	return (
		<Card className={cn("bg-transparent hover:bg-muted/30", className)}>
			<CardContent className="space-y-2">
				<section className="flex items-start gap-x-2">
					<Avatar className="size-10 rounded-lg">
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
					</div>
				</section>

				<section className="flex items-center gap-x-1">
					<Badge variant={"secondary"} className="flex-1">
						{patient.gender}
					</Badge>
					<Badge variant={"secondary"} className="flex-1">
						{getAge(patient.DOB)}
					</Badge>
					<Badge variant={"secondary"} className="flex-1">
						{patient.maritalStatus}
					</Badge>
				</section>
			</CardContent>
		</Card>
	);
}

PatientCard.SM = ({
	patient,
	className,
}: ComponentProps<typeof PatientCard>) => {
	const user = patient.user as IUser;

	return (
		<Card className={cn("bg-transparent hover:bg-muted", className)}>
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
};

PatientCard.MD = ({
	patient,
	className,
}: ComponentProps<typeof PatientCard>) => {
	const user = patient.user as IUser;

	return (
		<Card className={cn("bg-transparent hover:bg-muted", className)}>
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
						<Badge variant={"secondary"}>{getAge(patient.DOB)}</Badge>
						<Badge variant={"secondary"}>{patient.maritalStatus}</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

PatientCard.LG = ({
	patient,
	className,
}: ComponentProps<typeof PatientCard>) => {
	const user = patient.user as IUser;

	// ! Style
	return (
		<Card className={cn("bg-transparent hover:bg-muted", className)}>
			<CardContent className="">
				<Avatar className="size-20 mx-auto rounded-full">
					<AvatarImage src={user.imageUrl!} />
					<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
						{user.username[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</CardContent>
		</Card>
	);
};
