"use client";
import { useConsultation } from "@/contexts/consultation.context";
import { PlusCircle } from "lucide-react";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "./custom/form-panel";
import MyBtn from "./custom/MyBtn";
import PatientHistorySection from "./PatientHistorySection";
import { cn } from "@/lib/utils";
import { ePatientConsent } from "@/types/enums/enums";
import { useState, useTransition } from "react";
import { updateAppointment } from "@/lib/actions/appointment.actions";
import toast from "react-hot-toast";
import { Spinner } from "./ui/spinner";
import { AnimatePresence, motion } from "motion/react";

/**
 * @description Manage Consent btw doctor and patient
 */
export default function ConsentControl() {
	return <div></div>;
}

ConsentControl.Patient = () => {
	const { appointment } = useConsultation();
	const doctor = appointment.doctor;
	const [isPending, startTransition] = useTransition();

	// Todo: Add Realtime requests from dr
	// Todo: Realtime indication on what dr is viewing

	const toggleConsentHandler = (
		consent: NonNullable<IAppointment["consentLevels"]>[number],
		isExisted: boolean
	) => {
		const consentLevels = isExisted
			? appointment.consentLevels?.filter((c) => c != consent)
			: [...appointment.consentLevels!, consent];

		startTransition(async () => {
			await updateAppointment({ ...appointment, consentLevels });

			if (isExisted) {
				toast(`${consent.toUpperCase()} info hidden from doctor.`, {
					icon: "ℹ️",
				});
			} else {
				toast(`Doctor can now access your ${consent.toUpperCase()} info.`, {
					icon: "ℹ️",
				});
			}
		});
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-x-1 text-sm font-medium">
				<AnimatePresence>
					<motion.span layout className="text-sm font-medium">
						Consent Info:
					</motion.span>

					{isPending && (
						<motion.span
							initial={{ opacity: 0, x: 10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 10 }}
							layout
						>
							<Spinner />
						</motion.span>
					)}
				</AnimatePresence>
			</div>

			<div className="flex gap-2 flex-wrap">
				{Object.entries(ePatientConsent).map(([k, consent]) => {
					const isAllowed = appointment.consentLevels?.find(
						(c) => c == consent
					);

					return (
						<MyBtn
							key={k}
							disabled={isPending}
							variant={"secondary"}
							onClick={() => toggleConsentHandler(consent, !!isAllowed)}
							className={cn(
								"h-6 px-2 text-xs !glass",
								isAllowed && "text-primary",
								isPending && "animate-pulse"
							)}
						>
							{consent}
						</MyBtn>
					);
				})}
			</div>
		</div>
	);
};

ConsentControl.Doctor = () => {
	const { appointment, patientHistory } = useConsultation();

	const [consentTab, setConsentTab] =
		useState<NonNullable<IAppointment["consentLevels"]>[number]>();

	return (
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
	);
};
