import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
} from "../ui/sidebar";

export default function AppSidebar() {
	return (
		<Sidebar variant="floating">
			<SidebarHeader></SidebarHeader>
			<SidebarContent>
				<SidebarMenu></SidebarMenu>
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
		</Sidebar>
	);
}
