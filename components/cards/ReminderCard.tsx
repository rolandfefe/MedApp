"use client";

import { ComponentProps, useTransition } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock3 } from "lucide-react";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Badge } from "../ui/badge";
import MyBtn from "../custom/MyBtn";
import { useRouter } from "next/navigation";
import { eReminderVariants } from "@/types/enums/enums";
import { Spinner } from "../ui/spinner";

export default function ReminderCard({
	reminder,
	...props
}: { reminder: IReminder } & ComponentProps<typeof Card>) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

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

					<MyBtn
						onClick={visitHandler}
						size="sm"
						variant={"secondary"}
						disabled={isPending}
						className="text-primary"
					>
						Visit {isPending ? <Spinner /> : <ArrowRight />}
					</MyBtn>
				</section>
			</CardContent>
		</Card>
	);
}
