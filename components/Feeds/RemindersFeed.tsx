"use client";

import { StaggerVariants } from "@/app/MotionVariants";
import { useReminders } from "@/contexts/Reminder.context";
import { cn } from "@/lib/utils";
import { eReminderStatus, eReminderVariants } from "@/types/enums/enums";
import { AnimatePresence, motion } from "motion/react";
import { ComponentProps } from "react";
import ReminderCard from "../cards/ReminderCard";
import Void from "../custom/Void";
import ReminderForm from "../forms/ReminderForm";
import StaggerList from "../layouts/StaggerList";

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
				<StaggerList className="space-y-3">
					{reminders.length > 0 ? (
						reminders.map((r) => {
							if (status && r.status !== status) return;

							return (
								<motion.div
									variants={StaggerVariants}
									transition={{ ease: "easeOut", duration: 0.5 }}
									layout
									key={r.id}
								>
									<ReminderCard reminder={r} />
								</motion.div>
							);
						})
					) : (
						<Void msg={`Sorry, no '${TAB}' reminders.`} />
					)}
				</StaggerList>
			</AnimatePresence>
		</div>
	);
}
