"use client";

import { ComponentProps, useTransition } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
	ArrowRight,
	Check,
	CheckCircle,
	CircleMinusIcon,
	Clock3,
	Trash,
} from "lucide-react";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Badge } from "../ui/badge";
import MyBtn from "../custom/MyBtn";
import { useRouter } from "next/navigation";
import { eReminderStatus, eReminderVariants } from "@/types/enums/enums";
import { Spinner } from "../ui/spinner";
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group";
import { deleteReminder, updateReminder } from "@/lib/actions/reminder.actions";

export default function ReminderCard({
	reminder,
	...props
}: { reminder: IReminder } & ComponentProps<typeof Card>) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isDeleting, startDeleteTransition] = useTransition();

	const visitHandler = () => {
		let link: string;

		switch (reminder.variant) {
			case eReminderVariants.APPOINTMENT:
				link = `/appointments/${reminder.itemId}`;
				break;
			case eReminderVariants.MEDICATION:
				link = `/medications`;
				break;
			case eReminderVariants.FOLLOW_UP:
				link = `/follow-ups`;
				break;
		}

		startTransition(() => router.push(link));
	};

	const statusHandler = (status: eReminderStatus) =>
		startTransition(async () => await updateReminder({ ...reminder, status }));

	const deleteHandler = () =>
		startDeleteTransition(async () => await deleteReminder(reminder.id));

	return (
		<Card {...props} className={cn("p-2! border-2 glass", props.className)}>
			<CardContent className="space-y-3 p-0">
				<div className="flex items-center gap-x-2 font-medium text-xl textprimary">
					<p>{reminder.reminderLabel}</p>
				</div>

				<Separator className={"space-y-3"} />

				<section>
					<div className="p-2 bg-background text-xs font-mono rounded-md">
						<p>{reminder.description}</p>
					</div>
				</section>

				<section className="border p-2 rounded-xl flex items-center gap-x-3 justify-between">
					<p className="text-xs font-mono text-primary flex items-center gap-x-2">
						<Clock3 size={20} />
						<span>{moment(reminder.time).format("Do MMM - h:mma")}</span>
					</p>

					<Badge variant={"secondary"}>{reminder.status}</Badge>

					{reminder.variant !== eReminderVariants.PERSONAL ? (
						<MyBtn
							onClick={visitHandler}
							size="sm"
							variant={"secondary"}
							disabled={isPending}
							className="text-primary"
						>
							Visit {isPending ? <Spinner /> : <ArrowRight />}
						</MyBtn>
					) : (
						<>
							<ButtonGroup>
								<MyBtn
									onClick={() => statusHandler(eReminderStatus.SENT)}
									size="sm"
									variant={"secondary"}
									disabled={isPending}
									className="text-primary"
								>
									{isPending ? <Spinner /> : <CheckCircle />}
								</MyBtn>
								<ButtonGroupSeparator orientation="vertical" />
								<MyBtn
									onClick={() => statusHandler(eReminderStatus.SILENCED)}
									size="sm"
									variant={"secondary"}
									disabled={isPending}
									className="text-primary"
								>
									{isPending ? <Spinner /> : <CircleMinusIcon />}
								</MyBtn>
							</ButtonGroup>
							<MyBtn
								onClick={deleteHandler}
								size="icon"
								variant={"secondary"}
								disabled={isDeleting}
								className="text-destructive"
							>
								{isDeleting ? <Spinner /> : <Trash />}
							</MyBtn>
						</>
					)}
				</section>
			</CardContent>
		</Card>
	);
}
