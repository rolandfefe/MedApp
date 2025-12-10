"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { AppointmentStatusBadge } from "../cards/AppointmentCard";
import DoctorCard from "../cards/DoctorCard";
import ConsentControl from "../ConsentControl";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export default function DoctorConsultationAside() {
	const { appointment } = useConsultation();

	return (
		<div>
			{/* Appointment Doctor */}
			<section className="relative">
				<div className="flex items-center justify-between">
					<AppointmentStatusBadge
						status={appointment.status!}
						variant="secondary"
					>
						{appointment.status}
					</AppointmentStatusBadge>
					<Badge variant={"secondary"}>{appointment.type}</Badge>
				</div>
				<DoctorCard.MD
					doctor={appointment.doctor as IDoctor}
					className="border-0"
				/>
			</section>
			<Separator className="my-2" />

			<div>
				<ConsentControl.Patient />
			</div>
		</div>
	);
}
