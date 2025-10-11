"use client";

import {
	ArrowBigRightDash,
	ArrowUpRightFromSquare,
	ChevronsUpDown,
	Loader,
	Notebook,
	Plus,
	Stethoscope,
	Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import MyBtn from "../custom/MyBtn";
import { DiagnosisFormPanel } from "../forms/DiagnosisForm";
import { DoctorNotesFormPanel } from "../forms/DoctorNotesForm";
import { ButtonGroup } from "../ui/button-group";
import { Skeleton } from "../ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Heading from "../custom/Heading";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	appointmentOnlineFormData,
	appointmentOnlineSchema,
} from "@/lib/formSchemas/appointment.schema";
import { updateAppointment } from "@/lib/actions/appointment.actions";
import { errHandler } from "../toastErr";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { set } from "mongoose";
import toast from "react-hot-toast";

import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
import ReferralsAside from "../asides/ReferralsAside";
import ReferralForm, { ReferralFormDialog } from "../forms/ReferralForm";
import { useMediaQuery } from "@uidotdev/usehooks";
import { getReferrals } from "@/lib/actions/referral.actions";

export default function PatientFooter({
	appointment,
	currentUser,
}: {
	appointment: IAppointment;
	currentUser: IUser;
}) {
	const router = useRouter();

	if (!appointment)
		return (
			<div className="space-y-2">
				{[...Array(4)].map((_, i) => (
					<Skeleton key={i} className="w-full h-9 rounded-xl" />
				))}
			</div>
		);

	// Reminder
	// Referral

	return (
		<div className="space-y-3">
			<ReferralBtn appointment={appointment} />
			<OnlineMeetBtn appointment={appointment} />
			<ButtonGroup className="!w-full">
				<DiagnosisFormPanel
					appointment={appointment}
					action="Create"
					className="flex-1"
				>
					<MyBtn variant={"outline"} className="rounded-e-none justify-start">
						<Stethoscope />
						Diagnose
					</MyBtn>
				</DiagnosisFormPanel>

				<MyBtn
					variant={"secondary"}
					size="icon"
					onClick={() =>
						router.push(`/consultation/${appointment._id!}/diagnosis`)
					}
					className="text-primary"
				>
					<ArrowUpRightFromSquare />
				</MyBtn>
			</ButtonGroup>

			<DoctorNotesFormPanel currentUser={currentUser} appointment={appointment}>
				<MyBtn className="w-full">
					Medical Notes <Notebook />
				</MyBtn>
			</DoctorNotesFormPanel>
		</div>
	);
}

const ReferralBtn = ({ appointment }: { appointment: IAppointment }) => {
	const [referrals, setReferrals] = useState<IReferral[]>();

	useEffect(() => {
		(async () =>
			setReferrals(await getReferrals({ appointment: appointment._id! })))();
	}, [appointment]);

	return (
		<ButtonGroup className="!w-full">
			<FormPanel>
				<FormPanelTrigger asChild className="flex-1">
					<MyBtn variant="outline" className="justify-start">
						<ArrowBigRightDash /> Referrals
					</MyBtn>
				</FormPanelTrigger>
				<FormPanelContent>
					<ReferralsAside referrals={referrals!} appointment={appointment} />
				</FormPanelContent>
			</FormPanel>

			<ReferralFormDialog
				appointment={appointment}
				action="Create"
				className="rounded-s-none"
			>
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

const OnlineMeetBtn = ({ appointment }: { appointment: IAppointment }) => {
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
