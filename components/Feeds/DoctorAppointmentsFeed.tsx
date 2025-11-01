"use client";

import { useCurrent } from "@/contexts/Current.context";
import { usePagination } from "@/contexts/Pagination.context";
import { cn } from "@/lib/utils";
import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums/enums";
import {
	ChevronsUpDown,
	Sparkles,
	TriangleAlert
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AppointmentCard from "../cards/AppointmentCard";
import MyBtn from "../custom/MyBtn";
import Void from "../custom/Void";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSidebar } from "../ui/sidebar";

interface Filters {
	auto?: boolean;
	type?: eAppointmentTypes;
	status?: eAppointmentStatus;
	emergency?: boolean;
}

export default function DoctorAppointmentFeeds({
	autoAppointments,
}: {
	autoAppointments: IAppointment[];
}) {
	const currentDoctor = useCurrent().currentDoctor as IDoctor;
	const { appointments } = usePagination();

	const [filters, setFilters] = useState<Filters>({
		emergency: false,
		auto: false,
	});
	const [filterResults, setFilterResults] =
		useState<IAppointment[]>(appointments);

	const { state: sidebarState } = useSidebar();

	useEffect(() => {
		if (filters.auto) {
			setFilterResults(autoAppointments);
		} else {
			setFilterResults(
				appointments.filter(
					(a) =>
						filters.emergency == a.isEmergency! ||
						filters.status == a.status ||
						filters.type == a.type
				)
			);
		}
	}, [filters, appointments, autoAppointments]);

	return (
		<div className="space-y-2 ">
			<FilterBar filters={filters} setFilters={setFilters} />

			<section className="flex gap-3 flex-col sm:flex-row flex-wrap">
				<AnimatePresence>
					{filterResults.length > 0 ? (
						filterResults.map((appointment) => {
							return (
								<motion.div
									key={appointment.id}
									layout
									initial={{ opacity: 0, y: 100 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 100 }}
									className={cn(
										"mb-2 basis-full sm:basis-[47%] flex-1",
										sidebarState === "expanded" &&
											"sm:basis-full lg:basis-[47%] "
									)}
								>
									<AppointmentCard
										appointment={appointment}
										variant="md"
										mode="Doctor"
									/>
								</motion.div>
							);
						})
					) : (
						<div>
							<Void msg={"Oops! You have no appointments"} />
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
	return (
		<div
			className={cn(
				"glass glass-shadow p-2 rounded-3xl flex items-center gap-x-2 w-fit mx-auto",
				className
			)}
		>
			{/* auto */}
			<MyBtn
				size="sm"
				variant={"secondary"}
				onClick={() => setFilters((prev) => ({ auto: !prev.auto }))}
				className={cn(
					"rounded-2xl text-xs",
					filters?.auto && "text-blue-500 bg-blue-500/10"
				)}
			>
				<Sparkles size={17} />
				<span className="hidden sm:inline">Auto</span>
			</MyBtn>

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
						<DropdownMenuItem key={k} onClick={() => setFilters({ type: v })}>
							{v}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

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
						<DropdownMenuItem key={k} onClick={() => setFilters({ status: v })}>
							{v}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			<MyBtn
				size="sm"
				variant={"secondary"}
				onClick={() => setFilters((prev) => ({ emergency: !prev.emergency }))}
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
