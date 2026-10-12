"use client";

import { StaggerVariants } from "@/app/MotionVariants";
import { useVerdicts } from "@/contexts/Verdicts.context";
import { cn } from "@/lib/utils";
import { Flower, HandHelping, Pill } from "lucide-react";
import { motion } from "motion/react";
import MedicationCard from "../cards/MedicationCard";
import ProcedureCard from "../cards/ProcedureCard";
import TherapyCard from "../cards/TherapyCard";
import Void from "../custom/Void";
import StaggerList from "../layouts/StaggerList";
import { useSidebar } from "../ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function VerdictsFeed() {
	const { isLoading, loadRef, verdicts } = useVerdicts();
	const { state: sidebarState } = useSidebar();

	const medications =
		verdicts.flatMap((v) => v.treatmentPlan.medications) ?? [];
	const procedures = verdicts.flatMap((v) => v.treatmentPlan.procedures) ?? [];
	const therapies = verdicts.flatMap((v) => v.treatmentPlan.therapies) ?? [];

	// console.log("Pat verdicts", verdicts);

	return (
		<Tabs defaultValue="Drugs" className="pt3 sm:p-3">
			<TabsList className="flex mx-auto rounded-xl sticky top-0">
				<TabsTrigger value="Drugs" className="flex items-center gap-x-1">
					<Pill size={20} />
					<span>Drugs</span>
				</TabsTrigger>
				<TabsTrigger value="Therapies" className="flex items-center gap-x-1">
					<Flower size={20} />
					<span>Therapies</span>
				</TabsTrigger>
				<TabsTrigger value="Procedures" className="flex items-center gap-x-1">
					<HandHelping size={20} />
					<span>Procedures</span>
				</TabsTrigger>
			</TabsList>

			<TabsContent value="Drugs">
				<StaggerList className="space-y-4">
					{medications.length > 0 ? (
						medications.map((m) => (
							<motion.div
								variants={StaggerVariants}
								transition={{ ease: "easeOut", duration: 0.5 }}
								key={m!.id}
								layout
							>
								<MedicationCard medication={m!} />
							</motion.div>
						))
					) : (
						<Void msg="No Medications prescribed💊" />
					)}
				</StaggerList>
			</TabsContent>
			<TabsContent value="Therapies">
				<StaggerList className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-3 gap-y-4">
					{therapies.length > 0 ? (
						therapies.map((t) => (
							<motion.div
								variants={StaggerVariants}
								transition={{ ease: "easeOut", duration: 0.5 }}
								key={t!.id}
								layout
								className={cn(
									"flex-1 basis-full  lg:basis-[30%]",
									sidebarState === "expanded"
										? "sm:basis-full md:basis-[45%]"
										: "sm:basis-[45%] md:basis-[30%] "
								)}
							>
								<TherapyCard therapy={t!} />
							</motion.div>
						))
					) : (
						<Void msg="No therapies prescribed🧘" />
					)}
				</StaggerList>
			</TabsContent>

			<TabsContent value="Procedures">
				<StaggerList className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-3">
					{procedures.length > 0 ? (
						procedures.map((p) => (
							<motion.div
								variants={StaggerVariants}
								transition={{ ease: "easeOut", duration: 0.5 }}
								key={p!.id}
								layout
								className={cn(
									"flex-1 basis-full  lg:basis-[30%]",
									sidebarState === "expanded"
										? "sm:basis-full md:basis-[45%]"
										: "sm:basis-[45%] md:basis-[30%] "
								)}
							>
								<ProcedureCard procedure={p!} />
							</motion.div>
						))
					) : (
						<Void msg="No procedure prescribed🏃‍♀️" />
					)}
				</StaggerList>
			</TabsContent>
		</Tabs>
	);
}
