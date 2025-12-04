"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { AppointmentStatusBadge } from "../cards/AppointmentCard";
import PatientCard from "../cards/patientCard";

import ConsentControl from "../ConsentControl";
import { Badge } from "../ui/badge";

export default function PatientConsultationAside() {
	const { appointment } = useConsultation();

	const patient = appointment.patient as IPatient;

	return (
		<div className="">
			<div className="flex items-center justify-between">
				<AppointmentStatusBadge
					status={appointment.status!}
					variant="secondary"
				>
					{appointment.status}
				</AppointmentStatusBadge>
				<Badge variant={"secondary"}>{appointment.type}</Badge>
			</div>
			<PatientCard.MD patient={patient} className="border-0 bg-transparent" />

			{/* <Separator className="my-3" /> */}
			<section className="space-y-3">
				<div className="relative bg-secondary rounded-lg p-2 text-secondary-foreground">
					<p className="font-medium text-xs ">{appointment.reason}</p>
				</div>

				{/* Consent Info */}
				<ConsentControl.Doctor />
			</section>
		</div>
	);
}
