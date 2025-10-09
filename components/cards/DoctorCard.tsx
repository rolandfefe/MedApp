import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function DoctorCard({
	doctor,
	currentUser,
	variant = "sm",
	className,
}: {
	doctor: IDoctor;
	currentUser?: IUser;
	variant?: "xs" | "sm" | "md" | "lg";
	className?: string;
}) {
	const user = doctor.user as IUser;
	if (variant === "xs") {
		return (
			<Card className={cn("w-fit bg-transparent hover:bg-muted", className)}>
				<CardContent className="">
					<section className="flex items-start gap-x-2">
						<Avatar className="size-10 rounded-lg">
							<AvatarImage src={user.imageUrl!} />
							<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
								{user.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="space-y-2 ">
							<div className="leading-tight">
								<p className="line-clamp-1 font-medium">
									Dr. <span>{user.fname}</span> <span>{user.lname}</span>
								</p>

								<p className="text-xs text-muted-foreground">
									{doctor.contact.officeEmail ?? `@${user.username}`}
								</p>
							</div>
							{/* <div className="hidden sm:flex items-center gap-2 flex-wrap">
								{doctor.specialties.map((s, i) => (
									<Badge key={i} variant="secondary" className="rounded-2xl">
										{s.primary}
									</Badge>
								))}
							</div> */}
						</div>
					</section>
				</CardContent>
			</Card>
		);
	} else if (variant === "sm") {
		return (
			<Card className={cn(" bg-transparent hover:bg-muted", className)}>
				<CardContent className="">
					<section className="flex items-start gap-x-2">
						<Avatar className="size-10 sm:size-12 rounded-lg">
							<AvatarImage src={user.imageUrl!} />
							<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
								{user.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<Tooltip>
							<TooltipTrigger>
								<div className="space-y-2 ">
									<div className="leading-tight">
										<p className="line-clamp-1 font-medium">
											Dr. <span>{user.fname}</span> <span>{user.lname}</span>
										</p>

										<p className="text-xs text-muted-foreground">
											{doctor.contact.officeEmail ?? `@${user.username}`}
										</p>
									</div>
									{/* <div className="hidden sm:flex items-center gap-2 flex-wrap">
								{doctor.specialties.map((s, i) => (
									<Badge key={i} variant="secondary" className="rounded-2xl">
										{s.primary}
									</Badge>
								))}
							</div> */}
								</div>
							</TooltipTrigger>
							<TooltipContent>
								{doctor.specialties.map((s, i) => (
									<Badge key={i} variant="secondary" className="rounded-2xl">
										{s.primary}
									</Badge>
								))}
							</TooltipContent>
						</Tooltip>
					</section>
				</CardContent>
			</Card>
		);
	} else {
	}
	return <div></div>;
}
