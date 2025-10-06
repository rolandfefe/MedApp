import React, { ReactNode, useTransition } from "react";
import {
	DynamicPanel,
	DynamicPanelContent,
	DynamicPanelTrigger,
} from "../custom/DynamicPanel";
import Heading from "../custom/Heading";
import { Badge } from "../ui/badge";
import CopyBadge from "../custom/CopyBadge";
import moment from "moment";
import { AppointmentStatusBadge } from "../cards/AppointmentCard";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";
import {
	deleteAppointment,
	updateAppointment,
} from "@/lib/actions/appointment.actions";
import DoctorCard from "../cards/DoctorCard";
import PatientCard from "../cards/patientCard";
import {
	Check,
	CircleCheck,
	CircleX,
	Loader,
	MessageCircleMore,
	Sparkles,
	Trash2,
} from "lucide-react";
import { eAppointmentStatus } from "@/types/enums/enums";
import toast from "react-hot-toast";
import MyBtn from "../custom/MyBtn";
import { ShineBorder } from "../ui/shine-border";
import ConfirmationDialog from "./ConfirmationDialog";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export default function AppointmentDynamicPanel({
	appointment,
	currentPatient,
	currentDoctor,
	mode,
	children,
}: {
	appointment: IAppointment;
	currentPatient?: IPatient;
	currentDoctor?: IDoctor;
	mode: "Patient" | "Doctor";
	children?: ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isConfirming, startConfirmation] = useTransition();
	const [isOpeningConsultation, startOpeningConsultation] = useTransition();

	const isAppointmentDoctor = currentDoctor?._id == appointment.doctor?._id;
	const isAutoMode =
		!appointment.doctor ||
		(appointment.status === eAppointmentStatus.CANCELLED &&
			!isAppointmentDoctor);

	const cancelHandler = async () => {
		await updateAppointment(
			{
				...appointment,
				cancellation: {
					cancelledAt: new Date(),
					cancelledBy:
						mode === "Patient" ? currentPatient?._id : currentDoctor?._id,
					reason: "",
				},
				confirmation: undefined,
				status: eAppointmentStatus.CANCELLED,
			},
			pathname
		);
	};

	const confirmHandler = async () =>
		startConfirmation(
			async () =>
				await updateAppointment(
					{
						...appointment,
						confirmation: {
							confirmedAt: new Date(),
							isConfirmed: true,
							confirmedBy: currentDoctor?._id,
						},
						cancellation: undefined,
						status: eAppointmentStatus.CONFIRMED,
					},
					pathname
				)
		);

	const deleteHandler = async () =>
		await deleteAppointment(appointment._id!, pathname);

	const takeAppointmentHandler = () =>
		startTransition(async () => {
			// ? Assigned & Confirm appointment

			await updateAppointment(
				{
					...appointment,
					doctor: currentDoctor?._id,
					confirmation: {
						confirmedAt: new Date(),
						isConfirmed: true,
						confirmedBy: currentDoctor?._id,
					},
					cancellation: undefined,
					status: eAppointmentStatus.CONFIRMED,
				},
				pathname
			);

			toast.success(
				`You have now been assigned appointment 🆔:'${appointment._id!}'`
			);
		});

	return (
		<DynamicPanel>
			<DynamicPanelTrigger
				dialogProps={{ asChild: true }}
				drawerProps={{ asChild: true }}
			>
				{children}
			</DynamicPanelTrigger>

			{/* <DynamicPanelContent className={"min-h-[80vh] sm:min-h-fit"}> */}
			<DynamicPanelContent className={"min-h-fit"}>
				<section>
					<Heading className="text-xl sm:text-2xl text-primary">
						<span>Appointment</span>

						<CopyBadge variant={"secondary"} content={appointment._id!}>
							{appointment._id}
						</CopyBadge>
					</Heading>
				</section>
				<Separator className={"my-2"} />

				<section className="space-y-2">
					<div className="text-muted-foreground bg-muted/30 p-2 rounded-lg space-y-3">
						<p className="font-medium">{appointment.reason}</p>
						<div className="text-xs flex items-center justify-between">
							<span className="">
								{moment(appointment.createdAt).format("Do MMM, YYYY")}
							</span>

							<AppointmentStatusBadge
								variant={"secondary"}
								status={appointment.status!}
							>
								{appointment.status}
							</AppointmentStatusBadge>
						</div>
					</div>

					<div className=" rounded-xl  flex items-center justify-between w-full">
						<p className="text-xs text-muted-foreground">
							<span>Start: </span>
							<span className="text-sm text-foreground font-medium">
								{moment(appointment.startTime).format("Do MMM - h:mma")}
							</span>
						</p>
						<p className="text-xs text-muted-foreground">
							<span>End: </span>
							<span className="text-sm text-foreground font-medium">
								{moment(appointment.endTime).format("Do MMM - h:mma")}
							</span>
						</p>
					</div>

					{mode === "Doctor" ? (
						<div className="space-y-2">
							<PatientCard
								patient={appointment.patient as IPatient}
								currentDoctor={currentDoctor!}
								variant="sm"
							/>
							{isAutoMode && (
								<div className="p-2 border rounded-xl">
									<p className="flex items-center gap-x-2 justify-center text-blue-500 font-medium">
										<Sparkles />
										Auto mode
									</p>
									<p className="text-sm text-center text-muted-foreground">
										Take on this application
									</p>

									<MyBtn
										size="sm"
										disabled={isPending}
										variant={"secondary"}
										onClick={takeAppointmentHandler}
										className="text-primary flex w-fit mx-auto mt-3 glass"
									>
										<span>Take Appointment</span>
										{isPending && <Loader className="animate-spin" />}
										<ShineBorder
											shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
										/>
									</MyBtn>
								</div>
							)}
						</div>
					) : (
						<DoctorCard doctor={appointment.doctor as IDoctor} />
					)}

					{/* Actions */}
					<div className="flex items-center gap-x-2 justify-center mt-4">
						{appointment.doctor &&
						appointment.status === eAppointmentStatus.SCHEDULED ? (
							<>
								{mode === "Doctor" ? (
									<MyBtn
										disabled={isConfirming}
										size="sm"
										onClick={confirmHandler}
									>
										Confirm
										{isConfirming ? (
											<Loader className="animate-spin" />
										) : (
											<CircleCheck />
										)}
									</MyBtn>
								) : (
									<ConfirmationDialog
										action={deleteHandler}
										msg="Are you sure you want to PERMANENTLY delete this appointment?"
										successMsg="Appointment deleted🗑️"
									>
										<MyBtn size="sm" variant={"destructive"}>
											Delete
											{isConfirming ? (
												<Loader className="animate-spin" />
											) : (
												<Trash2 />
											)}
										</MyBtn>
									</ConfirmationDialog>
								)}

								<ConfirmationDialog
									action={cancelHandler}
									msg="Are you sure you want to Cancel this application? It will be set to AutoMode✨"
									successMsg="Appointment Cancelled"
								>
									<MyBtn
										size="sm"
										variant={"secondary"}
										className="text-destructive"
									>
										Cancel
										<CircleX />
									</MyBtn>
								</ConfirmationDialog>
							</>
						) : (
							appointment.status === eAppointmentStatus.CONFIRMED && (
								<HoverBorderGradient
									containerClassName="rounded-full"
									as="button"
									onClick={() =>
										router.push(
											`/consultation/${encodeURIComponent(appointment._id!)}`
										)
									}
									className="cursor-pointer w-full bg-background text-foreground  inline-flex items-center space-x-2 text-center"
								>
									<MessageCircleMore />
									<span>Consultation</span>
								</HoverBorderGradient>
							)
						)}
					</div>
				</section>
			</DynamicPanelContent>
		</DynamicPanel>
	);
}
