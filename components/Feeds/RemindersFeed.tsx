"use client";

import { useReminders } from "@/contexts/Reminder.context";
import { cn } from "@/lib/utils";
import { eReminderStatus, eReminderVariants } from "@/types/enums/enums";
import { Filter } from "lucide-react";
import {
	AnimatePresence,
	easeInOut,
	motion,
	stagger,
	Variants,
} from "motion/react";
import { ComponentProps, useState } from "react";
import ReminderCard from "../cards/ReminderCard";
import MyBtn from "../custom/MyBtn";
import Void from "../custom/Void";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const MotionVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 100,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

export default function RemindersFeed({
	variant,
	...props
}: {
	variant: eReminderVariants;
} & ComponentProps<"div">) {
	const { reminders: _reminders } = useReminders();
	const [status, setStatus] = useState<eReminderStatus>();

	const reminders =
		variant === eReminderVariants.APPOINTMENT
			? _reminders.appointments
			: variant === eReminderVariants.MEDICATION
			? _reminders.medications
			: _reminders.personal;

	// console.log("Reminders:", _reminders);

	return (
		<div {...props} className={cn("relative h-[]", props.className)}>
			<AnimatePresence>
				<motion.div
					variants={MotionVariants}
					initial={"hidden"}
					animate={"visible"}
					transition={{
						delayChildren: stagger(0.2),
						ease: easeInOut,
					}}
					className="space-y-3"
				>
					{reminders.length > 0 ? (
						reminders.map((r) => {
							if (status && r.status !== status) return;
							// return <Void msg={`Sorry, no '${status}' appointments.`} />;

							return (
								<motion.div variants={MotionVariants} key={r.id}>
									<ReminderCard reminder={r} />
								</motion.div>
							);
						})
					) : (
						<Void msg={`Sorry, no '${variant}' reminders.`} />
					)}
				</motion.div>
			</AnimatePresence>

			{reminders.length > 0 && (
				<DropdownMenu>
					<DropdownMenuTrigger
						className={"absolute bottom-2 right-2"}
						render={
							<MyBtn variant="outline" size="sm">
								<Filter />
								{status ?? "Filter Status"}
							</MyBtn>
						}
					/>

					<DropdownMenuContent side="top">
						{Object.values(eReminderStatus).map((s) => (
							<DropdownMenuItem key={s} onClick={() => setStatus(s)}>
								{s}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => setStatus(undefined)}>
							None
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}
