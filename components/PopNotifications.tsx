"use client";

import { useCurrent } from "@/contexts/Current.context";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { pusherClient } from "@/lib/pusher/pusher.client";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

export default function PopNotifications() {
	const currentPatient = useCurrent().currentPatient;
	const router = useRouter();

	const appointmentsPusherChannel = pusherClient.subscribe(
		`appointment-${currentPatient?.id}`
	);

	const pusherEvents = useEffectEvent(() => {
		appointmentsPusherChannel.bind(
			`appointment-${currentPatient?.id}-confirmed`,
			async (id: string) => {
				const appointment = await getAppointment(id);
				goeyToast(`Appointment confirmed`, {
					description: `Dr.${
						appointment.doctor!.user?.fname
					} approved your appointment for "${appointment.reason}".`,
					action: {
						label: "Start Consultation💭",
						successLabel: "Redirecting to consultation View.",
						onClick() {
							router.push(`/consultation/${id}`);
						},
					},
				});
			}
		);
	});

	useEffect(() => {
		pusherEvents();
	}, [appointmentsPusherChannel]);

	return <div>PopNotifications</div>;
}
