import React, { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { eAppointmentStatus } from "@/types/enums/enums";
import { Dot, Sparkles } from "lucide-react";
import PatientCard from "./patientCard";
import DoctorCard from "./DoctorCard";
import moment from "moment";

export default function AppointmentCard({
	appointment,
	currentDoctor,
	currentPatient,
	variant = "md",
	mode,
	className,
}: {
	appointment: IAppointment;
	currentPatient?: IPatient;
	currentDoctor?: IDoctor;
	variant: "sm" | "md" | "lg";
	mode: "Patient" | "Doctor";
	className?: string;
}) {
	// const {} = appointment.doctor

	if (variant === "sm") {
		return (
			<Card className={cn("", className)}>
				<CardContent></CardContent>
			</Card>
		);
	} else if (variant === "md") {
		return (
			<Card className={cn("bg-popover hover:bg-muted/50 h-56", className)}>
				<CardContent className="space-y-3">
					{mode === "Doctor" ? (
						<PatientCard
							patient={appointment.patient as IPatient}
							currentDoctor={currentDoctor!}
							variant="md"
						/>
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
						<StatusBadge status={appointment.status!} variant={"secondary"}>
							{appointment.status}
						</StatusBadge>
					</div>
				</CardContent>
			</Card>
		);
	} else if (variant === "lg") {
		return (
			<Card className={cn("", className)}>
				<CardContent></CardContent>
			</Card>
		);
	}
}

const StatusBadge = ({
	status,
	className,
	...props
}: { status: eAppointmentStatus } & ComponentProps<typeof Badge>) => (
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
