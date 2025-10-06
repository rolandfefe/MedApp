"use client";

import { cn, getNavItem } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";
import BackBtn from "../btns/BackBtn";
import { ThemeBtn } from "../btns/ThemeBtn";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { SidebarTrigger } from "../ui/sidebar";
import { useEffect, useState } from "react";
import { getAppointment } from "@/lib/actions/appointment.actions";

export default function ConsultationNavbar({
	className,
}: {
	className?: string;
}) {
	const pathname = usePathname();
	const { appointmentId } = useParams();

	const [appointment, setAppointment] = useState<IAppointment>();

	console.log(appointmentId, appointment);

	useEffect(() => {
		const fetchAppointment = async () =>
			setAppointment(await getAppointment({ _id: appointmentId as string }));

		fetchAppointment();
	}, [appointmentId]);

	return (
		<nav
			className={cn(
				"glass p-2 h-[7vh] sticky top-3 right-0 z-30 w-[97%] sm:w-[99%] mx-auto flex items-center justify-between gap-x-2 rounded-xl glass-shadow",
				className
			)}
		>
			<div className="flex items-center gap-x-2">
				<SidebarTrigger />
				<BackBtn />
			</div>

			<div className="flex items-center gap-x-2">
				<ThemeBtn />
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<SignInButton mode="modal">
						<MyBtn>Sign in</MyBtn>
					</SignInButton>
				</SignedOut>
			</div>
		</nav>
	);
}
