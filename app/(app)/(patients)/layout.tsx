import MyBtn from "@/components/custom/MyBtn";
import { AppointmentPanel } from "@/components/forms/AppointmentForm";
import AppSidebar from "@/components/layouts/AppSidebar";
import Navbar from "@/components/layouts/Navbar";
import { MorphingDialogTitle } from "@/components/motion-primitives/morphing-dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ShineBorder } from "@/components/ui/shine-border";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CurrentProvider } from "@/contexts/Current.context";
import { DoctorsProvider } from "@/contexts/Doctors.context";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { getPatientNav } from "@/lib/actions/globals.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import {
	getCurrentDoctor,
	getCurrentPatient,
} from "@/lib/actions/utils.actions";
import { Headset } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
	const [currentUser, patient, currentDoctor, { doctors }, patientNav] =
		await Promise.all([
			getCurrentUser(),
			getCurrentPatient(),
			getCurrentDoctor(),
			getDoctors({ limit: 0 }),
			getPatientNav(),
		]);

	console.log(currentUser, patient, currentDoctor);

	// ? Redirect to doctor mode if no patient account found
	if (!patient && currentDoctor) redirect(`/doctor/${currentDoctor.id}`);

	return (
		<CurrentProvider user={currentUser} patient={patient}>
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

			<DoctorsProvider doctorsInit={doctors}>
				<CurrentProvider patient={patient}>
					<AppointmentPanel
						action="Create"
						className="fixed bottom-3 right-3 size"
					>
						<MyBtn
							asChild
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
				</CurrentProvider>
			</DoctorsProvider>
		</CurrentProvider>
	);
}
