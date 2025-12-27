"use client";

import { useConsultation } from "@/contexts/consultation.context";
import VerdictForm from "../forms/VerdictForm";
import { Editor } from "../blocks/editor-00/editor";
import { NotebookTabs, Syringe } from "lucide-react";
import { Variants, motion, stagger } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Void from "../custom/Void";
import MedicationCard from "../cards/MedicationCard";
import ProcedureCard from "../cards/ProcedureCard";
import TherapyCard from "../cards/TherapyCard";

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

export default function VerdictSection() {
	const { appointment, verdict } = useConsultation();

	if (!verdict) return <VerdictForm />;

	console.log(verdict);

	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{
				delayChildren: stagger(0.3),
			}}
			className="space-y-7 mb-3"
		>
			<motion.section variants={motionVariants} layout>
				<p className="text-lg font-medium inline-flex gap-x-1 items-center text-primary">
					<NotebookTabs />
					<span>Verdict Notes</span>
				</p>

				<Editor.Renderer editorSerializedState={verdict.notes} />
			</motion.section>

			<motion.section variants={motionVariants} layout className="">
				<p className="text-lg font-medium inline-flex gap-x-1 items-center text-primary">
					<Syringe />
					<span>Treatment Plan</span>
				</p>
				<Editor.Renderer editorSerializedState={verdict.treatmentPlan.plan} />
			</motion.section>

			<motion.section variants={motionVariants} layout>
				<VerdictSection.Plans />
			</motion.section>

			{/* ! Consider the Prognosis Sections */}
		</motion.div>
	);
}

VerdictSection.Plans = () => {
	const { verdict } = useConsultation();

	const medications = verdict?.treatmentPlan.medications ?? [];
	const therapies = verdict?.treatmentPlan.therapies ?? [];
	const procedures = verdict?.treatmentPlan.procedures ?? [];

	return (
		<Tabs defaultValue="Medications">
			<TabsList className="flex mx-auto rounded-xl">
				<TabsTrigger value="Medications">Medications</TabsTrigger>
				<TabsTrigger value="Therapies">Therapies</TabsTrigger>
				<TabsTrigger value="Procedures">Procedures</TabsTrigger>
			</TabsList>

			<TabsContent value="Medications">
				<motion.section
					variants={motionVariants}
					initial="hidden"
					animate="visible"
					transition={{
						delayChildren: stagger(0.3),
					}}
					className="space-y-2"
				>
					{medications.length > 0 ? (
						medications.map((m) => (
							<motion.div variants={motionVariants} key={m.id} layout>
								<MedicationCard medication={m} />
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
					className="flex flex-col sm:flex-row sm:items-center gap-2"
				>
					{procedures.length > 0 ? (
						procedures.map((p) => (
							<motion.div
								variants={motionVariants}
								key={p.id}
								layout
								className="flex-1"
							>
								<ProcedureCard procedure={p} />
							</motion.div>
						))
					) : (
						<Void msg="No Procedure prescribed🏃‍♀️" />
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
					className="flex flex-col sm:flex-row sm:items-center gap-2"
				>
					{therapies.length > 0 ? (
						therapies.map((t) => (
							<motion.div
								variants={motionVariants}
								key={t.id}
								layout
								className="flex-1"
							>
								<TherapyCard therapy={t} />
							</motion.div>
						))
					) : (
						<Void msg="No therapies prescribed🧘" />
					)}
				</motion.section>
			</TabsContent>
		</Tabs>
	);
};
