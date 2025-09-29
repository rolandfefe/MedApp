import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarRail,
} from "../ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import AppSidebarFooter from "./AppSidebarFooter";
import { PATIENT_NAV_ITEMS } from "@/constants";
import NavItem from "./NavItem";

export default function AppSidebar({ currentUser }: { currentUser: IUser }) {
	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarHeader>
				<AppSidebarHeader />
			</SidebarHeader>
			<SidebarContent className="p-1">
				<SidebarMenu>
					{PATIENT_NAV_ITEMS.map(({ icon, name, link }, i) => (
						<NavItem key={i} icon={icon} name={name} link={link} />
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<AppSidebarFooter currentUser={currentUser} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
