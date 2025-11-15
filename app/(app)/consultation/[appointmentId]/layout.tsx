import ConsultationNavbar from "@/components/layouts/ConsultationNavbar";
import ConsultationSidebar from "@/components/layouts/ConsultationSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ConsultationProvider } from "@/contexts/consultation.context";
import { CurrentProvider } from "@/contexts/Current.context";
import { MsgProvider } from "@/contexts/message.context";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getDiagnosis } from "@/lib/actions/diagnosis.actions";
import { getHistory } from "@/lib/actions/history.action";
import { getMsgs } from "@/lib/actions/message.actions";
import { getReferrals } from "@/lib/actions/referral.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import {
	getCurrentDoctor,
	getCurrentPatient,
	getVerdictByAppointment,
} from "@/lib/actions/utils.actions";
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

	const [
		currentUser,
		currentDoctor,
		currentPatient,
		{ referrals },
		patientHistory,
		{ msgs },
		diagnosis,
		verdict,
	] = await Promise.all([
		getCurrentUser(),
		getCurrentDoctor(),
		getCurrentPatient(),
		getReferrals({ appointment: appointment.id }),
		getHistory({ patient: appointment.patient!.id as string }),
		getMsgs({ appointment: decodeURIComponent(appointmentId) }),
		getDiagnosis({ appointment: appointmentId }),
		getVerdictByAppointment(appointmentId),
	]);

	return (
		<CurrentProvider
			user={currentUser}
			doctor={currentDoctor}
			patient={currentPatient}
			suppressHydrationWarning
		>
			<ConsultationProvider
				appointment={appointment}
				patientHistory={patientHistory}
				referrals={referrals}
				diagnosis={diagnosis}
				verdict={verdict}
			>
				<MsgProvider msgsInit={msgs} appointment={appointment}>
					<SidebarProvider defaultOpen>
						<ConsultationSidebar />
						<SidebarInset>
							<ConsultationNavbar />
							<main className="px-2 sm:px-5 mt-6">{children}</main>
						</SidebarInset>
					</SidebarProvider>
				</MsgProvider>
			</ConsultationProvider>
		</CurrentProvider>
	);
}
