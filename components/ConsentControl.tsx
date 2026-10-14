"use client";
import { useConsultation } from "@/contexts/consultation.context";
import { HeartPulse, PlusCircle, Stethoscope } from "lucide-react";
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
import { Spinner } from "./ui/spinner";
import { AnimatePresence, motion } from "motion/react";
import { goeyToast } from "goey-toast";
import { pusherServer } from "@/lib/pusher/pusher.server";
import Void from "./custom/Void";
import VitalsSection from "./VitalsSection";
import {
	consentControlTrigger,
	promptPatientTrigger,
} from "@/lib/actions/pusher.actions";
import { VerdictsProvider } from "@/contexts/Verdicts.context";
import VerdictsFeed from "./Feeds/VerdictsFeed";
import LinkBtn from "./btns/LinkBtn";

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
	const consentLevels = appointment.consentLevels ?? [];

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
				await consentControlTrigger(appointment, consent, "hidden");
				goeyToast("Consent hidden", {
					description: `${consent.toUpperCase()} info hidden from doctor.`,
				});
			} else {
				await consentControlTrigger(appointment, consent, "granted");
				goeyToast("Consent granted.", {
					description: `Doctor can now access your ${consent.toUpperCase()} info.`,
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
					const isAllowed = consentLevels?.find((c) => c == consent);

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
	const { appointment, patientHistory, healthStatus, patientVerdicts } =
		useConsultation();
	const consentLevels = appointment.consentLevels ?? [];

	const [consentTab, setConsentTab] =
		useState<NonNullable<IAppointment["consentLevels"]>[number]>();

	return (
		<div>
			<p className="text-sm font-medium">Consent Info:</p>
			<div className="flex items-center gap-2 flex-wrap">
				{consentLevels &&
					consentLevels.map((consent) => (
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
									<>
										{patientHistory ? (
											<PatientHistorySection history={patientHistory!} />
										) : (
											<div>
												<Void msg="Patient has not filled history form" />
												<MyBtn
													size="lg"
													onClick={async () =>
														await promptPatientTrigger(appointment, "History")
													}
													className="flex w-fit md:w-1/3 mx-auto mt-4"
												>
													Take patient history
												</MyBtn>
											</div>
										)}
									</>
								) : consent === ePatientConsent.VITALS ? (
									<>
										{healthStatus ? (
											<VitalsSection
												healthStatus={healthStatus}
												patient={appointment.patient as IPatient}
											/>
										) : (
											<div>
												<Void msg="Patient has not health vitals records." />
												<MyBtn
													size="lg"
													onClick={async () =>
														promptPatientTrigger(appointment, "Vitals")
													}
													className="flex w-fit md:w-1/3 mx-auto mt-4"
												>
													<HeartPulse />
													Take patient Vitals
												</MyBtn>
											</div>
										)}
									</>
								) : consent === ePatientConsent.MEDICATIONS ? (
									<>
										{patientVerdicts ? (
											<VerdictsProvider verdictsInit={patientVerdicts}>
												<VerdictsFeed />
											</VerdictsProvider>
										) : (
											<div>
												<Void msg="Patient has no medications records from the system. Write Diagnosis & Verdict to fill patient's medication records" />
												<LinkBtn
													size="lg"
													link={{
														href: `/consultation/${appointment.id}/diagnosis`,
													}}
													className="flex w-fit md:w-1/3 mx-auto mt-4"
												>
													<Stethoscope />s Diagnosis
												</LinkBtn>
											</div>
										)}
									</>
								) : (
									"Other Panels"
								)}
							</FormPanelContent>
						</FormPanel>
					))}
				{consentLevels!.length < 5 && (
					<MyBtn size="sm" className="!py-0 h-6 rounded-lg">
						Request <PlusCircle />
					</MyBtn>
				)}
			</div>
		</div>
	);
};
