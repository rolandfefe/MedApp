import Navbar from "@/components/layouts/Navbar";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AppSidebar from "@/components/layouts/AppSidebar";
import DoctorSidebar from "@/components/layouts/DoctorSidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getDoctor } from "@/lib/actions/doctor.actions";
import DoctorNavbar from "@/components/layouts/DoctorNavbar";
import { getDoctorNav } from "@/lib/actions/globals.actions";
import { CurrentProvider } from "@/contexts/Current.context";
import { getCurrentDoctor } from "@/lib/actions/utils.actions";
import { redirect } from "next/navigation";

export default async function layout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const [currentUser, currentDoctor, doctorNav] = await Promise.all([
		getCurrentUser(),
		getCurrentDoctor(),
		getDoctorNav(),
	]);

	if (!currentDoctor) redirect("/home"); // ? Redirect uf user has no Doctor account.

	return (
		<CurrentProvider user={currentUser} doctor={currentDoctor}>
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
		</CurrentProvider>
	);
}
