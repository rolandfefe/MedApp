import Navbar from "@/components/layouts/Navbar";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AppSidebar from "@/components/layouts/AppSidebar";
import DoctorSidebar from "@/components/layouts/DoctorSidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getDoctor } from "@/lib/actions/doctor.actions";
import DoctorNavbar from "@/components/layouts/DoctorNavbar";
import ConsultationSidebar from "@/components/layouts/ConsultationSidebar";
import ConsultationNavbar from "@/components/layouts/ConsultationNavbar";

export default async function layout({ children }: { children: ReactNode }) {
	const currentUser = await getCurrentUser();

	return (
		<>
			<SidebarProvider defaultOpen>
				<ConsultationSidebar currentUser={currentUser} />
				<SidebarInset>
					<ScrollArea className="h-screen">
						<ConsultationNavbar />
						<main className="overflow-x-hidden p-3">{children}</main>
						<ScrollBar />
					</ScrollArea>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
