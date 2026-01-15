"use client";

import { useVerdicts } from "@/contexts/Verdicts.context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { stagger, Variants, motion } from "motion/react";
import Void from "../custom/Void";
import MedicationCard from "../cards/MedicationCard";
import ProcedureCard from "../cards/ProcedureCard";
import TherapyCard from "../cards/TherapyCard";
import { Flower, HandHelping, Pill } from "lucide-react";

const motionVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.5,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

export default function VerdictsFeed() {
	const { isLoading, loadRef, verdicts } = useVerdicts();

	const medications =
		verdicts.flatMap((v) => v.treatmentPlan.medications) ?? [];
	const procedures = verdicts.flatMap((v) => v.treatmentPlan.procedures) ?? [];
	const therapies = verdicts.flatMap((v) => v.treatmentPlan.therapies) ?? [];

	console.log("Pat verdicts", verdicts);

	return (
		<Tabs defaultValue="Drugs" className="pt-3 sm:p-3">
			<TabsList className="flex mx-auto rounded-xl">
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
				<motion.section
					variants={motionVariants}
					initial="hidden"
					animate="visible"
					transition={{
						delayChildren: stagger(0.3),
					}}
					className="space-y-4"
				>
					{medications.length > 0 ? (
						medications.map((m) => (
							<motion.div variants={motionVariants} key={m!.id} layout>
								<MedicationCard medication={m!} />
							</motion.div>
						))
					) : (
						<Void msg="No Medications prescribed💊" />
					)}
				</motion.section>
			</TabsContent>
			<TabsContent value="Procedures">
				<motion.section
					variants={motionVariants}
					initial="hidden"
					animate="visible"
					transition={{
						delayChildren: stagger(0.3),
					}}
					className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-3"
				>
					{procedures.length > 0 ? (
						procedures.map((p) => (
							<motion.div
								variants={motionVariants}
								key={p!.id}
								layout
								className="flex-1 sm:basis-[45%] md:basis-[30%]"
							>
								<ProcedureCard procedure={p!} />
							</motion.div>
						))
					) : (
						<Void msg="No procedure prescribed🏃‍♀️" />
					)}
				</motion.section>
			</TabsContent>
			<TabsContent value="Therapies">
				<motion.section
					variants={motionVariants}
					initial="hidden"
					animate="visible"
					transition={{
						delayChildren: stagger(0.3),
					}}
					className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-3 gap-y-4"
				>
					{therapies.length > 0 ? (
						therapies.map((t) => (
							<motion.div
								variants={motionVariants}
								key={t!.id}
								layout
								className="flex-1 sm:basis-[45%] md:basis-[30%]"
							>
								<TherapyCard therapy={t!} />
							</motion.div>
						))
					) : (
						<Void msg="No therapies prescribed🧘" />
					)}
				</motion.section>
			</TabsContent>
		</Tabs>
	);
}
