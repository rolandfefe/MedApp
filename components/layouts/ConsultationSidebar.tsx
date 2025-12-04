"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { useCurrent } from "@/contexts/Current.context";
import { getIsAppointmentDoctor } from "@/lib/utils";
import PatientConsultationAside from "../asides/PatientConsultationAside";
import DoctorCard from "../cards/DoctorCard";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "../ui/sidebar";
import DoctorConsultationFooter from "./DoctorConsultationFooter";
import PatientConsultationFooter from "./PatientConsultationFooter";
import DoctorConsultationAside from "../asides/DoctorConsultationAside";

export default function ConsultationSidebar() {
	const currentUser = useCurrent().currentUser as IUser;

	const { appointment } = useConsultation();
	const isAppointmentDoctor = getIsAppointmentDoctor(appointment, currentUser);

	return (
		<Sidebar variant="sidebar" className="!w[50rem]">
			<SidebarHeader></SidebarHeader>
			<SidebarContent className="p-2">
				{isAppointmentDoctor ? (
					<PatientConsultationAside />
				) : (
					<DoctorConsultationAside />
				)}
			</SidebarContent>

			<SidebarFooter>
				{isAppointmentDoctor ? (
					<PatientConsultationFooter />
				) : (
					<DoctorConsultationFooter />
				)}
			</SidebarFooter>
		</Sidebar>
	);
}
