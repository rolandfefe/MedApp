import ConsultationNavbar from "@/components/layouts/ConsultationNavbar";
import ConsultationSidebar from "@/components/layouts/ConsultationSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ConsultationProvider } from "@/contexts/consultation.context";
import { getAppointmentById } from "@/lib/actions/appointment.actions";
import { getHistory } from "@/lib/actions/history.action";
import { getReferrals } from "@/lib/actions/referral.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { ReactNode } from "react";

export default async function layout({
	children,
	params,
}: {
	params: Promise<{ appointmentId: string }>;
	children: ReactNode;
}) {
	const currentUser = await getCurrentUser();

	const { appointmentId } = await params;
	const appointment = await getAppointmentById(appointmentId);
	const referrals = await getReferrals({ appointment: appointment._id! });
	const patientHistory = await getHistory({
		patientId: appointment.patient!._id as string,
	});

	return (
		<div suppressHydrationWarning>
			<SidebarProvider defaultOpen>
				{/* Custom Context for Consultation */}
				<ConsultationProvider
					appointment={appointment}
					patientHistory={patientHistory}
					referrals={referrals}
				>
					<ConsultationSidebar currentUser={currentUser} />
				</ConsultationProvider>
				<SidebarInset>
					<ConsultationNavbar />
					<main className=" px-2 sm:px-5">{children}</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
