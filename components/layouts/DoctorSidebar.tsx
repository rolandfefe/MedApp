"use client";

import { useParams } from "next/navigation";
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

export default function DoctorSidebar({
	currentUser,
	doctorNav,
}: {
	currentUser: IUser;
	doctorNav: IDoctorNav;
}) {
	const { id } = useParams();

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarHeader>
				<AppSidebarHeader />
			</SidebarHeader>
			<SidebarContent className="p-1">
				<SidebarMenu>
					{doctorNav.items!.map(({ icon, name, link }, i) => (
						<NavItem
							key={i}
							icon={icon}
							name={name}
							link={`/doctor/${id}/${link}`}
						/>
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
