import { getPatientNav } from "@/lib/actions/globals.actions";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarRail,
} from "../ui/sidebar";
import AppSidebarFooter from "./AppSidebarFooter";
import AppSidebarHeader from "./AppSidebarHeader";
import NavItem from "./NavItem";

export default async function AppSidebar() {
	const patientNav = await getPatientNav();

	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarHeader>
				<AppSidebarHeader />
			</SidebarHeader>
			<SidebarContent className="p-1">
				<SidebarMenu>
					{patientNav.items!.map(({ icon, name, link }, i) => (
						<NavItem key={i} icon={icon} name={name} link={link} />
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<AppSidebarFooter />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
