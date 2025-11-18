"use client";

import { updateAppointment } from "@/lib/actions/appointment.actions";
import {
	appointmentOnlineFormData,
	appointmentOnlineSchema,
} from "@/lib/formSchemas/appointment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowBigRightDash,
	ArrowUpRightFromSquare,
	CalendarClock,
	ChevronsUpDown,
	Loader,
	Notebook,
	Plus,
	Stethoscope,
	Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { DiagnosisFormPanel } from "../forms/DiagnosisForm";
import { DoctorNotesFormPanel } from "../forms/DoctorNotesForm";
import { errHandler } from "../toastErr";
import { ButtonGroup } from "../ui/button-group";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

import { useConsultation } from "@/contexts/consultation.context";
import { useCurrent } from "@/contexts/Current.context";
import { useMediaQuery } from "@uidotdev/usehooks";
import ReferralsAside from "../asides/ReferralsAside";
import LinkBtn from "../btns/LinkBtn";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
import { ReferralFormDialog } from "../forms/ReferralForm";
import RecurrencePlanAside from "../asides/RecurrencePlanAside";

export default function PatientFooter() {
	const currentUser = useCurrent().currentUser!;
	const { appointment } = useConsultation();

	return (
		<div className="space-y-3">
			<PatientFooter.RecurrenceBtn />
			<ReferralBtn />
			<OnlineMeetBtn />
			<ButtonGroup className="!w-full">
				<DiagnosisFormPanel className="flex-1">
					<MyBtn variant={"outline"} className="rounded-e-none justify-start">
						<Stethoscope />
						Diagnose
					</MyBtn>
				</DiagnosisFormPanel>

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

			<DoctorNotesFormPanel>
				<MyBtn className="w-full">
					Medical Notes <Notebook />
				</MyBtn>
			</DoctorNotesFormPanel>
		</div>
	);
}

PatientFooter.RecurrenceBtn = () => {
	const { appointment } = useConsultation();
	const patient = appointment.patient as IPatient;

	return (
		<FormPanel>
			<FormPanelTrigger asChild className="w-full!">
				<MyBtn variant="outline" className="justify-start">
					<CalendarClock />
					Recurrence plan
				</MyBtn>
			</FormPanelTrigger>
			<FormPanelContent>
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
			</FormPanelContent>
		</FormPanel>
	);
};

const ReferralBtn = () => {
	return (
		<ButtonGroup className="w-full!">
			<FormPanel>
				<FormPanelTrigger asChild className="flex-1">
					<MyBtn variant="outline" className="justify-start">
						<ArrowBigRightDash /> Referrals
					</MyBtn>
				</FormPanelTrigger>
				<FormPanelContent>
					<ReferralsAside />
				</FormPanelContent>
			</FormPanel>

			<ReferralFormDialog action="Create" className="rounded-s-none">
				<MyBtn
					variant="secondary"
					size="icon"
					className="rounded-s-none text-primary"
				>
					<Plus />
				</MyBtn>
			</ReferralFormDialog>
		</ButtonGroup>
	);
};

const OnlineMeetBtn = () => {
	const { appointment } = useConsultation();

	const [isPending, startTransition] = useTransition();
	const [isOpen, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const isSmScreen = useMediaQuery("(width <= 640px)");

	const form = useForm<appointmentOnlineFormData>({
		resolver: zodResolver(appointmentOnlineSchema),

		defaultValues: {
			url: appointment?.online?.url || "",
			accessCode: appointment?.online?.accessCode || "",
		},
	});

	const submitHandler = (data: appointmentOnlineFormData) => {
		if (form.watch("url")) {
			startTransition(async () => {
				await updateAppointment({ ...appointment, online: { ...data } });
				toast.success("Online meeting info updated🤙");
				setOpen(false);
			});
		} else {
			errHandler(["Please add a valid meeting URL!"]);
		}
	};

	return (
		<ButtonGroup className="!w-full">
			<MyBtn
				variant="outline"
				disabled={!appointment.online?.url || isPending}
				onClick={() => router.push(appointment.online?.url!)}
				className="flex-1 justify-start"
			>
				<Video /> Join
			</MyBtn>
			<Popover open={isOpen} onOpenChange={setOpen}>
				<PopoverTrigger asChild onClick={() => setOpen(!isOpen)}>
					<MyBtn
						disabled={isPending}
						size="icon"
						variant={"secondary"}
						className="text-primary"
					>
						<ChevronsUpDown />
					</MyBtn>
				</PopoverTrigger>

				<PopoverContent side={isSmScreen ? "top" : "right"}>
					<Heading className="text-lg text-primary ">
						<Video /> Online Meeting
					</Heading>

					<Separator className="my-2" />

					<Form {...form}>
						<section className="space-y-4">
							<FormField
								control={form.control}
								name="url"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Meeting URL</FormLabel>
										<FormControl>
											<Input placeholder="https://zoom.us/..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="accessCode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Access code (opt)</FormLabel>
										<FormControl>
											<Input placeholder="code...." {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<MyBtn
								disabled={isPending}
								onClick={form.handleSubmit(submitHandler)}
								className="flex w-2/3 mx-auto"
							>
								Save {isPending && <Loader className="animate-spin" />}
							</MyBtn>
						</section>
					</Form>
				</PopoverContent>
			</Popover>
		</ButtonGroup>
	);
};
