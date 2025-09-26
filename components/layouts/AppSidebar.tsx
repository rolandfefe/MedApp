import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
} from "../ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import AppSidebarFooter from "./AppSidebarFooter";

export default function AppSidebar() {
	return (
		<Sidebar variant="floating">
			<SidebarHeader>
				<AppSidebarHeader />
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu></SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<AppSidebarFooter />
			</SidebarFooter>
		</Sidebar>
	);
}
