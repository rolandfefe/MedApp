"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { useCopyToClipboard, useMediaQuery } from "@uidotdev/usehooks";
import {
	ArrowBigRightDash,
	ArrowUpRightFromSquare,
	CalendarClock,
	Copy,
	Lock,
	Notebook,
	Stethoscope,
	Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import RecurrencePlanAside from "../asides/RecurrencePlanAside";
import ReferralsAside from "../asides/ReferralsAside";
import LinkBtn from "../btns/LinkBtn";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import DiagnosisSection from "../Sections/DiagnosisSection";
import { ButtonGroup } from "../ui/button-group";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

export default function DoctorConsultationFooter() {
	return (
		<div className="space-y-3">
			<DoctorConsultationFooter.RecurrenceBtn />
			<DoctorConsultationFooter.ReferralBtn />
			<DoctorConsultationFooter.OnlineMeetBtn />
			<DoctorConsultationFooter.DiagnosisBtn />

			{/* <DoctorNotesFormPanel> */}
			<MyBtn className="w-full">
				Medical Notes <Notebook />
			</MyBtn>
			{/* </DoctorNotesFormPanel> */}
		</div>
	);
}

DoctorConsultationFooter.RecurrenceBtn = () => {
	const { appointment, recurrencePlan } = useConsultation();
	const patient = appointment.patient as IPatient;

	if (!recurrencePlan) return;

	return (
		<FormPanel dismissible={false}>
			<FormPanelTrigger asChild className="w-full!">
				<MyBtn variant="outline" className="justify-start">
					<CalendarClock />
					Recurrence plan
				</MyBtn>
			</FormPanelTrigger>
			<FormPanelContent>
				<ScrollArea className="h-[90vh] mb-4">
					<section>
						<Heading className="text-xl sm:text-2xl font-medium">
							<span className="text-primary flex item-center gap-x-2">
								<CalendarClock />
								{patient.user.fname}'s
							</span>

							<span>Recurrence Plan</span>
						</Heading>
					</section>
					<Separator className="mt-2 mb-4" />
					<RecurrencePlanAside />
				</ScrollArea>
			</FormPanelContent>
		</FormPanel>
	);
};

DoctorConsultationFooter.ReferralBtn = () => {
	const { referrals } = useConsultation();

	if (referrals.length < 1) return;

	return (
		<FormPanel>
			<FormPanelTrigger asChild className="w-full">
				<MyBtn variant="outline" className="justify-start">
					<ArrowBigRightDash /> Referrals
				</MyBtn>
			</FormPanelTrigger>
			<FormPanelContent>
				<ReferralsAside />
			</FormPanelContent>
		</FormPanel>
	);
};

DoctorConsultationFooter.OnlineMeetBtn = () => {
	const { appointment } = useConsultation();

	if (!appointment.online?.url) return;

	const [isOpen, setOpen] = useState<boolean>(false);
	const router = useRouter();
	const isSmScreen = useMediaQuery("(width <= 640px)");
	const [_, copyAction] = useCopyToClipboard();

	const copyHandler = async (content: string, msg: string) => {
		await copyAction(content);
		toast(msg, { icon: "📋", id: "cn22039x8adf" });
	};

	return (
		<div className="flex items-center gap-x-2">
			<MyBtn
				// size="icon"
				variant={"secondary"}
				onClick={() => router.push(appointment.online?.url!)}
				className="flex-1 ext-primary justify-start! px-3 text-primary"
			>
				<Video /> Join
			</MyBtn>
			<MyBtn
				size="icon"
				variant={"secondary"}
				onClick={() =>
					copyHandler(appointment.online?.url!, "Meet link copied.")
				}
				className="text-primary"
			>
				<Copy />
			</MyBtn>
			{appointment.online?.accessCode && (
				<MyBtn
					variant={"secondary"}
					size={"icon"}
					onClick={() =>
						copyHandler(appointment.online?.accessCode, "Access code copied.")
					}
					className="text-primary"
				>
					<Lock />
				</MyBtn>
			)}
		</div>
	);
};

DoctorConsultationFooter.DiagnosisBtn = () => {
	const { appointment, diagnosis } = useConsultation();

	if (!diagnosis) return;

	return (
		<ButtonGroup className="w-full">
			<FormPanel>
				<FormPanelTrigger asChild className="flex-1">
					<MyBtn variant={"outline"} className="rounded-e-none justify-start!">
						<Stethoscope />
						Diagnosis
					</MyBtn>
				</FormPanelTrigger>

				<FormPanelContent>
					<DiagnosisSection />
				</FormPanelContent>
			</FormPanel>

			<LinkBtn
				variant={"secondary"}
				size="icon"
				link={{
					href: `/consultation/${appointment.id!}/diagnosis`,
				}}
				className="text-primary rounded-l-none"
			>
				<ArrowUpRightFromSquare />
			</LinkBtn>
		</ButtonGroup>
	);
};
