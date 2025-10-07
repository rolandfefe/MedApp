import React, { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import moment from "moment";
import { eMessageStatus } from "@/types/enums/enums";
import { Check, CheckCheck } from "lucide-react";

export default function MsgCard({
	className,
	msg,
	currentUser,
	...props
}: {
	msg: IMessage;
	currentUser: IUser;
} & ComponentProps<typeof Card>) {
	const author = msg.from as IUser;
	const isAuthor = author._id === currentUser._id;


	return (
		<Card
			{...props}
			className={cn(
				"bg-transparent border-none p-0 shadow-none w-full",
				className
			)}
		>
			<CardContent
				className={cn(
					"glass-shadow p-2 rounded-xl  w-fit max",
					isAuthor
						? "glass-primary rounded-br-sm ml-auto text-primary-foreground"
						: "glass rounded-bl-sm"
				)}
			>
				{/* Main Body */}
				<div>
					<p className={cn("text-sm", isAuthor && "")}>{msg.body}</p>
				</div>

				<div className="flex items-center mt-2 justify-between gap-x-4">
					<p className={cn("text-xs", isAuthor ? "" : "text-muted-foreground")}>
						{moment(msg.createdAt).fromNow(true)}
					</p>

					{isAuthor ? (
						msg.status === eMessageStatus.SENT ? (
							<Check size={17} />
						) : msg.status === eMessageStatus.RECEIVED ? (
							<CheckCheck size={17} />
						) : (
							<CheckCheck size={17} className="text-blue-500" />
						)
					) : null}
				</div>
			</CardContent>
		</Card>
	);
}
