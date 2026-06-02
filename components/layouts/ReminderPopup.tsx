"use client";

import { eReminderStatus } from "@/types/enums/enums";
import { random } from "lodash";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ReminderCard from "../cards/ReminderCard";

export default function ReminderPopup({
	reminders,
}: {
	reminders: IReminder[];
}) {
	const triggerHandler = () => {
		const reminderNotifications = reminders
			.filter((r) => r.status === eReminderStatus.PENDING)
			.filter((r) => Date.parse(r.time) < Date.now());

		// console.log("timer", reminderNotifications);

		if (reminderNotifications.length < 1) return;

		const reminder =
			reminderNotifications[random(0, reminderNotifications.length - 1)];


		toast.custom((t) => <ReminderCard.Popup t={t} reminder={reminder} />, {
			id: "sw242",
			position: "bottom-right",
		});
	};

	useEffect(() => {
		const timer = setInterval(triggerHandler, 10000);

		return () => clearInterval(timer);
	}, []);

	return <></>;
}
