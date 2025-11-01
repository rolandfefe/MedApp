import ConsultationNavbar from "@/components/layouts/ConsultationNavbar";
import ConsultationSidebar from "@/components/layouts/ConsultationSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ConsultationProvider } from "@/contexts/consultation.context";
import { CurrentProvider } from "@/contexts/Current.context";
import { getAppointment } from "@/lib/actions/appointment.actions";
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
	const { appointmentId } = await params;
	const appointment = await getAppointment(decodeURIComponent(appointmentId));

	const [currentUser, { referrals }, patientHistory] = await Promise.all([
		getCurrentUser(),
		getReferrals({ appointment: appointment.id }),
		getHistory({ patient: appointment.patient!.id as string }),
	]);

	return (
		<CurrentProvider user={currentUser} suppressHydrationWarning>
			<ConsultationProvider
				appointment={appointment}
				patientHistory={patientHistory}
				referrals={referrals}
			>
				<SidebarProvider defaultOpen>
					{/* Custom Context for Consultation */}
					<ConsultationSidebar />
					<SidebarInset>
						<ConsultationNavbar />
						<main className=" px-2 sm:px-5">{children}</main>
					</SidebarInset>
				</SidebarProvider>
			</ConsultationProvider>
		</CurrentProvider>
	);
}
