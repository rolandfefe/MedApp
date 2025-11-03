"use client";

import { useCurrent } from "@/contexts/Current.context";
import { cn } from "@/lib/utils";
import { eMessageStatus } from "@/types/enums/enums";
import { Check, CheckCheck, Edit3, Reply, Trash2 } from "lucide-react";
import moment from "moment";
import { ComponentProps, useTransition } from "react";
import { Card, CardContent } from "../ui/card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../ui/context-menu";
import UserCard from "./UserCard";
import { useMsg } from "@/contexts/message.context";
import { deleteMsg } from "@/lib/actions/message.actions";
import ConfirmationDialog from "../panels/ConfirmationDialog";
import MyBtn from "../custom/MyBtn";
import { Spinner } from "../ui/spinner";

export default function MsgCard({
	className,
	msg,
	...props
}: {
	msg: IMessage;
} & ComponentProps<typeof Card>) {
	const currentUser = useCurrent().currentUser as IUser;
	const author = msg.from as IUser;
	const isAuthor = author.id === currentUser.id;
	const refMsg = msg.refMessage as IMessage | undefined;

	return (
		<Card
			{...props}
			className={cn(
				"bg-transparent border-none p-0 shadow-none w-full",
				className
			)}
		>
			<div
				className={cn(
					"flex items-start gap-x-1 w-full",
					isAuthor ? "ml-auto flex-row-reverse" : ""
				)}
			>
				<UserCard
					user={msg.from as IUser}
					currentUser={currentUser}
					variant="xs"
				/>
				<MsgCard.Context msg={msg} isAuthor={isAuthor} asChild>
					<CardContent
						className={cn(
							"glass-shadow p-2 rounded-xl w-fit max-w-3/4 sm:max-w-2/3 lg:max-w-1/2",
							isAuthor
								? "glass-primary rounded-tr-sm  text-primary-foreground"
								: "glass rounded-tl-sm"
						)}
					>
						{/* Reply msg */}
						{refMsg && (
							<div className="mb-3 border-l-3 border-primary/50 bg-muted/30 rounded-r-md p-1 pl-2 text-xs w-full">
								{refMsg.body}
							</div>
						)}

						{/* Main Body */}
						<div>
							<p className={cn("text-sm", isAuthor && "")}>{msg.body}</p>
						</div>

						<div className="flex items-center mt-2 justify-between gap-x-4">
							<p
								className={cn(
									"text-xs",
									isAuthor ? "" : "text-muted-foreground"
								)}
							>
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
				</MsgCard.Context>
			</div>
		</Card>
	);
}

MsgCard.Context = ({
	msg,
	isAuthor,
	children,
	...props
}: { msg: IMessage; isAuthor: boolean } & ComponentProps<
	typeof ContextMenuTrigger
>) => {
	const { setEditMsg, editMsg, setRefMsg, refMsg } = useMsg();
	const [isDeleting, startDeleting] = useTransition();

	const isEditing = editMsg?.id === msg.id;
	const isReplying = refMsg?.id === msg.id;

	const editHandler = () => setEditMsg(msg);

	const replyHandler = () => setRefMsg(msg);

	const deleteHandler = async () => {
		startDeleting(async () => {
			await deleteMsg(msg.id);
		});
	};

	return (
		<ContextMenu>
			<ContextMenuTrigger
				{...props}
				disabled={isDeleting}
				className={cn("", isDeleting && "animate-pulse")}
			>
				{children}
			</ContextMenuTrigger>
			<ContextMenuContent>
				{isAuthor && (
					<ContextMenuItem disabled={isEditing} onClick={editHandler}>
						{isEditing ? <Spinner /> : <Edit3 />} Edit
					</ContextMenuItem>
				)}
				<ContextMenuItem disabled={isReplying} onClick={replyHandler}>
					{isReplying ? <Spinner /> : <Reply />} Reply
				</ContextMenuItem>
				<ConfirmationDialog
					action={deleteHandler}
					msg="Are you sure u want to delete this Message?"
					successMsg="Message deleted🗑️"
				>
					<MyBtn
						variant={"ghost"}
						size="sm"
						className="hover:text-destructive justify-start w-full"
					>
						<Trash2 /> Delete
					</MyBtn>
				</ConfirmationDialog>
			</ContextMenuContent>
		</ContextMenu>
	);
};
