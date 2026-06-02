import DoctorNavbar from "@/components/layouts/DoctorNavbar";
import DoctorSidebar from "@/components/layouts/DoctorSidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CurrentProvider } from "@/contexts/Current.context";
import { RemindersProvider } from "@/contexts/Reminder.context";
import { getDoctorNav } from "@/lib/actions/globals.actions";
import { getReminders } from "@/lib/actions/reminder.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getCurrentDoctor } from "@/lib/actions/utils.actions";
import { eReminderVariants } from "@/types/enums/enums";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
	const [currentUser, currentDoctor, doctorNav] = await Promise.all([
		getCurrentUser(),
		getCurrentDoctor(),
		getDoctorNav(),
	]);

	const [
		{ reminders: appointmentReminders },
		{ reminders: medicationReminders },
		{ reminders: personalReminders },
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
	]);

	if (!currentDoctor) redirect("/home"); // ? Redirect if user has no Doctor account.

	return (
		<CurrentProvider user={currentUser} doctor={currentDoctor}>
			<RemindersProvider
				remindersInit={{
					appointments: appointmentReminders,
					medications: medicationReminders,
					personal: personalReminders,
				}}
			>
				<SidebarProvider defaultOpen>
					<DoctorSidebar doctorNav={doctorNav} currentUser={currentUser} />
					<SidebarInset>
						<ScrollArea className="h-screen">
							<DoctorNavbar doctorNav={doctorNav} />
							<main className="overflow-x-hidden p-3">{children}</main>
							<ScrollBar />
						</ScrollArea>
					</SidebarInset>
				</SidebarProvider>
			</RemindersProvider>
		</CurrentProvider>
	);
}
