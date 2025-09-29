import Navbar from "@/components/layouts/Navbar";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AppSidebar from "@/components/layouts/AppSidebar";
import DoctorSidebar from "@/components/layouts/DoctorSidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getDoctor } from "@/lib/actions/doctor.actions";

export default async function layout({ children }: { children: ReactNode }) {
	const currentUser = await getCurrentUser();

	return (
		<>
			<SidebarProvider defaultOpen>
				<DoctorSidebar />
				<SidebarInset>
					<ScrollArea className="h-screen">
						<Navbar />
						<main className="overflow-x-hidden p-3">{children}</main>
						<ScrollBar />
					</ScrollArea>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
