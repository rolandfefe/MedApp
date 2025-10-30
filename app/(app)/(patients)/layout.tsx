import Navbar from "@/components/layouts/Navbar";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AppSidebar from "@/components/layouts/AppSidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { AppointmentPanel } from "@/components/forms/AppointmentForm";
import MyBtn from "@/components/custom/MyBtn";
import { Headset } from "lucide-react";
import { getCurrentPatient } from "@/lib/actions/utils.actions";
import { MorphingDialogTitle } from "@/components/motion-primitives/morphing-dialog";
import { ShineBorder } from "@/components/ui/shine-border";
import { getDoctors } from "@/lib/actions/doctor.actions";

export default async function layout({ children }: { children: ReactNode }) {
	const [currentUser, patient, { doctors }] = await Promise.all([
		getCurrentUser(),
		getCurrentPatient(),
		getDoctors({limit: 0}),
	]);

	return (
		<>
			<SidebarProvider defaultOpen>
				<AppSidebar currentUser={currentUser} />
				<SidebarInset>
					<ScrollArea className="h-screen">
						<Navbar />
						<main className="overflow-x-hidden p-3">{children}</main>
						<ScrollBar />
					</ScrollArea>
				</SidebarInset>
			</SidebarProvider>
			<AppointmentPanel
				doctors={doctors}
				action="Create"
				patient={patient}
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
		</>
	);
}
