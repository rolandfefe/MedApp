"use client";

import React, { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useCurrent } from "@/contexts/Current.context";
import { Card, CardContent } from "../ui/card";
import Heading from "../custom/Heading";

export default function UserCard({
	user,
	className,
	...props
}: {
	user: IUser;
} & ComponentProps<typeof Card>) {
	return (
		<Card
			{...props}
			className={cn("bg-transparent border-0 shadow-none", className)}
		>
			<CardContent>
				<Avatar className={cn("size-24 mx-auto rounded-full", className)}>
					<AvatarImage src={user.imageUrl!} className="size-full" />
					<AvatarFallback className="bg-fuchsia-400 dark:bg-fuchsia-600 size-full text-lg">
						{user.username[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>

				<Heading className="justify-center gap-x-2 text-xl">
					<span>{user.fname}</span>
					<span>{user.lname}</span>
				</Heading>
				<div className="">
					<p className="font-medium text-muted-foreground text-sm text-center">
						{user.email}
					</p>
					<p className="font-medium text-muted-foreground text-sm text-center font-mono">
						@{user.username}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

UserCard.XS = ({ user, className }: ComponentProps<typeof UserCard>) => {
	const currentUser = useCurrent().currentUser;

	return (
		<Avatar className={cn("size-8", className)}>
			<AvatarImage src={user.imageUrl!} />
			<AvatarFallback className="bg-fuchsia-400 dark:bg-fuchsia-600">
				{user.username[0].toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
};

UserCard.SM = ({ user, className }: ComponentProps<typeof UserCard>) => {
	return (
		<div className={cn("flex items-center gap-x-1", className)}>
			<Avatar>
				<AvatarImage src={user.imageUrl!} />
				<AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
			</Avatar>

			<p>@${user.username}</p>
		</div>
	);
};
