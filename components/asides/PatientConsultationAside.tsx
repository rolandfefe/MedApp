"use client";

import { cn } from "@/lib/utils";
import { ePatientConsent } from "@/types/enums/enums";
import { Notebook, PlusCircle } from "lucide-react";
import { useState } from "react";
import { AppointmentStatusBadge } from "../cards/AppointmentCard";
import PatientCard from "../cards/patientCard";
import MyBtn from "../custom/MyBtn";
import { DoctorNotesFormPanel } from "../forms/DoctorNotesForm";
import { Badge } from "../ui/badge";

export default function PatientConsultationAside({
	appointment,
}: {
	appointment: IAppointment;
}) {
	const [consentTab, setConsentTab] = useState<ePatientConsent>();

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
			<PatientCard
				patient={appointment.patient as IPatient}
				currentDoctor={appointment.doctor as IDoctor}
				variant="md"
				className="border-0 bg-transparent"
			/>

			{/* <Separator className="my-3" /> */}
			<section className="space-y-3">
				<div className="relative bg-secondary rounded-lg p-2 text-secondary-foreground">
					<p className="font-medium text-xs ">{appointment.reason}</p>
				</div>

				{/* Consent Info */}
				<div>
					<p className="text-sm font-medium">Consent Info:</p>
					<div className="flex items-center gap-2 flex-wrap">
						{appointment.consentLevels &&
							appointment.consentLevels.map((consent) => (
								<MyBtn
									key={consent}
									variant={"secondary"}
									onClick={() =>
										setConsentTab((prev) =>
											prev === consent ? undefined : consent
										)
									}
									className={cn(
										"h-6 px-2 text-xs !glass",
										consentTab === consent && "text-primary"
									)}
								>
									{consent}
								</MyBtn>
							))}
						{appointment.consentLevels.length < 5 && (
							<MyBtn size="sm" className="!py-0 h-6 rounded-lg">
								Request <PlusCircle />
							</MyBtn>
						)}
					</div>
				</div>

				{/* Diagnosis */}
				{/* Referral */}
				{/* recurrence */}
				{/* Online */}
			</section>
		</div>
	);
}
