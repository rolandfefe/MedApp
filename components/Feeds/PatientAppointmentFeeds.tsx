"use client";

import { useAppointments } from "@/contexts/Appointments.context";
import { useCurrent } from "@/contexts/Current.context";
import { cn } from "@/lib/utils";
import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums/enums";
import {
	ArrowBigRightDash,
	ChevronsUpDown,
	Headset,
	TriangleAlert,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AppointmentCard from "../cards/AppointmentCard";
import MyBtn from "../custom/MyBtn";
import Void from "../custom/Void";
import { AppointmentPanel } from "../forms/AppointmentForm";
import { MorphingDialogTitle } from "../motion-primitives/morphing-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ShineBorder } from "../ui/shine-border";
import { useSidebar } from "../ui/sidebar";

interface Filters {
	referred?: boolean;
	type?: eAppointmentTypes;
	status?: eAppointmentStatus;
	emergency?: boolean;
}

export default function PatientAppointmentFeeds() {
	const currentPatient = useCurrent().currentPatient!;
	const { state: sidebarState } = useSidebar();
	const { appointments, loadRef, isLoading } = useAppointments();

	// console.log(appointments)

	console.log("loading Appointments:", isLoading);

	const [filters, setFilters] = useState<Filters>({
		emergency: false,
		referred: false,
	});
	const [filterResults, setFilterResults] =
		useState<IAppointment[]>(appointments);

	useEffect(() => {
		setFilterResults(
			appointments.filter(
				(a) =>
					filters.emergency == a.isEmergency! ||
					// filters.referred == !!a.referral ||
					filters.status == a.status ||
					filters.type == a.type
			)
		);
	}, [filters, appointments]);

	return (
		<div className="space-y-2">
			<FilterBar filters={filters} setFilters={setFilters} />

			<section className="flex gap-3 flex-col sm:flex-row flex-wrap">
				<AnimatePresence>
					{appointments.length > 0 && filterResults.length > 0 ? (
						filterResults.map((appointment) => {
							const isLastItem =
								appointments[appointments.length - 1].id === appointment.id;

							return (
								<motion.div
									key={appointment.id}
									layout
									initial={{ opacity: 0, y: 100 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 100 }}
									className={cn(
										"mb-3 basis-full sm:basis-[47%] flex-1",
										sidebarState === "expanded" &&
											"sm:basis-full lg:basis-[47%]"
									)}
									ref={isLastItem ? loadRef : null}
								>
									<AppointmentCard appointment={appointment} mode="Patient" />
								</motion.div>
							);
						})
					) : (
						<div>
							<Void
								msg={
									filters
										? `No Appointment matches your filters. Create one by clicking below.`
										: "Oops! You have no appointment. Click below to apply.🤗"
								}
							/>

							<AppointmentPanel action="Create">
								<MyBtn
									size="lg"
									variant={"secondary"}
									className="glass flex w-fit mx-auto mt-4 rounded-xl text-primary"
								>
									<ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
									<MorphingDialogTitle className="flex items-center gap-x-2">
										<Headset /> New Appointment
									</MorphingDialogTitle>
								</MyBtn>
							</AppointmentPanel>
						</div>
					)}
				</AnimatePresence>
			</section>
		</div>
	);
}

const FilterBar = ({
	filters,
	setFilters,
	className,
}: {
	filters: Filters | undefined;
	setFilters: Dispatch<SetStateAction<Filters>>;
	className?: string;
}) => {
	console.log(filters);
	return (
		<div
			className={cn(
				"glass glass-shadow p-2 rounded-3xl flex items-center gap-x-2 w-fit mx-auto",
				className
			)}
		>
			{/* referred */}
			<MyBtn
				size="sm"
				variant={"secondary"}
				onClick={() =>
					// setFilters((prev) => ({ ...prev, referred: !prev.referred }))
					setFilters((prev) => ({ referred: !prev.referred }))
				}
				className={cn(
					"rounded-2xl text-xs",
					filters?.referred && "text-primary bg-primary/10"
				)}
			>
				<ArrowBigRightDash size={17} />

				<span className="hidden sm:inline">Referred</span>
			</MyBtn>
			{/* type */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<MyBtn
						size="sm"
						variant={"secondary"}
						className={cn(
							"rounded-2xl text-xs",
							filters?.type && "text-primary "
						)}
					>
						{filters?.type ?? "Type"}
						<ChevronsUpDown size={17} />
					</MyBtn>
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					{Object.entries(eAppointmentTypes).map(([k, v]) => (
						<DropdownMenuItem
							key={k}
							// onClick={() => setFilters((prev) => ({ ...prev, type: v }))}
							onClick={() => setFilters({ type: v })}
						>
							{v}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			{/* status */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<MyBtn
						size="sm"
						variant={"secondary"}
						className={cn(
							"rounded-2xl text-xs",
							filters?.status && "text-primary "
						)}
					>
						{filters?.status ?? "Status"}
						<ChevronsUpDown size={17} />
					</MyBtn>
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					{Object.entries(eAppointmentStatus).map(([k, v]) => (
						<DropdownMenuItem
							key={k}
							// onClick={() => setFilters((prev) => ({ ...prev, status: v }))}
							onClick={() => setFilters({ status: v })}
						>
							{v}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			{/* emergency */}
			<MyBtn
				size="sm"
				variant={"secondary"}
				onClick={() =>
					// setFilters((prev) => ({ ...prev, emergency: !prev.emergency }))
					setFilters((prev) => ({ emergency: !prev.emergency }))
				}
				className={cn(
					"rounded-2xl text-xs",
					filters?.emergency && "text-destructive bg-destructive/10"
				)}
			>
				<TriangleAlert size={17} />
				<span className="hidden sm:inline">Emergency</span>
			</MyBtn>
		</div>
	);
};
