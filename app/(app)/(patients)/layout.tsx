import MyBtn from "@/components/custom/MyBtn";
import { AppointmentPanel } from "@/components/forms/AppointmentForm";
import AppSidebar from "@/components/layouts/AppSidebar";
import Navbar from "@/components/layouts/Navbar";
import { MorphingDialogTitle } from "@/components/motion-primitives/morphing-dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ShineBorder } from "@/components/ui/shine-border";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ArticleProvider } from "@/contexts/Articles.context";
import { CurrentProvider } from "@/contexts/Current.context";
import { DoctorsProvider } from "@/contexts/Doctors.context";
import { RemindersProvider } from "@/contexts/Reminder.context";
import { getArticles } from "@/lib/actions/article.actions";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { getPatientNav } from "@/lib/actions/globals.actions";
import { getReminders } from "@/lib/actions/reminder.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import {
	getCurrentDoctor,
	getCurrentPatient,
} from "@/lib/actions/utils.actions";
import { eReminderVariants } from "@/types/enums/enums";
import { Headset } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const dynamic = "force-dynamic"; // !test

export default async function layout({ children }: { children: ReactNode }) {
	const [
		currentUser,
		patient,
		currentDoctor,
		{ doctors },
		patientNav,
		{ articles },
	] = await Promise.all([
		getCurrentUser(),
		getCurrentPatient(),
		getCurrentDoctor(),
		getDoctors({ limit: 0 }),
		getPatientNav(),
		getArticles({}),
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

	console.log(currentUser, patient, currentDoctor);

	// ? Redirect to doctor mode if no patient account found
	if (!patient && currentDoctor) redirect(`/doctor/${currentDoctor.id}`);

	return (
		<CurrentProvider user={currentUser} patient={patient}>
			<DoctorsProvider doctorsInit={doctors}>
				<ArticleProvider articlesInit={articles}>
					<RemindersProvider
						remindersInit={{
							appointments: appointmentReminders,
							medications: medicationReminders,
							personal: personalReminders,
							followUp: followUpReminders,
						}}
					>
						<SidebarProvider defaultOpen>
							<AppSidebar />
							<SidebarInset>
								<ScrollArea className="h-screen">
									<Navbar patientNav={patientNav} />
									<main className="overflow-x-hidden p-3">{children}</main>
									<ScrollBar />
								</ScrollArea>
							</SidebarInset>
						</SidebarProvider>
					</RemindersProvider>
				</ArticleProvider>

				<AppointmentPanel
					action="Create"
					className="fixed bottom-3 right-3 size"
				>
					<MyBtn
						size="icon"
						variant={"secondary"}
						className="size-12 sm:size-16 rounded-full glass glass-shadow text-primary"
					>
						<ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

						<MorphingDialogTitle>
							<Headset size={23} />
						</MorphingDialogTitle>
					</MyBtn>
				</AppointmentPanel>
			</DoctorsProvider>
		</CurrentProvider>
	);
}
