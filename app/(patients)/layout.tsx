import Navbar from "@/components/layouts/Navbar";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AppSidebar from "@/components/layouts/AppSidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";

export default async function layout({ children }: { children: ReactNode }) {
	const currentUser = await getCurrentUser();

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
		</>
	);
}
