import { useCurrent } from "@/contexts/Current.context";
import { cn } from "@/lib/utils";
import { eAppointmentStatus } from "@/types/enums/enums";
import {
	CircleX,
	Dot,
	Headset,
	Loader,
	MessageCircleMore,
	Sparkles,
	Trash2,
} from "lucide-react";
import moment from "moment";
import { ComponentProps, useTransition } from "react";
import AppointmentDynamicPanel from "../panels/AppointmentDynamicPanel";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import DoctorCard from "./DoctorCard";
import PatientCard from "./patientCard";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import LinkBtn from "../btns/LinkBtn";
import MyBtn from "../custom/MyBtn";
import ConfirmationDialog from "../panels/ConfirmationDialog";
import {
	deleteAppointment,
	updateAppointment,
} from "@/lib/actions/appointment.actions";
import CopyBadge from "../custom/CopyBadge";
import { Separator } from "../ui/separator";
import Heading from "../custom/Heading";

export default function AppointmentCard({
	appointment,
	mode,
	className,
}: {
	appointment: IAppointment;
	mode: "Patient" | "Doctor";
	className?: string;
}) {
	// const {} = appointment.doctor
	const currentPatient = useCurrent().currentPatient as IPatient;
	const currentDoctor = useCurrent().currentDoctor as IDoctor;

	return (
		<AppointmentDynamicPanel mode={mode} appointment={appointment}>
			<Card className={cn("bg-popover hover:bg-muted/50 h-56", className)}>
				<CardContent className="space-y-3">
					{mode === "Doctor" ? (
						<PatientCard patient={appointment.patient as IPatient} />
					) : appointment.doctor ? (
						<DoctorCard
							doctor={appointment.doctor as IDoctor}
							className="w-full"
						/>
					) : (
						<div className="h-24 p-2 border rounded-xl">
							<p className="flex items-center gap-x-2 justify-center text-blue-500 font-medium">
								<Sparkles />
								Auto mode
							</p>
							<p className="text-sm text-center text-muted-foreground">
								Doctor-to-patient auto pairing
							</p>
						</div>
					)}

					<div className="flex items-center gap-2 ">
						<div className="bg-background p-2 px-3 rounded-xl w-fit h-14">
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

						<div className="flex-1 bg-background p-2 px-3 rounded-xl w-fit h-14">
							<p className="text-sm text-muted-foreground line-clamp-2 leading-tight">
								{appointment.reason}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-x-3 justify-between">
						<Badge variant="secondary">{appointment.type}</Badge>
						<AppointmentStatusBadge
							status={appointment.status!}
							variant={"secondary"}
						>
							{appointment.status}
						</AppointmentStatusBadge>
					</div>
				</CardContent>
			</Card>
		</AppointmentDynamicPanel>
	);
}

AppointmentCard.SM = ({
	appointment,
	mode,
	className,
}: ComponentProps<typeof AppointmentCard>) => {
	return (
		<Card
			className={cn(
				"hover:bg-secondary/50 transition-all cursor-pointer",
				className
			)}
		>
			<CardContent className="space-y-1">
				<Heading className="text-muted-foreground">
					<Headset size={20} />
					<CopyBadge variant="secondary" content={appointment.id}>
						{appointment.id}
					</CopyBadge>
				</Heading>
				<Separator className="mb-2" />
				<div className="text-muted-foreground text-xs bg-muted p-1 px-2 rounded-md">
					<p className="font-medium">Reason:</p>
					<p>{appointment.reason}</p>
					<div className="mt-2 flex items-center justify-between">
						<span className="text-xs text-end text-muted-foreground font-medium">
							{moment(appointment.createdAt).format("Do MMM - h:mma")}
						</span>
						<AppointmentStatusBadge status={appointment.status} />
					</div>
				</div>
				<AppointmentCard.ACTIONS appointment={appointment} mode={mode} />
			</CardContent>
		</Card>
	);
};

export const AppointmentStatusBadge = ({
	status,
	className,
	...props
}: { status: IAppointment["status"] } & ComponentProps<typeof Badge>) => (
	<Badge
		{...props}
		className={cn(
			status === eAppointmentStatus.CONFIRMED && "bg-primary/10 text-primary",
			status === eAppointmentStatus.ARRIVED && "bg-blue-600/10 text-blue-600",
			status === eAppointmentStatus.NO_SHOW && "bg-amber-500/10 text-amber-500",
			status === eAppointmentStatus.IN_PROGRESS && "text-primary",
			status === eAppointmentStatus.RESCHEDULED &&
				"bg-yellow-400/10 text-yellow",
			status === eAppointmentStatus.CANCELLED &&
				"bg-destructive/10 text-destructive"
		)}
	>
		{status === eAppointmentStatus.IN_PROGRESS && (
			<Dot size={25} className="animate-pulse text-green-500" />
		)}
		{status}
	</Badge>
);

AppointmentCard.ACTIONS = ({
	appointment,
	mode,
	className,
}: ComponentProps<typeof AppointmentCard>) => {
	const [isPending, startTransition] = useTransition();
	const currentPatient = useCurrent().currentPatient as IPatient;
	const currentDoctor = useCurrent().currentDoctor as IDoctor;

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

	const deleteHandler = async () => await deleteAppointment(appointment.id!);

	return (
		<div
			className={cn("flex items-center gap-x-2 justify-center mt-4", className)}
		>
			{appointment.doctor && (
				<>
					{(appointment.status === eAppointmentStatus.CONFIRMED ||
						appointment.status === eAppointmentStatus.REFERRED) && (
						<LinkBtn
							link={{
								href: `/consultation/${encodeURIComponent(appointment.id!)}`,
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
									<Trash2 />
								</MyBtn>
							</ConfirmationDialog>
						))}

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
	);
};
