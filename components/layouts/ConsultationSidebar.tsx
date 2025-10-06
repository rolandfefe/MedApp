"use client";

import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarRail,
	SidebarSeparator,
} from "../ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import AppSidebarFooter from "./AppSidebarFooter";
import { useParams } from "next/navigation";
import { getDoctorNavItems } from "@/constants";
import NavItem from "./NavItem";

export default function ConsultationSidebar({ currentUser }: { currentUser: IUser }) {
	const { id } = useParams();

	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader>
				<AppSidebarHeader />
			</SidebarHeader>
			<SidebarContent className="p-1">
				<SidebarMenu>
					{/* {getDoctorNavItems(id as string).map(({ icon, name, link }, i) => (
            <NavItem key={i} icon={icon} name={name} link={link} />
          ))} */}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<AppSidebarFooter currentUser={currentUser} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
