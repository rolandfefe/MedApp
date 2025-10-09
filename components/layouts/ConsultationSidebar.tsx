"use client";

import { getAppointmentById } from "@/lib/actions/appointment.actions";
import { ArrowUpRightFromSquare, Notebook, Stethoscope } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PatientConsultationAside from "../asides/PatientConsultationAside";
import DoctorCard from "../cards/DoctorCard";
import MyBtn from "../custom/MyBtn";
import { DoctorNotesFormPanel } from "../forms/DoctorNotesForm";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { ButtonGroup } from "../ui/button-group";
import { getHistory } from "@/lib/actions/history.action";
import { getIsAppointmentDoctor } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import Link from "next/link";
import { DiagnosisFormPanel } from "../forms/DiagnosisForm";
import PatientFooter from "./PatientFooter";

export default function ConsultationSidebar({
	currentUser,
}: {
	currentUser: IUser;
}) {
	const { appointmentId } = useParams();

	const [appointment, setAppointment] = useState<IAppointment>();
	const [patientHistory, setPatientHistory] = useState<IHistory>();
	const isAppointmentDoctor = getIsAppointmentDoctor(appointment!, currentUser);

	useEffect(() => {
		// Fetch appointment data
		(async () => {
			const _appointment = await getAppointmentById(appointmentId as string);

			setAppointment(_appointment);
			setPatientHistory(
				await getHistory({ patientId: _appointment.patient!._id as string })
			);
		})();

		// Pusher
		pusherClient
			.subscribe(`appointment-${appointmentId}`)
			.bind(
				`appointment-${appointmentId}-updated`,
				(updatedAppointment: IAppointment) => {
					console.log("Appointment updated via Pusher:", updatedAppointment);
					setAppointment(updatedAppointment);
				}
			);

		return () => pusherClient.unsubscribe(`appointment-${appointmentId}`);
	}, [appointmentId]);

	// console.log(patientHistory);

	return (
		<Sidebar variant="sidebar" className="!w[50rem]">
			<SidebarHeader></SidebarHeader>
			<SidebarContent className="p-2">
				{appointment ? (
					isAppointmentDoctor ? (
						<PatientConsultationAside
							history={patientHistory!}
							appointment={appointment}
						/>
					) : (
						<DoctorCard
							doctor={appointment.doctor as IDoctor}
							currentUser={currentUser}
							variant="md"
						/>
					)
				) : (
					<LoadingCard />
				)}
			</SidebarContent>

			<SidebarFooter>
				{isAppointmentDoctor ? (
					<PatientFooter appointment={appointment!} currentUser={currentUser} />
				) : (
					<DoctorFooter appointment={appointment!} currentUser={currentUser} />
				)}
			</SidebarFooter>
		</Sidebar>
	);
}

const LoadingCard = () => {
	return (
		<div>
			<div className="flex items-center justify-between">
				<Skeleton className="w-20 h-6 rounded-lg" />
				<Skeleton className="w-20 h-6 rounded-lg" />
			</div>

			<Skeleton className="size-24 rounded-full mx-auto" />

			<Skeleton className="w-1/2 h-4 rounded-full mx-auto mt-3" />
			<Skeleton className="w-2/3 h-3 rounded-full mx-auto mt-1" />

			<div className="flex items-center justify-between mt-5 gap-x-2">
				<Skeleton className="flex-1 h-6 rounded-lg" />
				<Skeleton className="flex-1 h-6 rounded-lg" />
				<Skeleton className="flex-1 h-6 rounded-lg" />
			</div>
			<Skeleton className="w-full h-18 rounded-lg mt-3	" />
		</div>
	);
};

const DoctorFooter = ({
	appointment,
	currentUser,
}: {
	appointment: IAppointment;
	currentUser: IUser;
}) => {
	if (!appointment) return <Skeleton className="w-full h-9 rounded-xl" />;

	return <p>Doctor footer.</p>;
};
