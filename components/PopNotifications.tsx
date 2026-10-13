"use client";

import { useCurrent } from "@/contexts/Current.context";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { pusherClient } from "@/lib/pusher/pusher.client";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

export default function PopNotifications() {
	const { currentPatient, currentDoctor } = useCurrent();
	const router = useRouter();

	const appointmentsPatientPusherChannel = pusherClient.subscribe(
		`appointment-${currentPatient?.id}`
	);

	const appointmentsDoctorPusherChannel = pusherClient.subscribe(
		`appointment-${currentDoctor?.id}`
	);

	const pusherEvents = useEffectEvent(() => {
		appointmentsPatientPusherChannel.bind(
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

		appointmentsDoctorPusherChannel.bind(
			`consent-granted-${currentDoctor?.id}`,
			async ({ id, consent }: { id: string; consent: string }) => {
				const appointment = await getAppointment(id);
				goeyToast(`Consent granted`, {
					description: `Pat.${
						appointment.patient!.user?.fname
					} gave you access to their "${consent}" information.`,
				});
			}
		);

		appointmentsDoctorPusherChannel.bind(
			`consent-denied-${currentDoctor?.id}`,
			async ({ id, consent }: { id: string; consent: string }) => {
				const appointment = await getAppointment(id);
				goeyToast.warning(`Consent Denied`, {
					description: `Pat.${
						appointment.patient!.user?.fname
					} denied access to their "${consent}" information.`,
				});
			}
		);
	});

	useEffect(() => {
		pusherEvents();
	}, [appointmentsPatientPusherChannel]);

	return <div>PopNotifications</div>;
}
