"use client";

import { useReminders } from "@/contexts/Reminder.context";
import { cn } from "@/lib/utils";
import { eReminderStatus, eReminderVariants } from "@/types/enums/enums";
import {
	AnimatePresence,
	easeInOut,
	motion,
	stagger,
	Variants,
} from "motion/react";
import { ComponentProps } from "react";
import ReminderCard from "../cards/ReminderCard";
import Void from "../custom/Void";
import ReminderForm from "../forms/ReminderForm";

const MotionVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 100,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		x: 100,
	},
};

export default function RemindersFeed({
	TAB,
	status,
	...props
}: {
	TAB: eReminderVariants | "New" | "All";
	status: eReminderStatus | undefined;
} & ComponentProps<"div">) {
	const { reminders: _reminders } = useReminders();

	if (TAB === "New") return <ReminderForm />;

	const reminders =
		TAB === eReminderVariants.APPOINTMENT
			? _reminders.appointments
			: TAB === eReminderVariants.MEDICATION
			? _reminders.medications
			: TAB === eReminderVariants.PERSONAL
			? _reminders.personal
			: TAB === eReminderVariants.FOLLOW_UP
			? _reminders.followUp
			: [
					..._reminders.personal,
					..._reminders.medications,
					..._reminders.appointments,
			  ];

	console.log("Reminders:", _reminders);

	return (
		<div {...props} className={cn("relative h-[]", props.className)}>
			<AnimatePresence>
				<motion.div
					variants={MotionVariants}
					initial={"hidden"}
					animate={"visible"}
					exit={"exit"}
					transition={{
						delayChildren: stagger(0.2),
						ease: easeInOut,
					}}
					className="space-y-3"
				>
					{reminders.length > 0 ? (
						reminders.map((r) => {
							if (status && r.status !== status) return;

							return (
								<motion.div variants={MotionVariants} layout key={r.id}>
									<ReminderCard reminder={r} />
								</motion.div>
							);
						})
					) : (
						<Void msg={`Sorry, no '${TAB}' reminders.`} />
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
