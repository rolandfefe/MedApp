"use client";

import { useCurrent } from "@/contexts/Current.context";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
	AlarmClock,
	ChevronsUpDown,
	Hospital,
	UserCircle,
	UserPlus2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, useState } from "react";
import MyBtn from "../custom/MyBtn";
import { DoctorFormPanel } from "../forms/DoctorForm";
import { PatientFormPanel } from "../forms/patientForm";
import DoctorProfilePanel from "../panels/DoctorProfilePanel";
import RemindersPanel from "../panels/RemindersPanel";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import PatientProfilePanel from "../panels/PatientProfilePanel";

export default function AppSidebarFooter() {
	const { state: sidebarState } = useSidebar();
	const [reminders, setReminders] = useState<IReminder[]>([]);
	const { currentDoctor: doctor, currentPatient: patient } = useCurrent();

	const isSmScreen = useMediaQuery("(width <= 640px )");
	const pathname = usePathname();
	const isDoctorMode = pathname.split("/")[1] === "doctor";

	return (
		<div className="space-y-2">
			{doctor ? (
				<DoctorProfilePanel doctor={doctor}>
					<SidebarMenuButton className="border cursor-pointer">
						<UserCircle />
						Profile
					</SidebarMenuButton>
				</DoctorProfilePanel>
			) : (
				patient && (
					<PatientProfilePanel patient={patient}>
						<SidebarMenuButton className="border cursor-pointer">
							<UserCircle />
							Profile
						</SidebarMenuButton>
					</PatientProfilePanel>
				)
			)}

			<RemindersPanel reminders={reminders}>
				<SidebarMenuButton tooltip={"Reminders"} className="border">
					<AlarmClock />
					<span>Reminders</span>
				</SidebarMenuButton>
			</RemindersPanel>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<SidebarMenuButton
						tooltip={"Choose mode"}
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
				</DropdownMenuTrigger>

				<DropdownMenuContent
					side={isSmScreen ? "bottom" : "right"}
					align="end"
					sideOffset={4}
					className="min-w-56"
				>
					{doctor ? (
						<DropdownMenuItem disabled={isDoctorMode}>
							<Link href={`/home`} className="flex item-center gap-x-1">
								<UserPlus2 />
								Patient mode
							</Link>
						</DropdownMenuItem>
					) : (
						<DoctorFormPanel action="Create">
							<MyBtn size="sm" className="w-full">
								Apply as Doctor <Hospital />
							</MyBtn>
						</DoctorFormPanel>
					)}

					{patient ? (
						<DropdownMenuItem disabled={!isDoctorMode}>
							<Link
								href={`/doctor/${doctor?.id!}`}
								className="flex item-center gap-x-1"
							>
								<Hospital />
								Doctor mode
							</Link>
						</DropdownMenuItem>
					) : (
						<PatientFormPanel action="create">
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
