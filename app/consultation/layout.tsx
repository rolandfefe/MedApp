import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ConsultationNavbar from "@/components/layouts/ConsultationNavbar";
import ConsultationSidebar from "@/components/layouts/ConsultationSidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
	const currentUser = await getCurrentUser();

	return (
		<div suppressHydrationWarning>
			<SidebarProvider defaultOpen>
				<ConsultationSidebar currentUser={currentUser} />
				<SidebarInset>
					<ConsultationNavbar />
					<main className=" px-2 sm:px-5">{children}</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
