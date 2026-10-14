import DoctorNavbar from "@/components/layouts/DoctorNavbar";
import DoctorSidebar from "@/components/layouts/DoctorSidebar";
import PopNotifications from "@/components/PopNotifications";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CurrentProvider } from "@/contexts/Current.context";
import { RemindersProvider } from "@/contexts/Reminder.context";
import { getDoctorNav } from "@/lib/actions/globals.actions";
import { getReminders } from "@/lib/actions/reminder.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import {
	getCurrentDoctor,
	getCurrentPatient,
} from "@/lib/actions/utils.actions";
import GoeyProvider from "@/Providers/GoeyProvider";
import { eReminderVariants } from "@/types/enums/enums";
import { GoeyToaster } from "goey-toast";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
	const [currentUser, currentDoctor, currentPatient, doctorNav] =
		await Promise.all([
			getCurrentUser(),
			getCurrentDoctor(),
			getCurrentPatient(),
			getDoctorNav(),
		]);

	const [
		{ reminders: appointmentReminders },
		{ reminders: medicationReminders },
		{ reminders: personalReminders },
		{ reminders: followUpReminders },
	] = await Promise.all([
		getReminders({
			user: currentUser.id,
			variant: eReminderVariants.APPOINTMENT,
		}),
		getReminders({
			user: currentUser.id,
			variant: eReminderVariants.MEDICATION,
		}),
		getReminders({ user: currentUser.id, variant: eReminderVariants.PERSONAL }),
		getReminders({
			user: currentUser.id,
			variant: eReminderVariants.FOLLOW_UP,
		}),
	]);

	if (!currentDoctor) redirect("/home"); // ? Redirect if user has no Doctor account.

	return (
		// <CurrentProvider user={currentUser} doctor={currentDoctor} patient={currentPatient} >
		<CurrentProvider user={currentUser} doctor={currentDoctor}>
			<RemindersProvider
				remindersInit={{
					appointments: appointmentReminders,
					medications: medicationReminders,
					personal: personalReminders,
					followUp: followUpReminders,
				}}
			>
				<GoeyProvider>
					<PopNotifications />
					<SidebarProvider defaultOpen>
						<DoctorSidebar doctorNav={doctorNav} currentUser={currentUser} />
						<SidebarInset>
							<ScrollArea className="h-screen">
								<DoctorNavbar doctorNav={doctorNav} />
								<main className="overflow-x-hidden p-3">{children}</main>
							</ScrollArea>
						</SidebarInset>
					</SidebarProvider>
				</GoeyProvider>
			</RemindersProvider>
		</CurrentProvider>
	);
}
