import Navbar from "@/components/layouts/Navbar";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AppSidebar from "@/components/layouts/AppSidebar";
import DoctorSidebar from "@/components/layouts/DoctorSidebar";

export default function layout({ children }: { children: ReactNode }) {
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
