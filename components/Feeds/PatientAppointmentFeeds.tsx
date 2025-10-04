"use client";

import { cn } from "@/lib/utils";
import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums/enums";
import { AnimatePresence, motion } from "motion/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import Void from "../custom/Void";
import { AppointmentPanel } from "../forms/AppointmentForm";
import MyBtn from "../custom/MyBtn";
import {
	ArrowBigRightDash,
	ChevronsUpDown,
	Headset,
	TriangleAlert,
} from "lucide-react";
import { ShineBorder } from "../ui/shine-border";
import { MorphingDialogTitle } from "../motion-primitives/morphing-dialog";
import AppointmentCard from "../cards/AppointmentCard";
import { Preahvihear } from "next/font/google";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Filters {
	referred: boolean;
	type?: eAppointmentTypes;
	status?: eAppointmentStatus;
	emergency: boolean;
}

export default function PatientAppointmentFeeds({
	appointments,
	currentPatient,
	doctors,
}: {
	appointments: IAppointment[];
	currentPatient: IPatient;
	doctors: IDoctor[];
}) {
	const [filters, setFilters] = useState<Filters>({
		emergency: false,
		referred: false,
	});

	return (
		<div className="space-y-2 ">
			<FilterBar filters={filters} setFilters={setFilters} />

			<section>
				<AnimatePresence>
					{appointments.length > 0 ? (
						appointments.map((appointment) => (
							<motion.div
								key={appointment._id}
								layout
								initial={{ opacity: 0, y: 100 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 100 }}
								className="mb-3"
							>
								<AppointmentCard
									appointment={appointment}
									variant="md"
									currentPatient={currentPatient}
									mode="Patient"
								/>
							</motion.div>
						))
					) : (
						<div>
							<Void msg="Oops! you have no appointment. Click below to apply.🤗" />

							<AppointmentPanel
								action="Create"
								doctors={doctors}
								patient={currentPatient}
							>
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
					setFilters((prev) => ({ ...prev, referred: !prev.referred }))
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
							onClick={() => setFilters((prev) => ({ ...prev, type: v }))}
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
							onClick={() => setFilters((prev) => ({ ...prev, status: v }))}
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
					setFilters((prev) => ({ ...prev, emergency: !prev?.emergency! }))
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
