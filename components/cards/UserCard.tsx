"use client";

import { Avatar } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

export default function UserCard({
	user,
	currentUser,
	variant,
	className,
}: {
	currentUser: IUser;
	user: IUser;
	variant: "xs" | "sm" | "md";
	className?: string;
}) {
	if (variant === "xs") {
		return (
			<Avatar className="size-8">
				<AvatarImage src={currentUser.imageUrl} />
				<AvatarFallback className="bg-fuchsia-400 dark:bg-fuchsia-600">
					{currentUser.username[0].toUpperCase()}
				</AvatarFallback>
			</Avatar>
		);
	} else if (variant === "sm") {
		return (
			<div className={cn("flex items-center gap-x-1", className)}>
				<Avatar>
					<AvatarImage src={currentUser.imageUrl} />
					<AvatarFallback>
						{currentUser.username[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>

				<p>@${user.username}</p>
			</div>
		);
	} else if (variant === "md") {
		return <div>UserCard</div>;
	}
}
