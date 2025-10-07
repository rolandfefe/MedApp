"use client";

import { getAppointmentById } from "@/lib/actions/appointment.actions";
import { Notebook } from "lucide-react";
import { useParams } from "next/navigation";
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

export default function ConsultationSidebar({
	currentUser,
}: {
	currentUser: IUser;
}) {
	const { appointmentId } = useParams();

	const [appointment, setAppointment] = useState<IAppointment>();
	const isAppointmentDoctor = appointment?.doctor!.user._id == currentUser._id;

	useEffect(() => {
		const fetchAppointment = async () =>
			setAppointment(await getAppointmentById(appointmentId as string));

		fetchAppointment();
	}, [appointmentId]);

	return (
		<Sidebar variant="sidebar" className="!w[50rem]">
			<SidebarHeader></SidebarHeader>
			<SidebarContent className="p-2">
				{appointment ? (
					isAppointmentDoctor ? (
						<PatientConsultationAside appointment={appointment} />
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
				{appointment ? (
					<DoctorNotesFormPanel appointment={appointment}>
						<MyBtn className="w-full">
							Medical Notes <Notebook />
						</MyBtn>
					</DoctorNotesFormPanel>
				) : (
					<Skeleton className="w-full h-9 rounded-xl" />
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
