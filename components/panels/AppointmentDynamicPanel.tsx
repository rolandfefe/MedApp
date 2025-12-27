import { useCurrent } from "@/contexts/Current.context";
import {
	deleteAppointment,
	updateAppointment,
} from "@/lib/actions/appointment.actions";
import { eAppointmentStatus } from "@/types/enums/enums";
import {
	CircleCheck,
	CircleX,
	FileBadge2,
	Loader,
	MessageCircleMore,
	Sparkles,
	Trash2,
} from "lucide-react";
import moment from "moment";
import { ReactNode, useTransition } from "react";
import toast from "react-hot-toast";
import LinkBtn from "../btns/LinkBtn";
import { AppointmentStatusBadge } from "../cards/AppointmentCard";
import DoctorCard from "../cards/DoctorCard";
import PatientCard from "../cards/patientCard";
import CopyBadge from "../custom/CopyBadge";
import {
	DynamicPanel,
	DynamicPanelContent,
	DynamicPanelTrigger,
} from "../custom/DynamicPanel";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Separator } from "../ui/separator";
import { ShineBorder } from "../ui/shine-border";
import ConfirmationDialog from "./ConfirmationDialog";

export default function AppointmentDynamicPanel({
	appointment,
	mode,
	children,
}: {
	appointment: IAppointment;
	mode: "Patient" | "Doctor";
	children?: ReactNode;
}) {
	const currentPatient = useCurrent().currentPatient as IPatient;
	const currentDoctor = useCurrent().currentDoctor as IDoctor;

	const [isPending, startTransition] = useTransition();
	const [isConfirming, startConfirmation] = useTransition();
	const [isOpeningConsultation, startOpeningConsultation] = useTransition();

	const isAppointmentDoctor = currentDoctor?.id == appointment.doctor?.id;
	const isAutoMode =
		!appointment.doctor ||
		(appointment.status == eAppointmentStatus.CANCELLED &&
			!isAppointmentDoctor);

	const cancelHandler = async () => {
		await updateAppointment({
			...appointment,
			cancellation: {
				cancelledAt: `${new Date()}`,
				cancelledBy:
					mode === "Patient" ? currentPatient?.id : currentDoctor?.id,
				reason: "",
			},
			confirmation: undefined,
			status: eAppointmentStatus.CANCELLED,
		});
	};

	const confirmHandler = async () =>
		startConfirmation(async () => {
			await updateAppointment({
				...appointment,
				confirmation: {
					confirmedAt: `${new Date()}`,
					isConfirmed: true,
					confirmedBy: currentDoctor?.id,
				},
				cancellation: undefined,
				status: eAppointmentStatus.CONFIRMED,
			});

			toast.success("Confirmed");
		});

	const deleteHandler = async () => await deleteAppointment(appointment.id!);

	const takeAppointmentHandler = () =>
		startTransition(async () => {
			// ? Assigned & Confirm appointment

			await updateAppointment({
				...appointment,
				doctor: currentDoctor?.id,
				confirmation: {
					confirmedAt: `${new Date()}`,
					isConfirmed: true,
					confirmedBy: currentDoctor?.id,
				},
				cancellation: undefined,
				status: eAppointmentStatus.CONFIRMED,
			});

			toast.success(
				`You have now been assigned appointment 🆔:'${appointment.id!}'`
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

						<CopyBadge variant={"secondary"} content={appointment.id!}>
							{appointment.id}
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

					<div className="space-y-2">
						{mode === "Doctor" ? (
							<PatientCard patient={appointment.patient as IPatient} />
						) : (
							!isAutoMode && (
								<DoctorCard doctor={appointment.doctor as IDoctor} />
							)
						)}

						{isAutoMode && (
							<div className="p-2 border rounded-xl">
								<p className="flex items-center gap-x-2 justify-center text-blue-500 font-medium">
									<Sparkles />
									Auto mode
								</p>

								{mode === "Doctor" ? (
									<>
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
									</>
								) : (
									<p className="text-sm text-center text-muted-foreground">
										System will match you with a doctor.
									</p>
								)}
							</div>
						)}
					</div>

					{/* Actions */}
					<div className="flex items-center gap-x-2 justify-center mt-4">
						{appointment.doctor && (
							<>
								{mode === "Doctor" &&
									appointment.status === eAppointmentStatus.SCHEDULED && (
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
									)}

								{appointment.status === eAppointmentStatus.CONFIRMED && (
									<LinkBtn
										link={{
											href: `/consultation/${encodeURIComponent(
												appointment.id!
											)}`,
										}}
										variant={"ghost"}
										asChild
										className="p-0! "
									>
										<HoverBorderGradient
											containerClassName="rounded-full"
											as="div"
											className="cursor-pointer w-full bg-background text-foreground  inline-flex items-center space-x-2 text-center"
										>
											<MessageCircleMore />
											<span>Consultation</span>
										</HoverBorderGradient>
									</LinkBtn>
								)}

								{appointment.status !== eAppointmentStatus.CANCELLED &&
									appointment.status !== eAppointmentStatus.NO_SHOW &&
									appointment.status !== eAppointmentStatus.SCHEDULED && (
										<LinkBtn
											variant={"invert"}
											link={{
												href: `/consultation/${appointment.id!}/report`,
											}}
											className=""
										>
											<FileBadge2 />
											Report
										</LinkBtn>
									)}

								{(mode === "Patient" &&
									appointment.status === eAppointmentStatus.SCHEDULED) ||
									(appointment.status === eAppointmentStatus.CANCELLED && (
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
									))}

								{/* Allow patients to CANCEL AT any stage of the process */}
								{appointment.status === eAppointmentStatus.SCHEDULED && (
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
								)}
							</>
						)}
					</div>
				</section>
			</DynamicPanelContent>
		</DynamicPanel>
	);
}
