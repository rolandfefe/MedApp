"use client";

import { useCurrent } from "@/contexts/Current.context";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { pusherClient } from "@/lib/pusher/pusher.client";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";
import { Badge } from "./ui/badge";
import { HistoryFormPanel } from "./forms/historyForm";
import MyBtn from "./custom/MyBtn";
import { HealthStatusFormPanel } from "./forms/healthStatusForm";

export default function PopNotifications() {
	const { currentPatient, currentDoctor } = useCurrent();
	const [isOpen, setIsOpen] = useState<boolean>(false);

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

		appointmentsPatientPusherChannel.bind(
			`patient-prompt-${currentPatient?.id}`,
			async ({ id, prompt }: { id: string; prompt: "History" | "Vitals" }) => {
				const appointment = await getAppointment(id);
				goeyToast(`Medical Prompt`, {
					icon: "🩺",
					description: (
						<div>
							<p>
								Dr.{appointment.doctor!.user?.fname} would like you to take your{" "}
								<Badge variant={"secondary"}>{prompt}.</Badge>
							</p>

							<div className="mt-2">
								{prompt == "History" ? (
									<MyBtn onClick={() => setIsOpen(true)}>Take history</MyBtn>
								) : (
									<MyBtn onClick={() => setIsOpen(true)}>
										Take Health status vitals
									</MyBtn>
								)}
							</div>
						</div>
					),
					duration: 5,
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
		return () => {
			pusherClient.unsubscribe(`appointment-${currentPatient?.id}`);
			pusherClient.unsubscribe(`appointment-${currentDoctor?.id}`);
		};
	}, [appointmentsPatientPusherChannel, appointmentsDoctorPusherChannel]);

	return (
		<div>
			<HistoryFormPanel
				action="Create"
				panelProps={{ open: isOpen, onOpenChange: setIsOpen }}
			/>
			<HealthStatusFormPanel
				action="Create"
				panelProps={{ open: isOpen, onOpenChange: setIsOpen }}
			/>
		</div>
	);
}
