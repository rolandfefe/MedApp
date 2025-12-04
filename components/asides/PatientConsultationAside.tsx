"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { cn } from "@/lib/utils";
import { ePatientConsent } from "@/types/enums/enums";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { AppointmentStatusBadge } from "../cards/AppointmentCard";
import PatientCard from "../cards/patientCard";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
import MyBtn from "../custom/MyBtn";
import PatientHistorySection from "../PatientHistorySection";
import { Badge } from "../ui/badge";

export default function PatientConsultationAside() {
	const { appointment, patientHistory } = useConsultation();

	const [consentTab, setConsentTab] =
		useState<NonNullable<IAppointment["consentLevels"]>[number]>();
	const patient = appointment.patient as IPatient;
	const doctor = appointment.doctor as IDoctor;

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
				<div>
					<p className="text-sm font-medium">Consent Info:</p>
					<div className="flex items-center gap-2 flex-wrap">
						{appointment.consentLevels &&
							appointment.consentLevels.map((consent) => (
								<FormPanel key={consent}>
									<FormPanelTrigger asChild>
										<MyBtn
											variant={"secondary"}
											onClick={() =>
												setConsentTab((prev) =>
													prev === consent ? undefined : prev
												)
											}
											className={cn(
												"h-6 px-2 text-xs !glass",
												consentTab === consent && "text-primary"
											)}
										>
											{consent}
										</MyBtn>
									</FormPanelTrigger>
									<FormPanelContent>
										{consent === ePatientConsent.HISTORY ? (
											<PatientHistorySection history={patientHistory} />
										) : (
											"Other Panels"
										)}
									</FormPanelContent>
								</FormPanel>
							))}
						{appointment.consentLevels!.length < 5 && (
							<MyBtn size="sm" className="!py-0 h-6 rounded-lg">
								Request <PlusCircle />
							</MyBtn>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
