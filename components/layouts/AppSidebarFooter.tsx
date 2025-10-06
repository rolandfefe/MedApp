"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import {
	Sidebar,
	SidebarMenu,
	SidebarMenuButton,
	useSidebar,
} from "../ui/sidebar";
import RemindersPanel from "../panels/RemindersPanel";
import {
	AlarmClock,
	ChevronsUpDown,
	Hospital,
	UserCircle,
	UserPlus2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserCard from "../cards/UserCard";
import NavItem from "./NavItem";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getDoctor } from "@/lib/actions/doctor.actions";
import { getPatient } from "@/lib/actions/patient.actions";
import { DoctorFormPanel } from "../forms/DoctorForm";
import MyBtn from "../custom/MyBtn";
import { PatientFormPanel } from "../forms/patientForm";
import { useMediaQuery } from "@uidotdev/usehooks";
import { usePathname, useRouter } from "next/navigation";

export default function AppSidebarFooter({
	currentUser,
}: {
	currentUser: IUser;
}) {
	const { state: sidebarState } = useSidebar();
	const [reminders, setReminders] = useState<IReminder[]>([]);
	const [doctor, setDoctor] = useState<IDoctor>();
	const [patient, setPatient] = useState<IPatient>();

	const isSmScreen = useMediaQuery("(width <= 640px )");
	const router = useRouter();
	const pathname = usePathname();

	const isDoctorMode = pathname.split("/")[1] === "doctor";

	useEffect(() => {
		const fetchData = async () => {
			setDoctor(await getDoctor({ userId: currentUser._id! }));
			setPatient(await getPatient({ userId: currentUser._id! }));
		};
		fetchData();
	}, []);

	return (
		<div className="space-y-2">
			<NavItem
				icon={<UserCircle />}
				link="/profile"
				name="Profile"
				className="border"
			/>
			<RemindersPanel currentUser={currentUser} reminders={reminders}>
				<SidebarMenuButton tooltip={"Reminders"} className="border">
					<AlarmClock />
					<span>Reminders</span>
				</SidebarMenuButton>
			</RemindersPanel>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					{(doctor || patient) && (
						<SidebarMenuButton
							tooltip={"Choose mode"}
							// size="lg"
							variant={"outline"}
							className="h-12"
						>
							{isDoctorMode ? (
								<>
									<Hospital />
									<span>Doctor mode</span>
								</>
							) : (
								<>
									<UserPlus2 />
									<span>Patient mode</span>
								</>
							)}
							<ChevronsUpDown />
						</SidebarMenuButton>
					)}
				</DropdownMenuTrigger>

				<DropdownMenuContent
					side={isSmScreen ? "bottom" : "right"}
					align="end"
					sideOffset={4}
					className="min-w-56"
				>
					{doctor ? (
						<DropdownMenuItem
							disabled={isDoctorMode}
							onClick={() =>
								router.push(`/doctor/${encodeURIComponent(doctor._id!)}`)
							}
						>
							<Hospital />
							Doctor mode
						</DropdownMenuItem>
					) : (
						<DoctorFormPanel currentUser={currentUser} action="Create">
							<MyBtn size="sm" className="w-full">
								Apply as Doctor <Hospital />
							</MyBtn>
						</DoctorFormPanel>
					)}

					{patient ? (
						<DropdownMenuItem
							disabled={!isDoctorMode}
							onClick={() => router.push(`/home`)}
						>
							<UserPlus2 />
							Patient mode
						</DropdownMenuItem>
					) : (
						<PatientFormPanel currentUser={currentUser} action="create">
							<MyBtn size="sm" className="w-full">
								Apply as Patient
								<UserPlus2 />
							</MyBtn>
						</PatientFormPanel>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
