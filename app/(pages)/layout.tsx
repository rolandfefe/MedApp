import Navbar from "@/components/layouts/Navbar";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppSidebar from "@/components/layouts/AppSidebar";

export default function layout({ children }: { children: ReactNode }) {
	return (
		<>
			<SidebarProvider defaultOpen>
				<AppSidebar />
				<SidebarInset>
					<ScrollArea className="h-screen">
						<Navbar />
						<main className="overflow-x-hidden p-3">{children}</main>
					</ScrollArea>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
